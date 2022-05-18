import { useEffect } from "react"
import { Route, Routes, useNavigate, Switch } from "react-router"
import { listenToRoom } from "../../api/api"
import { useRoom } from "../../hooks/useRoom"
import Room from "./Room"
import MpMenu from "./MpMenu"

export default function MultiPlayer() {
 
    return (
        <>
            <Routes>
                <Route path="menu" element={<MpMenu />} />
                <Route path="room/*" element={<Room />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </>
    )
}