from datetime import datetime
from ntpath import join
from turtle import back
from flask import Flask, request, session
from flask_socketio import SocketIO, emit, join_room, leave_room
import pymongo
from pymongo import MongoClient
from bson.objectid import ObjectId
import random


app = Flask(__name__)
io = SocketIO(app, cors_allowed_origins="*")


cluster = MongoClient("mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.4.1")
db = cluster["smash-zoom"]
rooms = db["rooms"]

ROOM_LOBBY, WAITING_SCORES, BETWEEN_ROUNDS, ENDGAME = range(4)
NOT_PLAYED = -1
LAST_ROUND = 5

def generate_room_code():
    while True:
        generated_code = random.randrange(100000, 999999)
        res = rooms.find_one({"code": generated_code})
        if not res:
            break
    return str(generated_code)

def get_room(room_code):
    return rooms.find_one({"code": room_code}, {"_id": 0})

def get_user_room(sid):
    return rooms.find_one({"users.sid":sid}, {"_id": 0})

def get_user(sid):
    parsed_room = rooms.find_one({"users.sid": sid}, {"users.$": 1, "_id": 0})
    return parsed_room["users"][0]

def update_user_field(sid, field, value):
    rooms.update_one({"users.sid": sid}, {"$set": {f"users.$.{field}": value}})

def execute_leave_room(sid):
    room_data = get_user_room(sid)
    if not room_data:
        return None
    room_code = room_data["code"]
    admin_leaving = get_user(sid)["admin"]
    # remove o usuário da sala no banco
    rooms.update_one({"code": room_code}, {"$pull": {"users": {"sid":sid}}})
    # remove o usuário da room do socket
    leave_room(room_code, sid=sid)
    room_data = get_room(room_code)
    deleted_room = False
    # casos de deletar a sala (último a sair ou admin)
    if len(room_data["users"]) == 0 or admin_leaving:
        rooms.delete_one({"code": room_code})
        deleted_room = True
    else:
        # volta pro lobby se só sobrou 1 user
        if len(room_data["users"]) == 1:
            back_to_lobby(room_code)
    room_data = get_room(room_code)
    if deleted_room:
        emit("roomData", {}, to=room_code)
    else:
        check_all_scores_sent(room_data)
        check_all_users_ready(room_data)
        room_data = get_room(room_code)
        emit("roomData", room_data, to=room_code)
    print(f"User {sid} has left room")
    return room_data

def create_user(sid, name, admin):
    return {
        "sid": sid,
        "name": name,
        "admin": admin,
        "roundScore": NOT_PLAYED,
        "totalScore": 0,
        "ready": False,
        "wins":0
    }

def random_character():
    return random.randint(0, 82)

def random_position():
    x_offset = -10 + random.randint(0, 20)
    y_offset = -10 + random.randint(0, 20)
    return {
        "x": x_offset,
        "y": y_offset
    }

def random_alt(alts):
    if alts:
        return random.randint(1, 8)
    else:
        return 1
        

@io.on("connect")
def handle_connect():
    session_id = request.sid
    print(f"User {session_id} has connected")

@io.on("disconnect")
def handle_disconnect():
    session_id = request.sid
    execute_leave_room(session_id)
    print(f"User {session_id} has disconnected")


@io.on("joinRoom")
def handle_join_joom(data):
    session_id = request.sid
    name = data["name"]
    room_code = data["code"]

    user = create_user(session_id, name, False)
    res = rooms.update_one({"code": room_code}, {"$push": {"users": user}})
    if res.modified_count > 0:
        join_room(room_code)
        room_data = get_room(room_code)
        emit("roomData", room_data, to=room_code)
        print(f"User {session_id} has joined room {room_code}")
    else:
        emit("roomData", None, to=session_id)
        print(f"Room {room_code} does not exist")




@io.on("createRoom")
def handle_create_room(data):
    session_id = request.sid
    name = data["name"]
    room_code = generate_room_code()

    user = create_user(session_id, name, True)
    room = {
        "code": room_code,
        "state": ROOM_LOBBY,
        "round": 0,
        "settings": {
            "alts": True,
            "rounds": 5
        },
        "users": [
            user
        ]
    }
    res = rooms.insert_one(room)
    if res.acknowledged:
        join_room(room_code)
        room_data = get_room(room_code)
        emit("roomData", room_data, to=room_code)
        print(f"User {session_id} created room {room_code}")
    else:
        print("Error creating the room")



@io.on("leaveRoom")
def handle_leave_room(data={}):
    session_id = request.sid
    execute_leave_room(session_id)

        


