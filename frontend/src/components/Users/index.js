import User from "./User"

export default function Users({users}) {

    return (
        <div>
            {users.map((user) => <User user={user}/>)}
        </div>
    )
}