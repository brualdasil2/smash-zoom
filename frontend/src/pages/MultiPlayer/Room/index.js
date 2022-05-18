import { useEffect } from "react"
import { Route, Routes, useNavigate } from "react-router"
import { listenToRoom } from "../../../api/api"
import { useRoom } from "../../../hooks/useRoom"
import Lobby from "./Lobby"
import Game from "./Game"
import Waiting from "./Waiting"
import End from "./End"

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
                case 3:
                    navigate("/multiplayer/room/end")
                    break
            }
        })
    }, [roomData])
 
    return (
        <>
        {roomData.code === "ERROR" ? (
            <div>
                <h1>Sala não existe!</h1>
                <button onClick={() => navigate("/multiplayer/menu")}>Voltar</button>
            </div>
            ):(
                <Routes>
                <Route path="lobby" element={<Lobby />} />
                <Route path="game" element={<Game />} />
                <Route path="waiting" element={<Waiting />} />
                <Route path="end" element={<End />} />
            </Routes>
        )}
        
        </>
    )
}