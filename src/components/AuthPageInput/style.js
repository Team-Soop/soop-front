import { css } from "@emotion/react";

export const inputBox = css`
    position: relative;
    box-sizing: border-box;
    width: 100%;
    margin-bottom: 5px;
`;

export const input = css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    border-radius: 1px;
    padding: 10px 50px 10px 10px;
    width: 90%;
    font-size: 14px;
`;

export const inputIcon = (type) => css`
    position: absolute;
    right: 10px;
    top: 13px;
    color: ${type === 'error' ? "#ff6161" : "#00921b"};
`;

export const inputMessage = (type) => css`
    padding: 0;
    width: 100%;
    color: ${type === 'error' ? "#ff6161" : "#00921b"};
    font-size: 11px;
    font-weight: 600;
`;