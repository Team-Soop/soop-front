import { css } from "@emotion/react";

export const container = css`
    box-sizing: border-box;
    display: flex;
    padding: 50px 300px;
    width: 100%;
    height: 100vh;
    overflow-y: auto;
    &::-webkit-scrollbar {
        display: none;
    }
`;