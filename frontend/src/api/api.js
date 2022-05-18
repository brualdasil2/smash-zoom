import socketIOClient from "socket.io-client"

const socket = socketIOClient("http://127.0.0.1:5000/")
//const socket = socketIOClient("https://f200-2804-14d-4cd6-a25b-7d63-717b-b2bf-c5f2.ngrok.io")

export function connect() {
    socket.on("connect", () => {
        socket.send("Usuário conectado")
    })
}
export function listenToRoom(func) {
    socket.on("roomData", func)
}
export function joinRoom(data) {
    socket.emit("joinRoom", data)
}
export function leaveRoom() {
    socket.emit("leaveRoom")
}
export function createRoom(data) {
    socket.emit("createRoom", data)
}
export function ready() {
    socket.emit("ready")
}
export function sendScore(data) {
    socket.emit("sendScore", data)
}
