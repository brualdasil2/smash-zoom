import styled from "styled-components";
import { keyframes } from "styled-components";

export const ScreenContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
`
export const StyledSpinner = styled.div`
    border: 5px solid black;
    border-top: 5px solid transparent;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 2s linear infinite;
    position: relative;
    left: calc(50% - 25px);
    top: calc(50% - 25px);
    @keyframes spin {
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
}
`
export const MainContainer = styled.main`
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 20px;
    position: relative;
`
const zoom = (initialZoom) => keyframes`
    0% {
        transform: scale(${initialZoom});
    }
    100% {
        transform: scale(1.0);
    }
`
const zoom2 = (initialZoom) => keyframes`
    0% {
        transform: scale(${initialZoom});
    }
    100% {
        transform: scale(1.0);
    }
`
 
export const ZoomImage = styled.img`
    pointer-events: none;
    width: 100%;
    height: auto;
    transform-origin: ${(props) => `${50+props.zoomOffset.x}% ${50+props.zoomOffset.y}%`};
    animation: ${(props) => props.zoomAnimation ? zoom(props.initialZoom) : zoom2(props.initialZoom)};
    animation-duration: ${(props) => props.zoomTime}s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-play-state: ${(props) => props.zooming ? "running" : "paused"};
    display: ${(props) => props.loaded ? "inline" : "none"};
`
export const NoZoomImage = styled.img`
    pointer-events: none;
    width: 100%;
    height: auto;
    display: ${(props) => !props.loaded ? "none" : (props.zoomEnded ? "inline" : "none")};
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
    height: ${(props) => props.loaded ? "auto" : "300px"};
    min-height: 300px;
    max-width: 400px;
`
export const Button = styled.button`
    width: 100px;
    height: 50px;
`