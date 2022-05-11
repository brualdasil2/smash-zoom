import { IconButton, Popover } from "@mui/material"
import InfoIcon from '@mui/icons-material/Info';
import { useState } from "react";

export default function InfoButton(
    {
        text
    }
) {
    const [anchorEl, setAnchorEl] = useState(null)

    function handleOpenPopover(e) {
        setAnchorEl(e.currentTarget)
    }
    function handleClosePopover() {
        setAnchorEl(null)
    }

    return (
        <>
            <IconButton id="icon-button" onClick={handleOpenPopover}><InfoIcon /></IconButton>
            <Popover 
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleClosePopover}
                anchorOrigin={{vertical: "bottom", horizontal: "center"}}
                transformOrigin={{vertical: "top", horizontal: "center"}}
                PaperProps={{sx: {
                    width: "150px",
                    padding: "10px 10px"
                }}}
            >
                {text}
            </Popover>
        </>
    )
}