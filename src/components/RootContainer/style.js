import { css } from "@emotion/react";

export const container = css`
    position: absolute;
    box-sizing: border-box;
    display: flex;
    padding: 50px 300px;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    z-index: -99;
    &::-webkit-scrollbar {
        display: none;
    }
`;