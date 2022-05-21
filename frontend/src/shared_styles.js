import styled from "styled-components"

export const ScreenContainer = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
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
export const ClickableContainer = styled.div`
    :hover {
        cursor: pointer;
    }
`