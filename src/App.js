import { useState } from "react";
import {fighters} from "./fighters"
import {Button, ZoomImage, ImgContainer} from "./styles"

function App() {
  const [fighterNumber, setFighterNumber] = useState(0)
  const [zooming, setZooming] = useState(false)
  const [binCounter, setBinCounter] = useState(true)

  function randomizeFighter() {
    const randomNumber = Math.round(Math.random()*82)
    setFighterNumber(randomNumber)
    setBinCounter(!binCounter)
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
        <ZoomImage zooming={zooming} zoomAnimation={binCounter ? "zoom" : "zoom2"} src={`https://www.smashbros.com/assets_v2/img/fighter/${fighters[fighterNumber]}/main.png`}/>
      </ImgContainer>
      <Button onClick={randomizeFighter}>Sortear</Button>
      {zooming ? (
        <Button onClick={pauseZoom}>Pausar</Button>
        ) : (
        <Button onClick={startZoom}>Começar</Button>
      )}
    </div>
  );
}

export default App;
