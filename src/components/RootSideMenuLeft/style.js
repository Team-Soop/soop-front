import { css } from "@emotion/react";

export const layout = css`
    position: relative;
    box-sizing: border-box;
    border: 2px solid #ffffff73;
    border-radius: 20px;
    width: 300px;
    height: 100%;

    background-color: #fafafa88;

    & * {
        color: #1f4d36 !important;
    }

    & > div > a > img {
        height: 60px;
    }
`;

export const sideMenuProfile = css`
    position: relative;
    display: flex;
    justify-content: left;
    cursor: pointer;

    a:link{
        color: black;
    }
    a:visited{
        color: black;
    }
`;

export const profileLink =  css`
    display: flex;
    align-items: center;
    width: 100%;
`

export const sideMenuUserImg = css`
    margin-right: 20px;
    border: 1px solid #ffffff73;
    border-radius: 50%;
    width: 40px;
    height: 40px;
`;

export const sideMenuUser = css`

`;

export const sideMenu = css`
    box-sizing: border-box;
    margin-top: 50px;
    border-top: 2px solid #ffffff;
    padding-top: 20px;
    width: 100%;
`;

export const sideMenuList = css`
    /* display: flex;
    justify-content: center;
     */
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;

    a{
        display: block;
        box-sizing: border-box;
        text-decoration: none;
        padding: 15px 30px;
        width: 100%;
        transition: all 0.2s ease-in-out;
    }
    a:hover{
        background-color: #ffffffd5;
        border-radius: 5px;
    }
    a:link{
        color: black;
    }
    a:visited{
        color: black;
    }

    

`;

export const sideMenuLeftFooter = css`
    position: absolute;
    display: flex;
    justify-content: space-between;
    text-align: center;
    bottom: 0;
    border-top: 2px solid #ffffff73;
    width: 100%;
    height: 50px;
`;

export const sideMenuLeftFooterOptions = css`
    font-size: 25px;
    width: 33%;
    background-color: transparent;
    border: none;
    color: #333333;
    cursor: pointer;

    a{
        width: 100%;
        display: block;
    }
    a:link{
        color: #333333;
    }
    a:visited{
        color: #333333;
    }
    a:hover{
        color: #23d1e0;
    }
    a:active{
        color: #14a6d1;
    }

    &:hover{
        color: #23d1e0;
    }
    &:active{
        color: #14a6d1;
    }
`