from ntpath import join
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


def generate_room_code():
    while True:
        generated_code = random.randrange(100000, 999999)
        res = rooms.find_one({"code": generated_code})
        if not res:
            break
    return str(generated_code)

def get_room(room_code):
    return rooms.find_one({"code": room_code}, {"_id": 0})

def execute_leave_room(sid):
    res = rooms.find_one({"users": {"$elemMatch": {"sid": sid}}})
    room_code = res["code"]
    rooms.update_one({"code": room_code}, {"$pull": {"users": {"sid":sid}}})
    leave_room(room_code, sid=sid)
    room_data = get_room(room_code)
    if len(room_data["users"]) == 0:
        rooms.delete_one({"code": room_code})
    return room_data


@io.on("connect")
def handle_connect():
    session_id = request.sid
    print(f"User {session_id} has connected")

@io.on("disconnect")
def handle_disconnect():
    session_id = request.sid
    room_data = execute_leave_room(session_id)
    emit("roomData", room_data, to=room_data["code"])
    print(f"User {session_id} has left room")
    print(f"User {session_id} has disconnected")


@io.on("joinRoom")
def handle_join_joom(data):
    session_id = request.sid
    name = data["name"]
    room_code = data["code"]

    user = {
        "sid": session_id,
        "name": name,
        "score": 0
    }
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

    room = {
        "code": room_code,
        "state": 0,
        "users": [
            {
                "sid": session_id,
                "name": name,
                "score": 0
            }
        ]
    }
    res = rooms.insert_one(room)
    if res.acknowledged:
        join_room(room_code)
        room_data = get_room(room_code)
        emit("roomData", room_data, to=room_code)
        print(f"{name} created room {room_code}")
    else:
        print("Error creating the room")



@io.on("leaveRoom")
def handle_leave_room(data={}):
    session_id = request.sid
    room_data = execute_leave_room(session_id)
    emit("roomData", room_data, to=room_data["code"])
    print(f"User {session_id} has left room")







if __name__ == "__main__":
    io.run(app, debug=True)




