import styled from "styled-components";

export const ScreenContainer = styled.div`
    width: 100vw;
    height: 100vh;
    padding-top: 10px;
    padding-left: 5px;
    padding-right: 5px;
`

export const MainContainer = styled.main`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ZoomImage = styled.img`
    width: 100%;
    height: auto;
    @keyframes zoom2 {
        0% {
            transform: scale(20.0);
        }
        100% {
            transform: scale(1.0);
        }
    } 
    @keyframes zoom {
        0% {
            transform: scale(20.0);
        }
        100% {
            transform: scale(1.0);
        }
    } 
    transform-origin: ${(props) => `${50+props.zoomOffset.x}% ${50+props.zoomOffset.y}%`};
    animation: ${(props) => props.zoomAnimation};
    animation-duration: 10s;
    animation-iteration-count: 1;
    animation-timing-function: linear;
    animation-play-state: ${(props) => props.zooming ? "running" : "paused"};
    display: ${(props) => props.loaded ? "inline" : "none"};
`
export const ButtonGroupContainer = styled.div`
    display: flex;
    justify-content: space-around;
    width: 80%;
    max-width: 300px;
    margin-top: 20px;
`
export const ImgContainer = styled.div`
    overflow: hidden;
    border: 1px black solid;
    width: 80%;
    min-height: 300px;
    max-width: 500px;
`
export const Button = styled.button`
    width: 100px;
    height: 50px;
`