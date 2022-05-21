import { useEffect, useState } from "react";
import { fighters, parseDisplayName } from "../../utils/fighters"
import { Result } from "../../utils/result"
import { ZoomImage, ImgContainer, MainContainer, ScreenContainer, ButtonGroupContainer, StyledSpinner, NoZoomImage } from "./styles"
import { Button, Typography, Autocomplete, TextField, AppBar, IconButton, Toolbar, Drawer } from "@mui/material"
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from "../../components/Settings"
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next"
import { ClickableContainer } from "../../shared_styles";


export default function SinglePlayer() {
  const [fighterNumber, setFighterNumber] = useState(Math.round(Math.random()*82))
  const [zooming, setZooming] = useState(false)
  const [zoomOffset, setZoomOffset] = useState({x: 0, y: 0})
  const [alt, setAlt] = useState("")
  const [result, setResult] = useState(Result.NOT_GUESSED)
  const [guess, setGuess] = useState("")
  const [loaded, setLoaded] = useState(false)
  const [typedGuess, setTypedGuess] = useState("")
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [points, setPoints] = useState(1000)
  const [zoomEnded, setZoomEnded] = useState(false)
  const [startTime, setStartTime] = useState(0)

  const navigate = useNavigate()
  const { t } = useTranslation()

  
  useEffect(() => {
    function isConsoleOpen() {  
      var startTime = new Date();
      debugger;
      var endTime = new Date();
  
      return endTime - startTime > 100;
    }
    function detectCheat() {
      console.log("detecting..")
      if (isConsoleOpen()) {
        alert("Hackers não são bem-vindos no Smash Zoom.")
        document.write('<h1>Trapacear no Smash Zoom é um crime muito sério</h1><img src="https://images.pond5.com/hand-cuffed-anonymous-hacker-jail-footage-060580436_iconl.jpeg"/>');
      }
    }
    const ref = setInterval(detectCheat, 1000)
    
    return () => clearInterval(ref)
  })



  const [settings, setSettings] = useState(
    {
      useAlts: false,
      initialZoom: 20,
      zoomTime: 10,
      zoomOffsetRange: 20,
    })

  function randomizeOffset() {
    const xOffset = Math.round(-settings.zoomOffsetRange/2 + Math.random()*settings.zoomOffsetRange);
    const yOffset = Math.round(-settings.zoomOffsetRange/2 + Math.random()*settings.zoomOffsetRange);
    setZoomOffset({x: xOffset, y: yOffset})
  }

  function randomizeFighter() {
    const randomNumber = Math.round(Math.random()*82)
    const randomAlt = settings.useAlts ? Math.round(1 + Math.random()*7) : 1
    const altString =  randomAlt === 1 ? "" : `${randomAlt}`
    setAlt(altString)
    setFighterNumber(randomNumber)
  }
  function newRound() {
    randomizeFighter()
    randomizeOffset()
    setLoaded(false)
    setGuess("")
    setTypedGuess("")
    setResult(Result.NOT_GUESSED)
    setPoints(1000)
    setZoomEnded(false)
  }
  function startZoom() {
    setZooming(true)
    setStartTime(Date.now())
  }
  function cutOffAtZero(numb) {
    if (numb >= 0) {
      return numb
    }
    return 0
  }
  function pauseZoom() {
    setZooming(false)
    if (result !== Result.RIGHT) {
      setPoints((points) => (cutOffAtZero(points - (Date.now() - startTime)/settings.zoomTime)))
    }
  }
  function handleInputChange(e, value, reason) {
    setGuess(value)
  }
  function handleGuess() {
      if (guess === parseDisplayName(fighters[fighterNumber])) {
          setResult(Result.RIGHT)
      }
      else {
          setResult(Result.WRONG)
      }
  }
  function handleZoomEnd() {
    //const elem = document.getElementById("Zoom__Image")
    //elem.style.display = "none"
    if (result !== Result.RIGHT)
      setPoints(0)
    setZooming(false)
    setZoomEnded(true)
  }
  return (
    <ScreenContainer>
      <AppBar position="static">
        <Toolbar sx={{justifyContent: "space-between"}}>
          <ClickableContainer>
            <Typography variant="h6" onClick={() => navigate("/")}>Smash Zoom</Typography>
          </ClickableContainer>
          <IconButton onClick={() => {setSettingsOpen(!settingsOpen)}}>
            <SettingsIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        anchor="right"
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      >
        <Settings 
          onChangeAlt={(checked) => {setSettings({...settings, useAlts: checked})}}
          altValue={settings.useAlts}
          onChangeZoom={(zoom) => {setSettings({...settings, initialZoom: zoom})}}
          zoomValue={settings.initialZoom}
          onChangeZoomTime={(zoomTime) => {setSettings({...settings, zoomTime})}}
          zoomTimeValue={settings.zoomTime}
          onChangeZoomOffset={(zoomOffset) => {setSettings({...settings, zoomOffsetRange: zoomOffset})}}
          zoomOffsetValue={settings.zoomOffsetRange}
          closeDrawer={() => setSettingsOpen(false)}
        />
      </Drawer>
      <MainContainer>
        <ImgContainer loaded>
          {!loaded && <StyledSpinner />}
          {!zoomEnded && <ZoomImage 
            id="Zoom__Image"
            initialZoom={settings.initialZoom} 
            zoomTime={settings.zoomTime}  
            onLoad={() => {setLoaded(true)}} 
            loaded={loaded} 
            zoomOffset={zoomOffset} 
            zooming={zooming} 
            onAnimationIteration={handleZoomEnd}
            src={`https://www.smashbros.com/assets_v2/img/fighter/${fighters[fighterNumber]}/main${alt}.png`}/>}
          <NoZoomImage 
            loaded={loaded}
            zoomEnded={zoomEnded}
            src={`https://www.smashbros.com/assets_v2/img/fighter/${fighters[fighterNumber]}/main${alt}.png`}
          />
        </ImgContainer>
        <ButtonGroupContainer>
          <Button variant="contained" onClick={newRound} disabled={zooming}>{t("new_character")}</Button>
          {zooming ? (
            <Button variant="contained" onClick={pauseZoom}><PauseIcon/></Button>
            ) : (
            <Button variant="contained" onClick={startZoom} disabled={zoomEnded || !loaded}><PlayArrowIcon/></Button>
          )}
        </ButtonGroupContainer>
        <Autocomplete
            disablePortal
            id="fighter-options"
            options={fighters.map((name) => (parseDisplayName(name)))}
            sx={{ width: "200px", marginTop: "30px"}}
            renderInput={(params) => <TextField {...params} label={t("character")} />}
            onChange={(e, value, reason) => {handleInputChange(e, value, reason)}}
            onInputChange={(e, value, reason) => {setTypedGuess(value)}}
            inputValue={typedGuess}
            value={guess}
            isOptionEqualToValue={(option, value) => (option === value || value === "")}
        />
        <Button variant="contained" disabled={guess === "" || result === Result.RIGHT || zooming} onClick={handleGuess} sx={{marginTop: "15px"}}>{t("answer")}</Button>
        <Typography variant="h2" sx={{marginTop: "20px"}}>{result === Result.NOT_GUESSED ? "" : result === Result.RIGHT ? t("correct") : t("wrong")}</Typography>
        {result === Result.RIGHT && <Typography variant="h4">{`${t("score")}: ${Math.round(points)}`}</Typography>}
      </MainContainer>
    </ScreenContainer>
  );
}

