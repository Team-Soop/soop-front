import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    border: 2px solid #ffffff73;
    border-radius: 20px;
    width: 320px;
    height: 50vh;
    background-color: #fafafa88;
`


export const container = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 5px;
    width: 100%;
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`

export const alarmCard = css`
    box-sizing: border-box;
    position: relative;
    width: 100%;
    /* height: 100%; */
    margin: 10px;
    border: 1px solid #ffffff;
    border-radius: 5px;
    padding: 10px;
    background-color: #fafafa88;
`

export const cardDetail = css`
    position: relative;
    width: 100%;
`

export const toUser = css`
    display: flex;
    align-items: center;
    margin: 5px 0px;
    cursor: default;

    & > img {
        width: 20px;
    }
`

export const closeButton = css`
    position: absolute;
    top: 10px;
    right: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    width: 20px;
    height: 20px;
    background-color: transparent;
    cursor: pointer;
    & > * {
        font-size: 18px;
        color: #1f4d36;
    }
`

export const content = css`
    font-size: 14px;
    cursor: default;
`