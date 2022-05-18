import User from "./User"
import { List, Paper } from "@mui/material"

export default function Users({users}) {

    return (
        <Paper sx={{width:"80%",maxWidth:"300px",margin:"30px"}}>   
            <List>
                {users.map((user, index) => <User key={index} index={index} user={user}/>)}
            </List>
        </Paper>
    )
}