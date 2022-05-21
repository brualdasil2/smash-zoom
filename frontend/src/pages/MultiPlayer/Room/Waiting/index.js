import { useRoom } from "../../../../hooks/useRoom"
import { ready } from "../../../../api/api"
import { MainContainer } from "../../../../shared_styles"
import UsersRank from "../../../../components/UsersRank"
import { Button, Typography } from "@mui/material"
import { useTranslation } from "react-i18next"

export default function Waiting() {

    const {roomData} = useRoom()
    const { t } = useTranslation()

    const sortedUsers = roomData.users.sort((a, b) => b.totalScore - a.totalScore)

    return (
        <MainContainer>
            <Typography variant="h4">{t("end_round")}</Typography>
            <UsersRank users={sortedUsers}/>
            <Button variant="contained" color="success" onClick={ready}>{t("ready")}</Button>
        </MainContainer>

    )
}