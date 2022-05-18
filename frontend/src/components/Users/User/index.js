export default function User({user}) {

    return (
        <h4>{user.name}        {user.ready && "(Pronto!)"}</h4>
    )
}