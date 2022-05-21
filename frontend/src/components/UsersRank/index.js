import UserRank from "./UserRank"
import { List, Paper } from "@mui/material"
import { LabelsContainer, Label } from "../../pages/MultiPlayer/Room/Waiting/styles"
import { useTranslation } from "react-i18next"

export default function UsersRank({users}) {

  const { t } = useTranslation()

  function getUserRank(userIndex) {
    if (userIndex === 0)
      return userIndex + 1
    if (users[userIndex].roundScore !== users[userIndex-1].roundScore)
      return userIndex + 1
    else 
      return getUserRank(userIndex-1)
  }

    return (
      <>
        <LabelsContainer>
          <Label>{t("round")}</Label>
          <Label>{t("total")}</Label>
        </LabelsContainer>
        <Paper sx={{width:"80%",maxWidth:"300px",marginBottom:"30px"}}>   

            <List>
                {users.map((user, index) => <UserRank key={index} index={index} rank={getUserRank(index)} user={user}/>)}
            </List>
        </Paper>
      </>
    )
}