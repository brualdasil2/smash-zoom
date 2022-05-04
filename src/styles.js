import styled from "styled-components";

export const ZoomImage = styled.img`
    width: 300px;
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
`
export const ImgContainer = styled.div`
    overflow: hidden;
    border: 1px black solid;
    width: min-content;
`
export const Button = styled.button`
    width: 100px;
    height: 50px;
`