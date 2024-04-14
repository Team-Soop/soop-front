import { css } from "@emotion/react";

export const table = css`
`

export const thead = css`

    & > * {
        display: flex;
        justify-content: center;
    }
    & > tr > th {
        border: 1px solid #dbdbdb;
        width: 200px;
    }
`

export const tbody = css`
    
    & > * {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    & > tr > td {
        display: flex;
        justify-content: center;
        align-items: center;
        border: 1px solid #dbdbdb;
        width: 200px;
        height: 100px;
    }
`

export const tableLayout = css`
    white-space: pre-wrap;
`