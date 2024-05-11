import { css } from "@emotion/react";

export const layout = css`
    position: relative;
    width: 100%;
    min-height: 100vh;
`;

export const header = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    margin: 35px 0px;
    border: 2px solid #8a9c99;
    background-color: #f6f5ef;
    width: 100%;
    & > :nth-of-type(1) {
        border-right: 1px solid black;
    }
    & > div {
        display: flex;
        justify-content: center;
        padding: 3px 0px;
        width: 100%;
        cursor: pointer;
        :hover {
            background-color: #b3e7ec;
        }
        :active {
            background-color: #97d7db;
        }
    }
`;

export const feedPageLayout = css`
    width: 100%;
    height: 100%;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;
