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

    & > h1 {
        padding: 15px 0px 0px 15px;
        font-size: 28px;
        color: #1F4D36;
    }
`

export const header = css`
    box-sizing: border-box;
    margin-top: 10px;
    padding: 0px 10px;
    border-top: 2px solid white;
    width: 100%;
`

export const searchTitle = css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 2px solid #CAD8D8;
    width: 100%;
    height: 40px;

    & > button {
        width: 50px;
        height: 30px;
        border: 1px solid #CAD8D8;
        border-radius: 5px;

        background-color: white;
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

export const searchTitleBox = css`
    box-sizing: border-box;
    width: 80%;
    & > label {
        margin-right: 10px;
        font-size: 14px;
    }

    & > input {
        width: 90%;
        height: 100%;
    }
`

export const searchCategory = css`
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    padding-bottom: 10px;
    border-bottom: 2px solid #CAD8D8;
    

`

export const searchCategoryBox = css`
    margin-right: 20px;
    width: 100px;

    & > input {
        margin-right: 5px;

        :hover {
            border: 2px solid black;
        }
    }

    & > label {
        font-size: 14px;
        
        :hover .test {
            background-color: teal
        }
    }

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