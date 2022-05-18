import { useRoom } from "../../../../hooks/useRoom"
import { ready } from "../../../../api/api"

export default function Waiting() {

    const {roomData} = useRoom()

    return (
        <div>
            <h1>Fim da rodada</h1>
            <h1>Ranking</h1>
            {roomData.users.map((user) => <h4>{user.name}  {user.roundScore} {user.totalScore} {user.ready ? "(Pronto!)" : ""}</h4>)}
            <button onClick={ready}>Pronto!</button>
        </div>

    )
}