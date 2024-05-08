import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box ;
    position: fixed;
    padding: 30px;
    border: 1px solid #c5c5c5;
    border-radius: 10px;
    background-color: #ffffff;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 40vw;
    height: 85vh;

    overflow-y: auto;
`

export const header = css`
    box-sizing: border-box;
`

export const table = css`
    position: relative;
    background-color: white;
    width: 540px;
`

export const thead = css`

    & > tr {
        display: flex;
        justify-content: center;
    }

    & > tr > th {
        box-sizing: border-box;
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #dbdbdb;
        width: 100%;
        height: 30px;
        font-size: 16px;
    }
`

export const tbody = css`

`

export const bodyLayout = css`
    display: flex;
    white-space: pre-wrap;
`

export const tableData = css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    width: 100%;
    height: 60px;
    
    & > div {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        font-size: 12px;
    }
`