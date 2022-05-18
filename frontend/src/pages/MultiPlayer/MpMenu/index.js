import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRoom } from "../../../hooks/useRoom"

export default function MpMenu() {

    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const {handleCreateRoom, handleJoinRoom} = useRoom()
    const navigate = useNavigate()

    return (
        <div>
            <h1>Menu MP</h1>
            <h4>Nome:</h4>
            <input value={name} onChange={(e) => setName(e.target.value)}/>
            <button onClick={() => {handleCreateRoom(name);navigate("/multiplayer/room")}} disabled={name === ""}>Criar sala</button>
            <h4>ou... entrar em sala:</h4>
            <input value={code} onChange={(e) => setCode(e.target.value)}/>
            <button onClick={() => {handleJoinRoom(name, code);navigate("/multiplayer/room")}} disabled={name === "" || code === ""}>Entrar</button>
        </div>
    )
}