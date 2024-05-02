import { css } from "@emotion/react";

export const button = css`
    transition: all 0.3s ease-in-out;
    border: none;
    padding: 10px;
    background-color: transparent;
    font-weight: 600;
    color: #19a3ff;
    cursor: pointer;

    &:hover {
        text-shadow: 0px 0px 10px #19a3ff88;
    }
`;