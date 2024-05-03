import { css } from "@emotion/react";

export const container = css`
    box-sizing: border-box;
    z-index: -99;
    display: flex;
    padding: 50px 200px;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;