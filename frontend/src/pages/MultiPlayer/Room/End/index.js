import { ready } from "../../../../api/api"
import { useRoom } from "../../../../hooks/useRoom"

export default function End() {

    
    const {roomData} = useRoom()

    const sortedUsers = roomData.users.sort((a, b) => b.totalScore - a.totalScore)

    return (
        <div>
            <h1>Fim de jogo</h1>
            <h1>Ranking final</h1>
            {sortedUsers.map((user) => <h4>{user.name}  {user.totalScore} {user.ready ? "(Pronto!)" : ""}</h4>)}
            <button onClick={ready}>Voltar ao Lobby</button>
        </div>
    )
}