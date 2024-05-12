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

export const header = css`
    box-sizing: border-box;
    padding: 10px;
    border-bottom: 2px solid #CAD8D8;
    width: 100%;
`

export const modalName = css`
    margin-bottom: 10px;
    padding-bottom: 10px;
    border-bottom: 1px solid #CAD8D8;
    font-size: 28px;
    font-weight: bold;
    color: #1F4D36;
`

export const boardListLayout = css`
    width: 100%;
`

export const boardContent = css`
    display: flex;
    margin: 10px;
    padding: 5px;
    border: 2px solid #CAD8D8;
    border-radius: 10px;
    
`

export const userInfo = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0px;
    border-right: 2px solid #CAD8D8;
    width: 20%;

    & > img {
        width: 50px;
        margin-bottom: 10px;
        border-radius: 50%;
    }
`

export const contentBody = css`
    padding: 10px 0px 0px 10px;
    width: 50%;
`


export const skill = css`
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    border-bottom: 1px solid white;


    & > label { 
        margin-right: 5px;
    }
    & > div {
        margin-right: 5px;
    }
    
`

export const title = css`
    margin-top: 20px;
    margin-bottom: auto;
`

export const party = css`
    display: flex;
    justify-content: space-between;
    flex-direction: column;
    padding: 5px 0px;
    width: 25%;

`

export const period = css`
display: flex;
justify-content: end;

    & > div {
        margin-right: 5px;
        font-size: 13px;
    }

`

export const complete = css`
    color: #ff0000;
`

export const recruiting = css`
    display: flex;
    justify-content: space-between;
    
    color: #0044ff;
    & > div {
        margin-left: 5px;
    }

    & > div:nth-of-type(2) {
        color: black;
    }
`


export const memberCount = css`
    display: flex;
    justify-content: end;

    font-size: 13px;
`