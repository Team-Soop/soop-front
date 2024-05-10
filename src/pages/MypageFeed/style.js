import { css } from "@emotion/react";

export const mypageFeedRootLayout = css`
    box-sizing: border-box;
    position: relative;
    width: 100%;
    height: 100%;
`;

export const mypageFeedLayout = css`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;

export const root = css`
    width: 700px;
    height: 100%;
    border-radius: 5px;
    box-sizing: border-box;
    border: 2px solid #8a9c99;
    background-color: #f6f5ef;
    display: flex;
    justify-content: center;
    align-items: center;

    & > div {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    & > div > div {
        margin-top: 6px;
        color: red;
        font-size: 33px;
    }

    & > div > h1 {
        font-size: 30px;
        font-weight: 400;
    }
`;
