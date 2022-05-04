import { useState } from "react";
import {fighters} from "./fighters"
import {Button, ZoomImage, ImgContainer} from "./styles"

function App() {
  const [fighterNumber, setFighterNumber] = useState(0)
  const [zooming, setZooming] = useState(false)
  const [binCounter, setBinCounter] = useState(true)
  const [zoomOffset, setZoomOffset] = useState({x: 0, y: 0})
  const [alt, setAlt] = useState("")
  const [showAnswer, setShowAnswer] = useState(false)

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
  }
  function startZoom() {
    setZooming(true)
  }
  function pauseZoom() {
    setZooming(false)
  }

  return (
    <div>
      <ImgContainer>
        <ZoomImage zoomOffset={zoomOffset} zooming={zooming} zoomAnimation={binCounter ? "zoom" : "zoom2"} src={`https://www.smashbros.com/assets_v2/img/fighter/${fighters[fighterNumber]}/main${alt}.png`}/>
      </ImgContainer>
      <Button onClick={randomizeFighter}>Sortear</Button>
      {zooming ? (
        <Button onClick={pauseZoom}>Pausar</Button>
        ) : (
        <Button onClick={startZoom}>Começar</Button>
      )}
      <Button onClick={() => {setShowAnswer(true)}}>Mostrar resposta</Button>
      {showAnswer && <h2>{parseDisplayName(fighters[fighterNumber])}</h2>}
    </div>
  );
}

export default App;
