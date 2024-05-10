import { css } from "@emotion/react";

export const accountEditPage = css`
    box-sizing: border-box;
    width: 700px;
    border-radius: 5px;
    border: 2px solid #8a9c99;
    background-color: #f6f5ef;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`;

export const title = css`
    width: 100%;
    height: 70px;
    border-bottom: 2px solid #8a9c99;
    font-size: 40px;
    font-weight: 400;
    text-align: center;
    line-height: 70px;
`;

export const main = css`
    width: 100%;
    height: 70%;
`;

export const profileImgBox = css`
    width: 100%;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const profileImg = css`
    width: 35%;
    border-radius: 50%;
    border: 2px solid #8a9c99;
`;

export const infoBox = css`
    width: 100%;
    height: 100px;
    display: flex;
    flex-direction: column;
`;

export const usernameBox = css`
    padding-top: 12px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    & > h1 {
        font-size: 40px;
        font-weight: 600;
    }
    & > h2 {
        margin-top: 10px;
        font-size: 15px;
        color: #22222266;
    }
`;

export const editBox = css`
    width: 100%;
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;

    & > div {
        display: flex;
        justify-content: right;
    }
`;

export const labelBox = css`
    width: 100px;
    height: 50px;
    display: flex;
    justify-content: left;
    align-items: center;
`;

export const label = css`
    font-size: 16px;
`;

export const checkButton = css`
    position: absolute;
    right: 45px;
    background-color: transparent;
    border: none;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
`;

export const inputBox = css`
    position: relative;
    width: 60%;
    height: 50px;
    display: flex;
    align-items: center;

    & > input {
        margin-left: 5px;
        width: 200px;
        height: 20px;
        font-size: 14px;
        padding: 5px;
        background-color: transparent;
        outline: none;
        border: none;
        border-bottom: 1px solid #dbdbdb;
    }
`;

export const buttonBox = css`
    box-sizing: border-box;
    border-top: 2px solid #cad8d8;
    width: 100%;
    height: 50px;
    text-align: center;
    line-height: 50px;
    font-size: 18px;
    font-weight: 500;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div:nth-of-type(1) {
        cursor: pointer;
        box-sizing: border-box;
        width: 30%;
        height: 100%;
        border-right: 2px solid #cad8d8;
    }
    & > div:nth-of-type(2) {
        cursor: pointer;
        box-sizing: border-box;
        width: 40%;
        height: 100%;
        border-right: 2px solid #cad8d8;
    }
    & > div:nth-of-type(3) {
        cursor: pointer;
        width: 30%;
        height: 100%;
    }

    & > div:hover {
        background-color: #c4d9d5;
    }

    & > div:active {
        background-color: #94b5b0;
    }
`;
