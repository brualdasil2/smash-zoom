import UserWaiting from "./UserWaiting"
import { List, Paper } from "@mui/material"

export default function UsersWaiting({users}) {

    return (
        <Paper sx={{width:"60%",maxWidth:"200px",margin:"30px"}}>   
            <List>
                {users.map((user, index) => <UserWaiting key={index} index={index} user={user}/>)}
            </List>
        </Paper>
    )
}