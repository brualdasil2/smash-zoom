import { useState } from "react";
import { useRoom } from "../../hooks/useRoom";
import { useTranslation } from "react-i18next";
import { IconButton, Tooltip, Button } from "@mui/material"
import MoreVertIcon from '@mui/icons-material/MoreVert';

export default function KickButton({user}) {
    const [removeOpen, setRemoveOpen] = useState(false)

    const {isAdmin, handleKickUser} = useRoom()

    const { t } = useTranslation()

    const admin = isAdmin()

    function handleRemoveUser() {
        handleKickUser(user.sid)
    }  
    return (
        <>
            {admin && !user.admin && <Tooltip open={removeOpen}  title={<Button variant="contained" color="error" onClick={handleRemoveUser}>{t("remove")}</Button>} placement="right">
                <IconButton onClick={() => setRemoveOpen((open) => !open)}>
                    <MoreVertIcon  />
                </IconButton>
            </Tooltip>}
        </>
    )
}