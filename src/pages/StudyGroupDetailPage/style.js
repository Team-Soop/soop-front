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
    border: 1px solid white;
    height: 100%;
`

export const userInfo = css`
    display: flex;
    align-items: center;
    margin: 10px;

    & > img {
        width: 20px;
        border-radius: 50%;
        margin-right: 20px;
    }
`
export const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 10px;
    padding-top: 10px;
    border-top: 2px solid #CAD8D8;
    height: 40px;
`

export const title = css`
    font-size: 24px;
    margin-bottom: 0;
`

export const period = css`
    display: flex;
    justify-content: space-between;
    margin: 10px;
    padding-top: 10px;
    border-top: 2px solid #CAD8D8;


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

export const memberCount = css`
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

export const memberLayout = css`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    width: 100px;
`