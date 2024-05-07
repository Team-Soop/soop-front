import { css } from "@emotion/react";

export const table = css`
    

`

export const thead = css`

    & > tr {
        display: flex;
        justify-content: center;
    }

    & > tr > th {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #dbdbdb;
        width: 170px;
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
    border: 1px solid #dbdbdb;
    width: 170px;
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