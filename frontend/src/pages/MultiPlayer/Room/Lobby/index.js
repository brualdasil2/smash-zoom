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


export default function Lobby() {

    const {roomData, isAdmin, handleUpdateSettings} = useRoom()
    const navigate = useNavigate()
    
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

            <Typography variant="h4">Sala {roomData.code}</Typography>
            <Users users={roomData.users} />
            <Button variant="contained" color="success" onClick={ready} sx={{margin:"15px"}}>Pronto</Button>
            <Button variant="contained" color="error" onClick={() => {leaveRoom();navigate("/multiplayer/menu")}} sx={{margin:"15px"}}>Sair da sala</Button>
            
            <Typography variant="h5" sx={{marginTop: "30px", marginBottom: "10px"}}>Configurações da sala</Typography>
            {admin ? 
            (
                <Typography variant="h7" color="success" sx={{margin: "30px"}}>Você é o ADMIN e pode mudar as configurações</Typography>
            ) : (
                <Typography variant="h7" color="error" sx={{margin: "30px"}}>Somente o ADMIN pode mudar as configurações</Typography>    
            )}
            <FlexRowContainer>
                <FormControlLabel
                    value="alts"
                    label="Alts"
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
                    label="Rounds"
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
