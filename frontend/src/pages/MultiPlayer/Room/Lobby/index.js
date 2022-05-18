import { useRoom } from "../../../../hooks/useRoom"
import { ready } from "../../../../api/api"

export default function Lobby() {

    const {roomData} = useRoom()

    return (
        <div>
            <h1>Sala {roomData.code}</h1>
            {roomData.users.map((user) => <h4>{user.name}</h4>)}
        </div>
    )
}
//     code: '887827',
//     state: 0,
//     round: 0,
//     users: [
//       {
//         sid: 'dzEd0BFnhvcq7KwwAABH',
//         name: 'Bruno',
//         roundScore: -1,
//         totalScore: 0,
//         ready: false
//       },
//       {
//         sid: '8HdN7OtuIxHYwvrAAABJ',
//         name: 'Carol',
//         roundScore: -1,
//         totalScore: 0,
//         ready: false
//       }
//     ]