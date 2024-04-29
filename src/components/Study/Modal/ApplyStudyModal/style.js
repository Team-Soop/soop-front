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
    height: 300px;
`

export const header = css`
    display: flex;
    justify-content: space-between;
`