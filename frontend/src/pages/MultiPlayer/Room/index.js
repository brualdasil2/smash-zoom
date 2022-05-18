import { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router"
import { listenToRoom } from "../../../api/api"
import { useRoom } from "../../../hooks/useRoom"
import Lobby from "./Lobby"
import Game from "./Game"
import Waiting from "./Waiting"

export default function Room() {
    const {roomData, setRoomData} = useRoom()
    const navigate = useNavigate()

    useEffect(() => {
        listenToRoom((data) => {
            setRoomData(data)
            console.log(data)
            switch(data.state) {
                case 0:
                    navigate("/multiplayer/room/lobby")
                    break
                case 1:
                    navigate("/multiplayer/room/game")
                    break
                case 2:
                    navigate("/multiplayer/room/waiting")
                    break
            }
        })
    }, [roomData])
 
    return (
        <Routes>
            <Route path="lobby" element={<Lobby />} />
            <Route path="game" element={<Game />} />
            <Route path="waiting" element={<Waiting />} />
        </Routes>
    )
}