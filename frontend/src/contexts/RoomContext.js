import { createContext, useState } from "react"
import { joinRoom, createRoom, sendScore, getSessionId, kickUser, updateSettings } from "../api/api"

export const RoomContext = createContext()

export default function RoomContextProvider({children}) {

    const [roomData, setRoomData] = useState({})

    function handleJoinRoom(name, code) {
        joinRoom({
            name,
            code
        })
    }
    function handleCreateRoom(name) {
        createRoom({
            name
        })
    }
    function handleSendScore(score) {
        sendScore({
            score
        })
    }
    function handleKickUser(sid) {
        kickUser({
            sid
        })
    }
    function handleUpdateSettings(settings) {
        updateSettings(settings)
    }
    function isAdmin() {
        const sid = getSessionId()
        let admin = false
        roomData.users.forEach((u) => {
            if (u.sid !== sid)
                return
            admin = u.admin
        })
        return admin
    }

    return (
        <RoomContext.Provider value={{roomData, setRoomData, handleJoinRoom, handleCreateRoom, handleSendScore, handleKickUser, handleUpdateSettings, isAdmin}}>
            {children}
        </RoomContext.Provider>
    )
}