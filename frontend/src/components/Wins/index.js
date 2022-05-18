import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import { ListItemIcon, ListItemText } from '@mui/material';

export default function Wins({wins}) {

    function renderWins() {
        if (wins <= 3) {

            let winsArray = []
            for (let i = 0; i < wins; i++) {
                winsArray.push(<EmojiEventsIcon key={i} />)
            }
            return winsArray
        }
        else {
            return (
                <>
                    <EmojiEventsIcon /> 
                    <ListItemText primary={`x${wins}`} />
                </>
            )
        }
    }

    return (
        <>
            <ListItemIcon>
                {renderWins()}
            </ListItemIcon>
        </>
    )
}