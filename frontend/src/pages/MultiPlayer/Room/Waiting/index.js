import { useRoom } from "../../../../hooks/useRoom"
import { ready } from "../../../../api/api"
import { MainContainer } from "../../../../shared_styles"
import UsersRank from "../../../../components/UsersRank"
import { Button, Typography } from "@mui/material"

export default function Waiting() {

    const {roomData} = useRoom()

    const sortedUsers = roomData.users.sort((a, b) => b.totalScore - a.totalScore)

    return (
        <MainContainer>
            <Typography variant="h4">Fim da rodada</Typography>
            <UsersRank users={sortedUsers}/>
            <Button variant="contained" onClick={ready}>Pronto!</Button>
        </MainContainer>

    )
}