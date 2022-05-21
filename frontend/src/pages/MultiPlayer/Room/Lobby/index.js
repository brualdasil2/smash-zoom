import { useRoom } from "../../../../hooks/useRoom"
import { leaveRoom, ready } from "../../../../api/api"
import Users from "../../../../components/Users"
import { useNavigate } from "react-router-dom"
import { ScreenContainer, MainContainer } from "../../../../shared_styles"
import { Typography, Button, FormControlLabel, Switch, IconButton } from "@mui/material"
import InfoButton from "../../../../components/InfoButton"
import { FlexRowContainer } from "./styles"
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useState } from "react"
import { useTranslation } from "react-i18next"


export default function Lobby() {

    const {roomData, isAdmin, handleUpdateSettings} = useRoom()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const admin = isAdmin()

    function onChangeAlt(newValue) {
        handleUpdateSettings({...roomData.settings, alts: newValue})
    }
    function increaseRounds() {
        handleUpdateSettings({...roomData.settings, rounds: roomData.settings.rounds+1})
    }
    function decreaseRounds() {
        handleUpdateSettings({...roomData.settings, rounds: roomData.settings.rounds-1})
    }

    return (
        <MainContainer>      

            <Typography variant="h4">{t("room")} {roomData.code}</Typography>
            <Users users={roomData.users} />
            <Button variant="contained" color="success" onClick={ready} sx={{margin:"15px"}}>{t("ready")}</Button>
            <Button variant="contained" color="error" onClick={() => {leaveRoom();navigate("/multiplayer/menu")}} sx={{margin:"15px"}}>{t("leave_room")}</Button>
            
            <Typography variant="h5" sx={{marginTop: "30px", marginBottom: "10px"}}>{t("room_settings")}</Typography>
            {admin ? 
            (
                <Typography variant="h7" color="success" sx={{margin: "30px"}}>{t("you_are_admin")}</Typography>
            ) : (
                <Typography variant="h7" color="error" sx={{margin: "30px"}}>{t("only_the_admin")}</Typography>    
            )}
            <FlexRowContainer>
                <FormControlLabel
                    value="alts"
                    label={t("alts")}
                    labelPlacement="start"
                    control={
                        <Switch 
                            checked={roomData.settings.alts} 
                            onChange={(e) => {onChangeAlt(e.target.checked)}}
                            disabled={!admin}
                        />
                    }
                />
            </FlexRowContainer>
            <FlexRowContainer>
                <FormControlLabel
                    disabled={!admin}
                    value="rounds"
                    label={t("rounds")}
                    labelPlacement="start"
                    control={<>
                        <IconButton onClick={increaseRounds} disabled={!admin}>
                            <AddIcon />
                        </IconButton>
                        <Typography variant="h4">{roomData.settings.rounds}</Typography>
                        <IconButton onClick={decreaseRounds} disabled={!admin}>
                            <RemoveIcon />
                        </IconButton>
                    </>}
                />
            </FlexRowContainer>

        </MainContainer>
    )
}
