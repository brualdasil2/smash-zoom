import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Divider, ListItem, ListItemIcon, ListItemText, Tooltip, IconButton, Button } from "@mui/material"
import KickButton from '../../KickButton';


export default function UserRank({user, index, rank}) {

 

    return (
        <>
            {index !== 0 && <Divider variant="middle" />}
            <ListItem>
                {user.ready && <ListItemIcon>
                    <CheckCircleIcon color="success" />
                </ListItemIcon>}
                <ListItemText inset={!user.ready} primary={rank} />
                <ListItemText primary={user.name} />
                <ListItemText primary={user.roundScore} />
                <ListItemText primary={user.totalScore} />
                <KickButton user={user} />
            </ListItem>
        </>
    )
}
{/* <TableRow
    key={row.name}
    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
>
    <TableCell component="th" scope="row">
    {row.name}
    </TableCell>
    <TableCell align="right">{row.calories}</TableCell>
    <TableCell align="right">{row.fat}</TableCell>
    <TableCell align="right">{row.carbs}</TableCell>
    <TableCell align="right">{row.protein}</TableCell>
</TableRow> */}