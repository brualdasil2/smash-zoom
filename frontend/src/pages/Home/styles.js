import styled from "styled-components"

export const ButtonsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-around;
    height: 50%;
    width: min-content;
    margin-top: 20%;
    @media only screen and (min-width: 600px) {
        flex-direction: row;
        width: 50%;
        max-width: 500px;
        height: min-content;
    }
`