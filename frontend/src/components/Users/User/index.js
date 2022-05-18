import { Divider, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import Wins from "../../Wins";

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
            </ListItem>
        </>
    )
}