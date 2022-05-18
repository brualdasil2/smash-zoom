import { Button, FormControlLabel } from "@mui/material"
import { useNavigate } from "react-router-dom"

export default function NavigationButton({label, path, children}) {

    const navigate = useNavigate()

    return (
        <FormControlLabel
            value={label}
            label={label}
            labelPlacement="bottom"
            control={<Button variant="contained" onClick={() => navigate(path)} sx={{
                width:"100px",
                height:"100px"
            }}>
                {children}
            </Button>}
        />
    )
}