import { css } from "@emotion/react";

export const modalLayout = css`
    box-sizing: border-box ;
    position: relative;
    padding: 30px;
    border: 1px solid black;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 500px;
    height: 800px;
    background-color: white;

    & > :nth-of-type(1) {
        margin-bottom: 10px;
        padding-bottom: 10px;
        border-bottom: 1px solid black;
    }
`

export const header = css`
    display: flex;
    justify-content: space-between;
`

export const memeberBox = css`
    border-bottom: 1px solid black;
    margin-bottom: 10px;
    padding-bottom: 10px;

`

export const memberList = css`
    display: flex;
    justify-content: space-between;
    margin: 5px 10px;
    

    & > div > button {
        margin: 0px 5px;
        width: 100px;
    }
`