import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useRoom } from "../../../hooks/useRoom"
import { ScreenContainer, MainContainer } from "../../../shared_styles"
import { AppBar, Toolbar, Typography, TextField, Button } from "@mui/material"
import { useTranslation } from "react-i18next"

export default function MpMenu() {

    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const {handleCreateRoom, handleJoinRoom} = useRoom()
    const navigate = useNavigate()
    const { t } = useTranslation()

    function handleTypeName(newName) {
        if (newName.length > 10)
            return
        setName(newName)
    }

    return (
            <ScreenContainer>
            <AppBar position="static">
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <Typography onClick={() => navigate("/")} variant="h6" >Smash Zoom</Typography>
                </Toolbar>
            </AppBar>
            <MainContainer>
                <Typography variant="h4" sx={{margin:"25px"}}>Multiplayer</Typography>
                <TextField
                    label={t("name")}
                    value={name}
                    onChange={(e) => handleTypeName(e.target.value)}
                    margin="normal"
                />
                <Button variant="contained" onClick={() => {handleCreateRoom(name);navigate("/multiplayer/room")}} disabled={name === ""} sx={{margin: "15px"}}>{t("create_room")}</Button>
                <Typography>{t("join_room")}</Typography>
                <TextField
                    label={t("code")}
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    margin="normal"
                />
                <Button variant="contained" onClick={() => {handleJoinRoom(name, code);navigate("/multiplayer/room")}} disabled={name === "" || code === ""} sx={{margin: "15px"}}>{t("join")}</Button>
            </MainContainer>
        </ScreenContainer>
    )
}