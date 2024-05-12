import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    border: 2px solid #8A9C99;
    padding: 10px 20px ;
    border-radius: 5px;
    width: 100%;
    height: 100%;
    background-color: #F6F5EF;
    overflow-y: auto;
    z-index: 0;

    & > h1 {
        padding: 15px 0px 0px 15px;
        font-size: 28px;
        color: #1F4D36;
    }
    &::-webkit-scrollbar {
        display: none;
    }
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
    border: 1px solid #f3f3f3;
    border-radius: 5px;
    background-color: white;
    font-size: 12px;
    cursor: pointer;

    :hover {
        background-color: #e7e7e7;
    }
    :active {
        background-color: #d7d7d7;
    }
`

export const calendar = css`
    position: relative;
    margin: 10px;
    border-top: 2px solid white;
    z-index: 0;
    
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

    .fc-popover-title {
        font-size: 13px;
    }

    .fc-popover-header {
        width: 100%;
    }

    .fc-popover-body {
        width: 220px;
    }

    .fc-more-popover {
        position: sticky;
        width: 220px;
        background-color: white;
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
