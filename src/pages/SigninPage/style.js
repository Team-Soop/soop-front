import { css } from "@emotion/react";

export const root = css`
    width: 500px;
    height: 100%;
    border-radius: 5px;
    box-sizing: border-box;
    border: 2px solid #8A9C99;
    background-color: #F6F5EF;
`
export const signinLayout = css`
    position: absolute;
    justify-content: center;
    text-align: center;
    width: 500px;
    height: 500px;
    top: 50%;
    transform: translateY(-50%);
    h1 {
        margin-bottom: 40px;
    }
`;

export const authPageInput = css`
    margin: 0 auto;
    width: 300px;
    margin-bottom: 15px;
    input {
        box-sizing: border-box;
        padding: 0 5px;
        width: 300px;
        height: 45px;
        /* border: 1px solid #b8d6fd; */
        border: 1px solid #dbdbdb;
    }
    input:nth-of-type(1){
        margin-bottom: 5px;
    }
`;

export const button = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 5px;
    width: 100%;

`;

export const signinButton = css`
    border: none;
    height: 35px;
    width: 300px;
    margin-bottom: 5px;
    background-color: #CBF1F5;
    cursor: pointer;
    &:hover {
        background-color: #B3E7EC;
        
    }
    &:active{
        background-color: #97D7DB;
    }
    a{
        display: block;
        text-decoration: none;
        padding: 5px;
    }
    a:link{
        color: #333333;
    }
    a:visited{
        color: #333333;
    }
    a:hover{
        color: #c2dbff;
    }

`;

export const oauth2Signin = css`
    margin: 0 auto;
    display: flex;
    width: 300px;
    justify-content: space-between;
    div{
        box-sizing: border-box;
        margin: 15px 5px 5px 0;
        width: 33%;
        height: 40px;
        border-radius: 5px;

    }
    div:nth-of-type(1) {
        background-color: #F7E111;
    }
    div:nth-of-type(2) {
        background-color: #f0f0f0;
    }
    div:nth-of-type(3) {
        background-color: #03CA5B;
    }
    a{
        display: block;
        font-size: 20px;
        padding: 10px;
    }
    a:link{
        color: black;
    }
    a:visited{
        color: black;
    }
`;