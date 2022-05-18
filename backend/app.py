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
LAST_ROUND = 2

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

def update_user_field(sid, field, value):
    rooms.update_one({"users.sid": sid}, {"$set": {f"users.$.{field}": value}})

def execute_leave_room(sid):
    res = get_user_room(sid)
    if not res:
        return None
    room_code = res["code"]
    rooms.update_one({"code": room_code}, {"$pull": {"users": {"sid":sid}}})
    leave_room(room_code, sid=sid)
    room_data = get_room(room_code)
    if len(room_data["users"]) == 0:
        rooms.delete_one({"code": room_code})
    else:
        back_to_lobby(room_code)
        room_data = get_room(room_code)
    return room_data

def create_user(sid, name):
    return {
        "sid": sid,
        "name": name,
        "roundScore": NOT_PLAYED,
        "totalScore": 0,
        "ready": False
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

def random_alt():
    return random.randint(1, 8)

@io.on("connect")
def handle_connect():
    session_id = request.sid
    print(f"User {session_id} has connected")

@io.on("disconnect")
def handle_disconnect():
    session_id = request.sid
    room_data = execute_leave_room(session_id)
    if room_data:
        emit("roomData", room_data, to=room_data["code"])
        print(f"User {session_id} has left room")
    print(f"User {session_id} has disconnected")


@io.on("joinRoom")
def handle_join_joom(data):
    session_id = request.sid
    name = data["name"]
    room_code = data["code"]

    user = create_user(session_id, name)
    res = rooms.update_one({"code": room_code}, {"$push": {"users": user}})
    if res.acknowledged:
        join_room(room_code)
        room_data = get_room(room_code)
        emit("roomData", room_data, to=room_code)
        print(f"User {session_id} has joined room {room_code}")
    else:
        print(f"Room {room_code} does not exist")




@io.on("createRoom")
def handle_create_room(data):
    session_id = request.sid
    name = data["name"]
    room_code = generate_room_code()

    user = create_user(session_id, name)
    room = {
        "code": room_code,
        "state": ROOM_LOBBY,
        "round": 0,
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
    room_data = execute_leave_room(session_id)
    emit("roomData", room_data, to=room_data["code"])
    print(f"User {session_id} has left room")


def start_round(room_code):
    character = random_character()
    position = random_position()
    alt = random_alt()
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
    rooms.update_one({"code": room_code}, {"$set": {"state": ROOM_LOBBY, "round": 0}})
    rooms.update_one({"code": room_code}, {"$set": {"users.$[elem].totalScore": 0}}, array_filters=[{"elem.totalScore": {"$ne": 0}}])
    rooms.update_one({"code": room_code}, {"$set": {"users.$[elem].ready": False}}, array_filters=[{"elem.ready": True}])
    room_data = get_room(room_code)
    emit("roomData", room_data, to=room_code)
    print(f"Going back to lobby in room {room_code}")


@io.on("ready")
def handle_ready(data={}):
    session_id = request.sid
    update_user_field(session_id, "ready", True)
    room_data = get_user_room(session_id)
    room_code = room_data["code"]

    emit("roomData", room_data, to=room_code)
    print(f"User {session_id} is ready")

    # everyone is ready
    if all([u["ready"] for u in room_data["users"]]) and len(room_data["users"]) >= 2:
        if room_data["state"] == ENDGAME:
            back_to_lobby(room_code)
        else:
            start_round(room_code)

        
def time_compare(*args):
    return True

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
        # everyone has played
        if all([u["roundScore"] != NOT_PLAYED for u in room_data["users"]]):
            rooms.update_one({"code": room_data["code"]}, {"$set": {"state": BETWEEN_ROUNDS, "character": None, "position": None, "alt": None}})
            users = room_data["users"]
            for u in users:
                update_user_field(u["sid"], "totalScore", u["roundScore"] + u["totalScore"])
            if room_data["round"] == LAST_ROUND:
                rooms.update_one({"code": room_data["code"]}, {"$set": {"state": ENDGAME}})
            room_data = get_user_room(session_id)
            emit("roomData", room_data, to=room_data["code"])







if __name__ == "__main__":
    io.run(app, debug=True)




