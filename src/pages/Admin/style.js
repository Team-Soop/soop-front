import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    padding: 10px;
    width: 100%;
    height: 100%;
`;

export const header = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;

    & > h1 {
        margin: 0;
        margin-bottom: 20px;
        font-size: 25px;
    }
`;

export const topLayout = css`
    display: flex;
    width: 100%;
`;

export const registerTable = css`
    box-sizing: border-box;
    border-collapse: collapse;
    border: 1px solid #dbdbdb;
    border-radius: 3px;
    width: 100%;
    background-color: #fdfdfd;

    & td {
        box-sizing: border-box;
        border: 1px solid #dbdbdb;
        background-color: white;
    }
`;

export const registerTh = css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    padding: 5px;
    width: 80px;
    cursor: default;
`;

export const preview = css`
    box-sizing: border-box;
    width: 140px;
`;

export const imageBox = css`
    box-sizing: border-box;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 150px;
    height: 100%;
    overflow: hidden;

    & img {
        height: 150px;
    }
`;

export const imgUrl = css`
    display: flex;
    align-items: flex-end;
`;

export const imgUrlBox = css`
    display: inline-block;
    width: 95%;
    line-height: 10px;
`;

export const imgAddButton = css`
    display: flex;
    align-items: flex-end;
    border: none;
    padding: 0;
    background-color: transparent;
    cursor: pointer;
    & > * {
        font-size: 20px;
    }
`;