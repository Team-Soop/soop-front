import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    position: absolute;
    padding: 10px;
    border: 2px solid #ffffff73;
    border-radius: 20px;
    top: 60px;
    right: 60px;
    width: 320px;
    height: 50vh;
    z-index: 500;

    overflow: auto;

    background-color: #fafafa88;
`

export const alarmCard = css`
    position: relative;
    width: 240px;
    /* height: 100%; */
    margin: 10px;
    border: 1px solid #ffffff;
    border-radius: 5px;
    background-color: white;
`

export const cardDetail = css`
    position: relative;
    width: 100%;
`

export const toUser = css`
    display: flex;
    align-items: center;
    margin: 5px 0px;

    & > img {
        width: 20px;
    }
`

export const closeButton = css`
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    
    & > button {
        display: none;
        position: absolute;
        width: 20px;
        top: 5px;
        right: 5px;
    }

    :hover {
        & > button {
            display: block;
        }
    }
`

export const content = css`
    font-size: 14px;
`