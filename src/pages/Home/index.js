import { useState } from "react";
import { fighters } from "../../utils/fighters"
import { ZoomImage, ImgContainer, MainContainer, ScreenContainer, ButtonGroupContainer, StyledSpinner } from "./styles"
import { Button, Typography, Autocomplete, TextField, AppBar, IconButton, Toolbar, Drawer } from "@mui/material"
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import SettingsIcon from '@mui/icons-material/Settings';
import Settings from "../../components/Settings"

function Home() {
  const [fighterNumber, setFighterNumber] = useState(Math.round(Math.random()*82))
  const [zooming, setZooming] = useState(false)
  const [binCounter, setBinCounter] = useState(true)
  const [zoomOffset, setZoomOffset] = useState({x: 0, y: 0})
  const [alt, setAlt] = useState("")
  const [result, setResult] = useState("")
  const [guess, setGuess] = useState("")
  const [loaded, setLoaded] = useState(false)
  const [typedGuess, setTypedGuess] = useState("")
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [settings, setSettings] = useState(
    {
      useAlts: false,
      initialZoom: 20,
      zoomTime: 10,
      zoomOffsetRange: 20,
    })

  function parseDisplayName(urlName) {
    let parsedName = (urlName.replace(/_/g, " ")).replace(/\w\S*/g, (word) => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase())
    return(parsedName)
  }

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
    setBinCounter(!binCounter)
    randomizeOffset()
    setLoaded(false)
    setGuess("")
    setTypedGuess("")
    setResult("")
  }
  function startZoom() {
    setZooming(true)
  }
  function pauseZoom() {
    setZooming(false)
  }
  function handleInputChange(e, value, reason) {
    setGuess(value)
  }
  function handleGuess() {
      if (guess === parseDisplayName(fighters[fighterNumber])) {
          setResult("Correto!")
      }
      else {
          setResult("Errado!")
      }
  }
  return (
    <ScreenContainer>
      <AppBar position="static">
        <Toolbar sx={{justifyContent: "space-between"}}>
          <Typography variant="h6">Smash Zoom</Typography>
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
          <ZoomImage 
            initialZoom={settings.initialZoom} 
            zoomTime={settings.zoomTime}  
            onLoad={() => {setLoaded(true)}} loaded={loaded} 
            zoomOffset={zoomOffset} 
            zooming={zooming} 
            zoomAnimation={binCounter} 
            src={`https://www.smashbros.com/assets_v2/img/fighter/${fighters[fighterNumber]}/main${alt}.png`}/>
        </ImgContainer>
        <ButtonGroupContainer>
          <Button variant="contained" onClick={newRound} disabled={zooming}>Sortear</Button>
          {zooming ? (
            <Button variant="contained" onClick={pauseZoom}><PauseIcon/></Button>
            ) : (
            <Button variant="contained" onClick={startZoom}><PlayArrowIcon/></Button>
          )}
        </ButtonGroupContainer>
        <Autocomplete
            disablePortal
            id="fighter-options"
            options={fighters.map((name) => (parseDisplayName(name)))}
            sx={{ width: "200px", marginTop: "30px"}}
            renderInput={(params) => <TextField {...params} label="Personagem" />}
            onChange={(e, value, reason) => {handleInputChange(e, value, reason)}}
            onInputChange={(e, value, reason) => {setTypedGuess(value)}}
            inputValue={typedGuess}
            value={guess}
            isOptionEqualToValue={(option, value) => (option === value || value === "")}
        />
        <Button variant="contained" disabled={guess === ""} onClick={handleGuess} sx={{marginTop: "15px"}}>Responder</Button>
        <Typography variant="h2" sx={{marginTop: "20px"}}>{result}</Typography>
      </MainContainer>
    </ScreenContainer>
  );
}

export default Home;
