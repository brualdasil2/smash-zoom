import { ready } from "../../../../api/api"
import { useRoom } from "../../../../hooks/useRoom"
import { MainContainer } from "../../../../shared_styles"
import UsersRank from "../../../../components/UsersRank"
import { Typography, Button } from "@mui/material"

export default function End() {

    
    const {roomData} = useRoom()

    const sortedUsers = roomData.users.sort((a, b) => b.totalScore - a.totalScore)

    return (
        <MainContainer>
            <Typography variant="h4">Fim de jogo</Typography>
            <UsersRank users={sortedUsers}/>
            <Button variant="contained" onClick={ready}>Voltar ao lobby</Button>
        </MainContainer>
    )
}