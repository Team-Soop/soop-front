import { css } from "@emotion/react";

export const layout = css`
    position: relative;
    width: 850px;
    min-height: 100vh;
`

export const header = css`
    box-sizing: border-box;
    display: flex;
    justify-content: space-around;
    margin: 35px;
    border: 1px solid black;

    & > :nth-of-type(1) {
        border-right: 1px solid black;
    }

    & > div {
        display: flex;
        justify-content: center;
        padding: 3px 0px;
        width: 100%;

        cursor: pointer;

        :hover {
            background-color: #B3E7EC;
        }

        :active {
            background-color: #97D7DB;
        }
    }
`

export const contentLayout = css`
    border: 1px solid black;
    margin: 35px;
    height: 88vh;
`