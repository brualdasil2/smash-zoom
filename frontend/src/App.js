import SinglePlayer from "./pages/SinglePlayer"
import MultiPlayer from "./pages/MultiPlayer"
import Home from "./pages/Home"
import { Routes, Route } from "react-router-dom"
import RoomContextProvider from "./contexts/RoomContext"

function App() {
  

  return (
    <RoomContextProvider>
      <Routes>
        <Route path="" element={<Home />}/>
        <Route path="/singleplayer" element={<SinglePlayer />}/>
        <Route path="/multiplayer/*" element={<MultiPlayer />}/>
        <Route path="*" element={<h1>404</h1>}/>
      </Routes>
    </RoomContextProvider>
  );
}

export default App;
