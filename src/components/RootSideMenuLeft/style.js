import { css } from "@emotion/react";

export const layout = css`
    position: absolute;
    box-sizing: border-box;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
    background-color: #999999;
`;

export const sideMenuList = css`
    margin: 10px;
    padding: 15px 15px 15px 5px;
    cursor: pointer;
    &>a{
        text-decoration: none;
    }
    a:link{
        color: black;
    }
    a:visited{
        color: black;
    }
    a:hover{
        color: #3b84e2;
    }
    a:active{
        color: #0065e9;
    }
`;

export const sideMenuProfile = css`
    box-sizing: border-box;
    margin: 15px 5px;
    width: 100%;
    padding: 0 10px;
`;

export const sideMenuUserImg = css`
    box-sizing: border-box;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: #333333;

`;