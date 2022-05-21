import { useNavigate } from "react-router-dom"
import { MainContainer, ScreenContainer } from "../../shared_styles"
import { ButtonsContainer } from "./styles";
import { AppBar, Toolbar, Typography, Button } from "@mui/material"
import PersonIcon from '@mui/icons-material/Person';
import PeopleIcon from '@mui/icons-material/People';
import NavigationButton from "../../components/NavigationButton";
import { getSessionId } from "../../api/api"
import { useTranslation } from "react-i18next"
import LanguageSelector from "../../components/LanguageSelector";

export default function Home() {

    const navigate = useNavigate()
    const { t } = useTranslation()

    return (
        <ScreenContainer>
            <AppBar position="static">
                <Toolbar sx={{justifyContent: "space-between"}}>
                    <Typography variant="h6">Smash Zoom</Typography>
                </Toolbar>
            </AppBar>
            <MainContainer>
                <LanguageSelector />
                <ButtonsContainer>
                    <NavigationButton label="Singleplayer" path="/singleplayer"><PersonIcon sx={{width: "50px", height:"50px"}}/></NavigationButton>
                    <NavigationButton label="Multiplayer" path="/multiplayer/menu"><PeopleIcon sx={{width: "50px", height:"50px"}}/></NavigationButton>
                </ButtonsContainer>
            </MainContainer>
        </ScreenContainer>
    )
}