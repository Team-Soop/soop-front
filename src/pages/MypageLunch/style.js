import { css } from "@emotion/react";

export const layout = css`
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

export const header = css`
    width: 100%;

    & > .button {
        right: 0px;
    }
`;

export const boardListLayout = css`
    width: 400px;
`;

export const boardContent = css`
    margin: 20px;
    padding: 5px;
    border: 1px solid white;
`;
