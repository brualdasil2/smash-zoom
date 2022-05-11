import styled from "styled-components"

export const SettingsContainer = styled.div`
    width: 80vw;
    max-width: 500px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
`
export const ExampleImageContainer = styled.div`
    width: 80%;
    height: auto;
    border: 2px black solid;
    position: relative;
`
export const ExampleAreaRect = styled.div`
    background-color: transparent;
    border: 3px red solid;
    width: ${(props) => (props.zoomOffset)}%;
    height: ${(props) => (props.zoomOffset)}%;
    position: absolute;
    right: ${(props) => (50 - props.zoomOffset/2)}%;
    top: ${(props) => (50 - props.zoomOffset/2)}%;
`
export const ExampleImage = styled.img`
    width: 100%;
    height: auto;
`

export const FlexRowContainer = styled.div`
    width: max-content;
    display: flex;
`