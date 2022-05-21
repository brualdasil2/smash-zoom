import { Divider, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import CancelIcon from '@mui/icons-material/Cancel';
import KickButton from "../../KickButton";

export default function UserWaiting({user, index}) {

    return (
        <>
            {index !== 0 && <Divider variant="middle" />}
            <ListItem>
                <ListItemText primary={user.name} />
                {user.roundScore === -1 ? (
                    <ListItemIcon>
                        <PendingIcon />
                    </ListItemIcon>
                ): user.roundScore === 0 ? (
                    <ListItemIcon>
                        <CancelIcon color="error" />
                    </ListItemIcon>
                ) : (
                    <ListItemIcon>
                        <CheckCircleIcon color="success" />
                    </ListItemIcon>
                )}
                <KickButton user={user} />
            </ListItem>
        </>
    )
}