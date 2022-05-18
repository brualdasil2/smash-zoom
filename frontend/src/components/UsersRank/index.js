import UserRank from "./UserRank"
import { List, Paper } from "@mui/material"
import { LabelsContainer, Label } from "../../pages/MultiPlayer/Room/Waiting/styles"


export default function UsersRank({users}) {

    return (
      <>
        <LabelsContainer>
          <Label>Rodada</Label>
          <Label>Total</Label>
        </LabelsContainer>
        <Paper sx={{width:"80%",maxWidth:"300px",marginBottom:"30px"}}>   

            <List>
                {users.map((user, index) => <UserRank key={index} index={index} user={user}/>)}
            </List>
        </Paper>
      </>
    )
}
{/* <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
              <TableCell align="right">{row.protein}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}