def start_round(room_code):
    character = random_character()
    position = random_position()
    room_data = get_room(room_code)
    alt = random_alt(room_data["settings"]["alts"])
    rooms.update_one({"code": room_code}, {"$set": {
        "state": WAITING_SCORES, 
        "character": character, 
        "position": position,
        "alt": alt,
        "roundStartTime": str(datetime.now())}})
    rooms.update_one({"code": room_code}, {"$inc": {"round": 1}})
    # set every users ready to false
    rooms.update_one({"code": room_code}, {"$set": {"users.$[elem].ready": False}}, array_filters=[{"elem.ready": True}])
    rooms.update_one({"code": room_code}, {"$set": {"users.$[elem].roundScore": NOT_PLAYED}}, array_filters=[{"elem.roundScore": {"$ne": NOT_PLAYED}}])
    room_data = get_room(room_code)
    emit("roomData", room_data, to=room_code)
    print(f"Room {room_code} has started round {room_data['round']} with character {character}, alt {alt} and position x: {position['x']} y: {position['y']}")
    

def back_to_lobby(room_code):
    room_data = get_room(room_code)
    if room_data["state"] == ENDGAME:
        ranked_users = sorted(room_data["users"], reverse=True, key=lambda u : u["totalScore"])
        if len(ranked_users) > 1:
            if ranked_users[0]["totalScore"] > ranked_users[1]["totalScore"]:
                winner = ranked_users[0]
                update_user_field(winner["sid"], "wins", winner["wins"]+1)
                print(f"User {winner['sid']} won, now has {winner['wins']+1} wins")
    rooms.update_one({"code": room_code}, {"$set": {"state": ROOM_LOBBY, "round": 0}})
    rooms.update_one({"code": room_code}, {"$set": {"users.$[elem].totalScore": 0}}, array_filters=[{"elem.totalScore": {"$ne": 0}}])
    rooms.update_one({"code": room_code}, {"$set": {"users.$[elem].ready": False}}, array_filters=[{"elem.ready": True}])
    room_data = get_room(room_code)
    emit("roomData", room_data, to=room_code)
    print(f"Going back to lobby in room {room_code}")

def check_all_users_ready(room_data):
    if all([u["ready"] for u in room_data["users"]]) and len(room_data["users"]) >= 2:
        if room_data["state"] == ENDGAME:
            back_to_lobby(room_data["code"])
        else:
            start_round(room_data["code"])

@io.on("ready")
def handle_ready(data={}):
    session_id = request.sid
    update_user_field(session_id, "ready", True)
    room_data = get_user_room(session_id)
    room_code = room_data["code"]

    emit("roomData", room_data, to=room_code)
    print(f"User {session_id} is ready")

    # everyone is ready
    check_all_users_ready(room_data)

        
def time_compare(*args):
    return True

def check_all_scores_sent(room_data):
    if room_data["state"] != WAITING_SCORES:
        return
    if all([u["roundScore"] != NOT_PLAYED for u in room_data["users"]]):
        rooms.update_one({"code": room_data["code"]}, {"$set": {"state": BETWEEN_ROUNDS, "character": None, "position": None, "alt": None}})
        users = room_data["users"]
        for u in users:
            update_user_field(u["sid"], "totalScore", u["roundScore"] + u["totalScore"])
        if room_data["round"] == room_data["settings"]["rounds"]:
            rooms.update_one({"code": room_data["code"]}, {"$set": {"state": ENDGAME}})
        room_data = get_room(room_data["code"])
        emit("roomData", room_data, to=room_data["code"])

@io.on("sendScore")
def handle_send_score(data):
    session_id = request.sid
    score = data["score"]
    submit_time = datetime.now()
    room_data = get_user_room(session_id)
    if time_compare(submit_time, room_data["roundStartTime"]):
        update_user_field(session_id, "roundScore", score)
        room_data = get_user_room(session_id)
        emit("roomData", room_data, to=room_data["code"])
        print(f"User {session_id} scored {score} points")
        check_all_scores_sent(room_data)
        

@io.on("kickUser")
def handle_kick_user(data):
    session_id = request.sid
    kicked_sid = data["sid"]
    user = get_user(session_id)
    if not user["admin"]:
        return
    execute_leave_room(kicked_sid)
    emit("roomData", {}, to=kicked_sid)


@io.on("updateSettings")
def handle_update_settings(data):
    session_id = request.sid
    alts = data["alts"]
    rounds = data["rounds"]
    user = get_user(session_id)
    if not user["admin"]:
        return
    rooms.update_one({"users.sid": session_id}, {"$set": {"settings": {"alts": alts, "rounds": rounds}}})
    room_data = get_user_room(session_id)
    emit("roomData", room_data, to=room_data["code"])
    print(f"Settings updated to alts: {alts} and rounds: {rounds}")







if __name__ == "__main__":
    io.run(app, debug=True)




