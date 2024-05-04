import { css } from "@emotion/react";


export const container = css`
    box-sizing: border-box;
    margin: 0px auto;
    display: flex;
    justify-content: center;
    border: 2px solid #ffffff73;
    border-radius: 20px;
    padding: 40px;
    width: 600px;
    height: 100%;
    background-color: #fafafa88;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;