import Home from "./pages/Home"
import Settings from "./pages/Settings"
import { Routes, Route } from "react-router-dom"

function App() {
  

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/settings" element={<Settings />}/>
    </Routes>
  );
}

export default App;
