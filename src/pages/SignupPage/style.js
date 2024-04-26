import { css } from "@emotion/react";

export const root = css`
    width: 500px;
    height: 900px;
`

export const signupLayout = css`
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
        border: 1px solid #b8d6fd;
    }
    input:nth-of-type(1){
        margin-bottom: 2px;
    }
`;

export const signinButton = css`
    border: none;
    height: 40px;
    width: 300px;
    margin-bottom: 5px;
    background-color: #b8d6fd;
    cursor: pointer;
    &:hover {
        background-color: #4494fc;
        color: #c2dbff;
    }
    &:active{
        background-color: #1071fa;
    }
    a{
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
