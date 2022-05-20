import { Divider, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton, Button } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Wins from "../../Wins";
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { useState } from "react";
import { useRoom } from "../../../hooks/useRoom";

export default function User({user, index}) {

    const [removeOpen, setRemoveOpen] = useState(false)

    const {isAdmin, handleKickUser} = useRoom()

    const admin = isAdmin()

    function handleRemoveUser() {
        handleKickUser(user.sid)
        console.log(`Kicked ${user.name}`)
    }    
    
    return (
        <>
            {index !== 0 && <Divider variant="middle" />}
                <ListItem>
                    {user.ready && <ListItemIcon>
                        <CheckCircleIcon color="success" />
                    </ListItemIcon>}
                        <ListItemText inset={!user.ready} primary={user.name} />
                    <Wins wins={user.wins}/>
                    {admin && !user.admin && <Tooltip open={removeOpen}  title={<Button variant="contained" color="error" onClick={handleRemoveUser}>Remover</Button>} placement="right">
                        <IconButton onClick={() => setRemoveOpen((open) => !open)}>
                            <MoreVertIcon  />
                        </IconButton>
                    </Tooltip>}
                </ListItem>
        </>
    )
}