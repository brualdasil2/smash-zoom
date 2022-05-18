import { createContext, useState } from "react"
import { joinRoom, createRoom, sendScore } from "../api/api"

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

    return (
        <RoomContext.Provider value={{roomData, setRoomData, handleJoinRoom, handleCreateRoom, handleSendScore}}>
            {children}
        </RoomContext.Provider>
    )
}