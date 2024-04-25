import { css } from "@emotion/react";

export const layout = css`
    box-sizing: border-box;
    margin: 10px;
    width: 90%;
    min-height: 845px;
`

export const contentBox = css`
    border: 1px solid white;

& > * {
    margin: 10px 10px 20px;
    font-size: 14px;
}
`

export const header = css`
    display: flex;
    justify-content: space-between;
`

export const period = css`
    display: flex;
    justify-content: space-between;

`
export const skills = css`
    display: flex;
    flex-wrap: wrap;

    & > div {
        margin-right: 10px;
    }
`