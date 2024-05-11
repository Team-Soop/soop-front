import { css } from "@emotion/react";

export const root = css`
    width: 700px;
    height: 100%;
    border-radius: 5px;
    box-sizing: border-box;
    border: 2px solid #8a9c99;
    background-color: #f6f5ef;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
`;

export const title = css`
    width: 100%;
    height: 10%;
    font-size: 28px;
    font-weight: 400;
    color: #1f4d36;
    text-align: center;
    line-height: 100px;
    padding-bottom: 10px;
    cursor: default;
`;

export const main = css`
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export const inputBox = css`
    width: 100%;
    padding-left: 25px;
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

    & > div {
        width: 100%;
        cursor: pointer;
    }

    & > div:hover {
        background-color: #c4d9d5;
    }

    & > div:active {
        background-color: #94b5b0;
    }
`;
