import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    margin: 3px;
    width: 100%;
    height: 100%;
    background-color: #ffffff96;
    border-radius: 10px;
    overflow-y: auto;

    & > h1 {
        padding: 15px 0px 0px 15px;
        font-size: 28px;
        color: #1F4D36;
    }
    &::-webkit-scrollbar {
        display: none;
    }
`

export const modal = css`
    position: absolute;
    z-index: 555;
`

export const header = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 15px 0px;

    & > h1 {
        font-size: 28px;
        color: #1F4D36;
    }
`

export const button = css`
    width: 65px;
    height: 30px;
    border: 1px solid #dbdbdb;
    border-radius: 5px;
    background-color: white;
    font-size: 12px;
    cursor: pointer;

    :hover {
        background-color: #ebebebff;
    }
    :active {
        background-color: #d6d6d6;
    }
`

export const calendar = css`
    margin: 10px;
    border-top: 3px solid white;
    
    --fc-border-color: white;

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

    .fc-scroller {
        overflow: visible !important;
    }

    .fc-popover-title {
        font-size: 14px;
    }
`

export const colorLayout = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    margin: 0px 10px 100px;
    border: 1px solid white;
    /* width: 100%; */

`

export const colorBox = css`
    display: flex;
    align-items: center;
    /* border-right: 1px solid white; */

    .classA {
        background-color: #fd7575;
    }
    .classB {
        background-color: #5f5ffa;
    }
    .classC {
        background-color: #44b844;
    }
    .classD {
        background-color: #bd46bd;
    }
    .classE {
        background-color: #ff996a;
    }
`

export const classLabel = css`
    margin-right: 3px;
    font-size: 12px;
`

export const classColor = css`
    width: 60px;
    height: 15px;
    margin: 5px 7px 5px 7px;

    
`
