import { useEffect, useState } from "react";
import { fighters, parseDisplayName } from "../../../../utils/fighters";
import { Result } from "../../../../utils/result";
import UsersWaiting from "../../../../components/UsersWaiting";
import {
  ZoomImage,
  ImgContainer,
  MainContainer,
  ScreenContainer,
  ButtonGroupContainer,
  StyledSpinner,
  NoZoomImage,
} from "./styles";
import {
  Button,
  Typography,
  Autocomplete,
  TextField,
  AppBar,
  IconButton,
  Toolbar,
  Drawer,
} from "@mui/material";
import PauseIcon from "@mui/icons-material/Pause";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import { useRoom } from "../../../../hooks/useRoom";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function Game() {
  //const [fighterNumber, setFighterNumber] = useState(Math.round(Math.random()*82))
  const [zooming, setZooming] = useState(false);
  //   const [zoomOffset, setZoomOffset] = useState({x: 0, y: 0})
  //   const [alt, setAlt] = useState("")
  const [result, setResult] = useState(Result.NOT_GUESSED);
  const [guess, setGuess] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [typedGuess, setTypedGuess] = useState("");
  //   const [settingsOpen, setSettingsOpen] = useState(false)
  const [points, setPoints] = useState(1000);
  const [zoomEnded, setZoomEnded] = useState(false);
  const [startTime, setStartTime] = useState(0);
  const [waiting, setWaiting] = useState(false);

  const { roomData, handleSendScore } = useRoom();
  const navigate = useNavigate();
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

  const settings = {
    initialZoom: 20,
    zoomTime: 10,
  };

  function startZoom() {
    setZooming(true);
    setStartTime(Date.now());
  }
  function cutOffAtZero(numb) {
    if (numb >= 0) {
      return numb;
    }
    return 0;
  }
  function pauseZoom() {
    setZooming(false);
    if (result === Result.NOT_GUESSED) {
      setPoints((points) =>
        cutOffAtZero(points - (Date.now() - startTime) / settings.zoomTime)
      );
    }
  }
  function handleInputChange(e, value, reason) {
    setGuess(value);
  }
  function handleGuess() {
    if (guess === parseDisplayName(fighters[roomData.character])) {
      setResult(Result.RIGHT);
    } else {
      setResult(Result.WRONG);
      setPoints(0);
    }
  }
  function handleZoomEnd() {
    //const elem = document.getElementById("Zoom__Image")
    //elem.style.display = "none"
    if (result !== Result.RIGHT) setPoints(0);
    setZooming(false);
    setZoomEnded(true);
  }
  function handleNext() {
    setWaiting(true);
    handleSendScore(Math.round(points));
  }
  return (
    <ScreenContainer>
      {waiting ? (
        <MainContainer>
          <Typography variant="h4">{t("waiting")}</Typography>
          <UsersWaiting users={roomData.users} />
        </MainContainer>

      ) : (
        <>
          <MainContainer>
            <Typography variant="h4" sx={{margin:"20px"}}>{t("round")} {roomData.round}</Typography>
            <ImgContainer loaded>
              {!loaded && <StyledSpinner />}
              {!zoomEnded && roomData.character && (
                <ZoomImage
                  id="Zoom__Image"
                  initialZoom={settings.initialZoom}
                  zoomTime={settings.zoomTime}
                  onLoad={() => {
                    setLoaded(true);
                  }}
                  loaded={loaded}
                  zoomOffset={roomData.position}
                  zooming={zooming}
                  onAnimationIteration={handleZoomEnd}
                  src={`https://www.smashbros.com/assets_v2/img/fighter/${fighters[roomData.character]}/main${roomData.alt === 1 ? "" : roomData.alt}.png`}
                />
              )}
              <NoZoomImage
                loaded={loaded}
                zoomEnded={zoomEnded}
                src={`https://www.smashbros.com/assets_v2/img/fighter/${fighters[roomData.character]}/main${roomData.alt === 1 ? "" : roomData.alt}.png`}
              />
            </ImgContainer>
            <ButtonGroupContainer>
              {zooming ? (
                <Button variant="contained" onClick={pauseZoom}>
                  <PauseIcon />
                </Button>
              ) : (
                <Button
                  variant="contained"
                  onClick={startZoom}
                  disabled={zoomEnded || !loaded}
                >
                  <PlayArrowIcon />
                </Button>
              )}
            </ButtonGroupContainer>
            {result === Result.NOT_GUESSED && 
            <>
              <Autocomplete
                disablePortal
                id="fighter-options"
                options={fighters.map((name) => parseDisplayName(name))}
                sx={{ width: "200px", marginTop: "30px" }}
                renderInput={(params) => (
                  <TextField {...params} label={t("character")} />
                )}
                onChange={(e, value, reason) => {
                  handleInputChange(e, value, reason);
                }}
                onInputChange={(e, value, reason) => {
                  setTypedGuess(value);
                }}
                inputValue={typedGuess}
                value={guess}
                isOptionEqualToValue={(option, value) =>
                  option === value || value === ""
                }
              />
              <Button
                variant="contained"
                disabled={
                  guess === "" || result !== Result.NOT_GUESSED || zooming
                }
                onClick={handleGuess}
                sx={{ marginTop: "15px" }}
              >
                {t("answer")}
              </Button>
            </>
            } 
            <Typography variant="h5" sx={{ marginTop: "20px", textAlign:"center" }}>
              {result === Result.NOT_GUESSED
                ? ""
                : result === Result.RIGHT
                ? t("correct")
                : `${t("wrong_reveal")} ${parseDisplayName(
                    fighters[roomData.character]
                  )}`}
            </Typography>
            {result === Result.RIGHT && (
              <Typography variant="h4">{`${t("score")}: ${Math.round(
                points
              )}`}</Typography>
            )}
            {result !== Result.NOT_GUESSED && (
              <Button
                variant="contained"
                onClick={handleNext}
                sx={{ margin: "15px" }}
              >
                {t("next")}
              </Button>
            )}
          </MainContainer>
        </>
      )}
    </ScreenContainer>
  );
}
