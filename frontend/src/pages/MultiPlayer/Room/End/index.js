import { ready } from "../../../../api/api"
import { useRoom } from "../../../../hooks/useRoom"
import { MainContainer } from "../../../../shared_styles"
import UsersRank from "../../../../components/UsersRank"
import { Typography, Button } from "@mui/material"
import { useTranslation } from "react-i18next"

export default function End() {

    
    const {roomData} = useRoom()
    const { t } = useTranslation()

    const sortedUsers = roomData.users.sort((a, b) => b.totalScore - a.totalScore)

    return (
        <MainContainer>
            <Typography variant="h4">{t("end_game")}</Typography>
            <UsersRank users={sortedUsers}/>
            <Button variant="contained" onClick={ready}>{t("back_lobby")}</Button>
        </MainContainer>
    )
}