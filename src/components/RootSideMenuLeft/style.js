import { css } from "@emotion/react";

export const layout = (show) => css`
    position: absolute;
    top: 0;
    left: 0;
    z-index: 99;
    box-sizing: border-box;
    border-right: 1px solid #dbdbdb;
    padding: 15px 0px;
    width: 200px;
    height: 100%;
    background-color: #fafafa;
`;