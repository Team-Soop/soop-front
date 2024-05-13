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
    width: 600px;
    height: 700px;
    background-color: white;

`

export const header = css`
    display: flex;
    justify-content: space-between;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 2px solid #8A9C99;
    width: 100%;

    & > button {
        margin-left: 5px;
        border: 1px solid #dadada;
        border-radius: 5px;
        background-color: white;
        width: 65px;
        height: 30px;
        font-size: 12px;
        cursor: pointer;

        :hover {
            background-color: #e7e7e7;
        }
        :active {
            background-color: #d7d7d7;
        }
    }

`

export const modalName = css`
    font-size: 28px;
    color: #1F4D36;
`

export const title = css`
    box-sizing: border-box;
    display: flex;
    align-items: center;
    margin: 20px 0px;
    width: 100%;

    & > input {
        flex: auto;
        padding: 10px;
        border: 1px solid #8b8b8b;
        border-radius: 5px;
        font-size: 16px;
    }
`

export const skills = css`
    display: flex;
    flex-direction: column;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #8A9C99;

    & > div:nth-of-type(1) {
        margin-bottom: 5px;
    }
`

export const skillBox = css`
    display: flex;
    flex-wrap: wrap;

    & > div {
        margin-bottom: 5px;
    }
`

export const checkBoxList = css`
    display: flex;
    margin-right: 15px;



    & > input {
        margin-right: 5px;
    }
`

export const memberLimeted = css`
    display: flex;
    align-items: center;
    padding-bottom: 10px;
    margin-bottom: 10px;
    border-bottom: 1px solid #8A9C99;

    & > div {
        margin-right: 10px;
    }

    & > div:nth-of-type(2) {
        align-items: center;
    }
`

export const numList = css`
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 5px 10px;
    border: 1px solid black;
    width: 60px;
    background-color: white;
    text-align: center;

    z-index: 5;

    & > a {
        position: relative;
        padding: 2px 10px;
        width: 100%;

        :hover {
            background-color: #6aabff;
        }
    }
`

export const endTime = css`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #8A9C99;
    height: 26px;


    & > div { 
        margin-right: 10px;
    } 


`

export const quill = css`
    position: relative;
    height: 250px;
    margin-bottom: 50px;
`

export const applyButton = css`
    display: flex;
    justify-content: flex-end;

    & > button {
        margin-left: 5px;
        border: 1px solid #dadada;
        border-radius: 5px;
        background-color: white;
        width: 65px;
        height: 30px;
        font-size: 12px;
        cursor: pointer;

        :hover {
            background-color: #e7e7e7;
        }
        :active {
            background-color: #d7d7d7;
        }
    }

`