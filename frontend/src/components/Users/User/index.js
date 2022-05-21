import { Divider, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton, Button } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Wins from "../../Wins";
import KickButton from "../../KickButton"

export default function User({user, index}) {
 
    
    return (
        <>
            {index !== 0 && <Divider variant="middle" />}
                <ListItem>
                    {user.ready && <ListItemIcon>
                        <CheckCircleIcon color="success" />
                    </ListItemIcon>}
                        <ListItemText inset={!user.ready} primary={user.name} />
                    <Wins wins={user.wins}/>
                    <KickButton user={user}/>
                </ListItem>
        </>
    )
}