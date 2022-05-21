import { useEffect, useState } from "react"
import { Route, Routes, useNavigate } from "react-router"
import { listenToRoom, stopListeningToRoom } from "../../../api/api"
import { useRoom } from "../../../hooks/useRoom"
import Lobby from "./Lobby"
import Game from "./Game"
import Waiting from "./Waiting"
import End from "./End"
import { AppBar, Toolbar, Typography } from "@mui/material"
import { ScreenContainer, StyledSpinner } from "../../../shared_styles"
import { useTranslation } from "react-i18next"

export default function Room() {
    const {roomData, setRoomData} = useRoom()
    const [roomError, setRoomError] = useState(false)
    const navigate = useNavigate()
    const { t } = useTranslation()

    useEffect(() => {
        const listenerFunc = (data) => {
            if (!data) {
                setRoomData({})
                return
            }
            setRoomData(data)
            switch(data.state) {
                case 0:
                    navigate("/multiplayer/room/lobby")
                    break
                case 1:
                    navigate("/multiplayer/room/game")
                    break
                case 2:
                    navigate("/multiplayer/room/waiting")
                    break
                case 3:
                    navigate("/multiplayer/room/end")
                    break
            }
        }
        listenToRoom(listenerFunc)
        return (() => stopListeningToRoom(listenerFunc))
    }, [roomData])
 
    return (
        <>
        {Object.keys(roomData).length === 0 ? (
        <div>
            {!roomError ? 

                <StyledSpinner style={{marginTop: "50px"}} onAnimationIteration={() => setRoomError(true)}/>
            : (
                <>
                    <h1>{t("no_room")}</h1>
                    <button onClick={() => navigate("/multiplayer/menu")}>{t("return")}</button>
                </>
            )}
        </div>
        ):(
            <ScreenContainer>
                <AppBar position="static">
                    <Toolbar sx={{justifyContent: "space-between"}}>
                        <Typography variant="h6">Smash Zoom - {t("room")} {roomData.code}</Typography>
                    </Toolbar>
                </AppBar>
                <Routes>
                    <Route path="lobby" element={<Lobby />} />
                    <Route path="game" element={<Game />} />
                    <Route path="waiting" element={<Waiting />} />
                    <Route path="end" element={<End />} />
                </Routes>
            </ScreenContainer>
            
        )}
        
        </>
    )
}