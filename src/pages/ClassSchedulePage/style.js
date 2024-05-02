import { css } from "@emotion/react";

export const layout = css`
    display: flex;
    flex-direction: column;
    margin: 10px;
    width: 100%;
    height: 100vh;
`

export const calendar = css`
    
    

    .fc-day-sun a {
        color: red;
    }

    .fc-day-sat a {
        color: blue;
    }
`