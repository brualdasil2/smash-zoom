import { useRoom } from "../../../../hooks/useRoom"
import { leaveRoom, ready } from "../../../../api/api"
import Users from "../../../../components/Users"
import { useNavigate } from "react-router-dom"
import { ScreenContainer, MainContainer } from "../../../../shared_styles"
import { Typography, Button } from "@mui/material"


export default function Lobby() {

    const {roomData} = useRoom()
    const navigate = useNavigate()
    
    return (
        <MainContainer>      

            <Typography variant="h4">Sala {roomData.code}</Typography>
            <Users users={roomData.users} />
            <Button variant="contained" color="success" onClick={ready} sx={{margin:"15px"}}>Pronto</Button>
            <Button variant="contained" onClick={() => {leaveRoom();navigate("/multiplayer/menu")}} sx={{margin:"15px"}}>Sair da sala</Button>
        </MainContainer>
    )
}
