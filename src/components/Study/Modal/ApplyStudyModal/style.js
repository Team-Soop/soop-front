import { css } from "@emotion/react";

export const modal = css`
    width: 100%;
    height: 100%;
    background-color: #00000088;
`

export const modalLayout = css`
    box-sizing: border-box ;
    position: relative;
    padding: 30px;
    border: 2px solid #CAD8D8;
    border-radius: 10px;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 500px;
    height: 350px;
    background-color: white;
`

export const modalName = css`
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #CAD8D8;
    font-size: 18px;
    font-weight: bold;
`

export const header = css`
    display: flex;
    margin-bottom: 10px;

    & > div:nth-of-type(1) {
        margin-right: 5px;
    }

`

export const message = css`
    display: flex;
    flex-direction: column;
    margin-bottom: 10px;

    & > textarea {
        padding: 10px;
        margin-top: 10px;
        border: 1px solid #CAD8D8;
        border-radius: 10px;
        height: 120px;
        resize: none;
    }
`

export const applyButtons = css`
    display: flex;
    justify-content: flex-end;
    width: 100%;

    & > button {
        margin-left: 5px;
        width: 50px;
        height: 30px;
        border: 1px solid #CAD8D8;
        border-radius: 5px;

        background-color: white;
        font-size: 12px;
        cursor: pointer;

        :hover {
            background-color: #e7e7e7;
            /* color: white; */
        }
        :active {
            background-color: #d7d7d7;
        }

    }

`