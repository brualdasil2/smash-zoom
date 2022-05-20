import socketIOClient from "socket.io-client"

const socket = socketIOClient("http://127.0.0.1:5000/")
//const socket = socketIOClient("https://ede0-2804-14d-4cd6-a25b-4402-7203-2fa5-6d6b.ngrok.io")
export function connect() {
    socket.on("connect", () => {
        socket.send("Usuário conectado")
    })
}
export function listenToRoom(func) {
    socket.on("roomData", func)
}
export function stopListeningToRoom(listener) {
    socket.off("roomData", listener)
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
export function kickUser(data) {
    socket.emit("kickUser", data)
}
export function updateSettings(data) {
    socket.emit("updateSettings", data)
}
export function getSessionId() {
    return socket.id
}