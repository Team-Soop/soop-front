import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 10px 20px ;
    border: 2px solid #8A9C99;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    background-color: #F6F5EF;
    overflow-y: auto;
`
export const contentLayout = css`
    margin: 10px;
    border-radius: 10px;
    border: 2px solid white;
    /* background-color: #b5ddd6; */
`

export const addButton = css`
    display: flex;
    justify-content: f;
    width: 100%;

    & > button {
        margin-left: 5px;
        width: 70px;
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

export const userInfo = css`
    display: flex;
    align-items: center;
    margin: 10px;
    height: 60px;

    & > img {
        width: 40px;
        border-radius: 50%;
        margin-right: 20px;
    }
`
export const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    height: 60px;
`

export const title = css`
    font-size: 24px;
    margin-bottom: 0;
`

export const titleInBox = css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    font-size: 12px;
`

export const option = css`
    height: 100%;
    padding: 10px 0px;

    & > * {
        margin: 5px 10px;
    }
`

export const period = css`
    & > div {
        display: flex;
        justify-content: space-between;
    }
`

export const complete = css`
    color: #ff0000;
`

export const recruiting = css`
    display: flex;
    justify-content: space-between;
    color: #0044ff;

`

export const skills = css`
    display: flex;
    flex-wrap: wrap;
    margin: 10px;

    & > div {
        margin-right: 5px;
    }

    & > div:nth-of-type(1) {
        font-weight: bold;
    }

`

export const skillList = css`
    
`

export const memberCount = css`
        display: flex;
    flex-wrap: wrap;

    & > div {
        margin-right: 5px;
    }

    & > div:nth-of-type(1) {
        font-weight: bold;
    }

`

export const content = css`
    padding: 10px;
`

export const memberLayout = css`
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    width: 100%;

    & > button {
        width: 70px;
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

