import { css } from "@emotion/react";

export const background = css`
    width: 100%;
    height: 100%;
    background-color: #00000088;
`

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
    width: 60vw;
    height: 85vh;

    overflow-y: auto;
    ::-webkit-scrollbar {
        display: none;
    }
`

export const header = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    border-bottom: 3px solid #d6d6d6;
    padding-bottom: 10px;

    & > button {
        width: 65px;
        height: 30px;
        border: 1px solid #f3f3f3;
        border-radius: 5px;
        background-color: white;
        font-size: 12px;
        cursor: pointer;

        :hover {
            background-color: #e7e7e7;
            /* color: white; */
        }
        :active {
            background-color: #d7d7d7;
        }
    }
`

export const todayTitle = css`
    margin-left: 10px;
    font-size: 18px;
`

export const table = css`
    position: relative;
    background-color: white;
    width: 100%;
`

export const thead = css`
    & > tr {
    }

    & > tr > th {
        border: 1px solid #dbdbdb;
        height: 40px;
        font-size: 16px;
    }
`

export const tbody = css`

`

export const bodyLayout = css`

`

export const tableData = css`
    box-sizing: border-box;
    border: 1px solid #dbdbdb;
    width: 15%;
    height: 60px;
    
    & > div {
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 3px;
        width: 100%;
        height: 100%;
        font-size: 13px;
    }
`

export const scheduleTitle = css`
    font-weight: bold;
    margin-bottom: 10px;

`

export const scheduleTeacher = css`

`