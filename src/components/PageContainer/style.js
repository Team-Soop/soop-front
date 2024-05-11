import { css } from "@emotion/react";


export const container = css`
    position: relative;
    box-sizing: border-box;
    margin: 0px auto;
    display: flex;
    border-radius: 5px;
    width: 550px;
    justify-content: center;
    background-color: #ffffff00;
    overflow-y: auto;
    z-index: -1;
    &::-webkit-scrollbar {
        display: none;
    }
`;