import { useState } from "react"

export default function Timer() {
    const [time, setTime] = useState(0)
    const [intervalVar, setIntervalVar] = useState()

    function startTimer() {
        setIntervalVar(setInterval(() => {setTime(time => time+1)}, 1000))
    }
    function stopTimer() {
        clearInterval(intervalVar)
    }
    function resetTimer() {
        setTime(0)
    }

    return (
        <>
            <h2>{time}</h2>
            <button onClick={startTimer}>Start</button>
            <button onClick={stopTimer}>Stop</button>
            <button onClick={resetTimer}>Reset</button>
        </>
    )
}