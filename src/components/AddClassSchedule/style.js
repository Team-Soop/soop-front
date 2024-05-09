import { css } from "@emotion/react";

export const background = css`
    width: 100%;
    height: 100%;
    background-color: #00000088;
`

export const modal = css`
    box-sizing: border-box ;
    position: relative;
    padding: 30px;
    border: 1px solid #c5c5c5;
    border-radius: 10px;
    background-color: #ffffff;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
    width: 40vw;
    height: 85vh;
    /* overflow-y: scroll; */

    ::-webkit-scrollbar {
        display: none;
    }
    
`

export const layout = css`
    position: relative;
    border-radius: 10px;
    overflow-y: auto;
`

export const contentLayout = css`
    position: relative;
    margin: 20px;
`

export const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 10px;
    border-bottom: 3px solid #d6d6d6;
`

export const radioBox = css`
    
    & > input {
        margin-right: 5px;
    }
    & > label {
        margin-right: 20px;
    }
`

export const buttonBox = css`
    display: flex;

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

export const button = css`
    width: 65px;
    height: 30px;
    border: 1px solid #cacaca;
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
`

export const calender = css`
    height: 100%;
    position: relative;
    border-top: 3px solid #d6d6d6;
    z-index: 0;

    .fc-header-toolbar {
        margin-bottom: 12px !important;
    }

    .fc-toolbar-title {
        font-size: 18px;
        margin: 0px 20px;  
    }

    .fc-toolbar-chunk {
        margin-top: 10px;
    }

    .fc-button-primary {
        padding: 5px 8px;
    }

    .fc-event-title {
        font-size: 13px;
    }

    .fc-day-sun a {
        color: red;
    }
    
    .fc-day-sat a {
        color: blue;
    }

    .fc-popover-title {
        font-size: 14px;
    }

    .fc-scroller {
        overflow-y: visible;

        ::-webkit-scrollbar {
            display: none;
        }
    }
`

export const inputBox = css`
    margin: 20px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* flex-direction: column; */

    & > * {
        font-size: 14px;
    }

    & > label {
        margin-right: 5px;
    }

    & > input {
        font-size: 12px;
        margin-right: 20px;
        padding: 0px 5px 0px 3px;
        border: 1px solid #888888;
        border-radius: 3px;
        width: 150px;
        height: 25px;
        outline-color: #01a151;
        outline-width: 1px;

        :focus {
            
        }

    }
    & > input:nth-of-type(3){
        margin: 0px;
        width: 150px;
    }
`

export const selectBox = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0px 5px 20px 5px;
    
    & > div {
        display: flex;
        align-items: center;

        & > label {
            margin-right: 10px;
        }

        & > div {
            width: 250px;
            font-size: 14px;
        }
    }
`