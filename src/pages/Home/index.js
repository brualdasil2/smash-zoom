import { useState } from "react";
import {fighters} from "../../utils/fighters"
import { ZoomImage, ImgContainer, MainContainer, ScreenContainer, ButtonGroupContainer } from "./styles"
import { Button, ButtonGroup, Typography } from "@mui/material"
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function Home() {
  const [fighterNumber, setFighterNumber] = useState(0)
  const [zooming, setZooming] = useState(false)
  const [binCounter, setBinCounter] = useState(true)
  const [zoomOffset, setZoomOffset] = useState({x: 0, y: 0})
  const [alt, setAlt] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)
  const [loaded, setLoaded] = useState(false)

  function parseDisplayName(urlName) {
    let parsedName = (urlName.replace(/_/g, " ")).replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    return(parsedName)
  }

  function randomizeOffset() {
    const xOffset = Math.round(-10 + Math.random()*20);
    const yOffset = Math.round(-10 + Math.random()*20);
    setZoomOffset({x: xOffset, y: yOffset})
  }

  function randomizeFighter() {
    const randomNumber = Math.round(Math.random()*82)
    const randomAlt = Math.round(1 + Math.random()*7)
    const altString = randomAlt === 1 ? "" : `${randomAlt}`
    setAlt(altString)
    setFighterNumber(randomNumber)
    setBinCounter(!binCounter)
    randomizeOffset()
    setShowAnswer(false)
    setLoaded(false)
  }
  function startZoom() {
    setZooming(true)
  }
  function pauseZoom() {
    setZooming(false)
  }

  return (
    <ScreenContainer>
      <MainContainer>
        <ImgContainer>
          {!loaded && <Typography variant="h4">Carregando...</Typography>}
          <ZoomImage onLoad={() => {setLoaded(true)}} loaded={loaded} zoomOffset={zoomOffset} zooming={zooming} zoomAnimation={binCounter ? "zoom" : "zoom2"} src={`https://www.smashbros.com/assets_v2/img/fighter/${fighters[fighterNumber]}/main${alt}.png`}/>
        </ImgContainer>
        <ButtonGroupContainer sx={{marginTop: "15px", width: "min-content", display: "flex"}}>
          <Button variant="contained" onClick={randomizeFighter} disabled={zooming}>Sortear</Button>
          {zooming ? (
            <Button variant="contained" onClick={pauseZoom}><PauseIcon/></Button>
            ) : (
            <Button variant="contained" onClick={startZoom}><PlayArrowIcon/></Button>
          )}
        </ButtonGroupContainer>
      </MainContainer>
    </ScreenContainer>
  );
}

export default Home;
