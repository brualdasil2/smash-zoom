import { useRoom } from "../../../../hooks/useRoom"
import { leaveRoom, ready } from "../../../../api/api"
import Users from "../../../../components/Users"
import { useNavigate } from "react-router-dom"

export default function Lobby() {

    const {roomData} = useRoom()
    const navigate = useNavigate()
    
    return (
        <div>
            <h1>Sala {roomData.code}</h1>
            <Users users={roomData.users} />
            <button onClick={ready}>Pronto</button>
            <button onClick={() => {leaveRoom();navigate("/multiplayer/menu")}}>Sair da sala</button>
        </div>
    )
}
