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
    height: 800px;
    background-color: white;

    overflow-y: auto;
`



export const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #CAD8D8;

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

export const modalName = css`
    font-size: 18px;
    font-weight: bold;
`

export const memeberBox = css`
    border-bottom: 1px solid #CAD8D8;
    margin-bottom: 20px;
    padding-bottom: 10px;

`

export const memberList = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    

    & > div > button {
        margin-left: 5px;
        width: 100px;
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

export const memberInfo = css`
    display: flex;
    align-items: center;
    margin-bottom: 10px;

    & > img {
        margin-right: 10px;
        border-radius: 50%;
        width: 40px;
    }
`