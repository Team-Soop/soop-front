import { css } from "@emotion/react";

export const layout = css`
    position: relative;
    box-sizing: border-box;
    border: 2px solid #8A9C99;
    border-radius: 5px;
    width: 300px;
    height: 100%;
    background-color: #F6F5EF;

    & * {
        color: #1f4d36 !important;
    }

    & > div > a > img {
        height: 60px;
    }
`;

export const logoLayout = css`
    display: flex;
    align-items: center;
    padding: 0px 10px;
    padding-top: 10px;


`

export const logoImg = css`
    box-sizing: border-box;
    width: 70px;
    height: 60px;
    overflow: hidden;
    margin: 0 auto;
    img {
        width: 100%;
        height: 100%;
    }
`

export const logoText = css`
    font-size: 25px;
    font-weight: 700;
`

export const sideMenuProfile = css`
    display: flex;
    padding: 0px 30px;
    overflow: hidden;
    box-sizing: border-box;
    margin-top: 5px;
    border-top: 2px solid #CAD8D8;
    padding-top: 10px;
    width: 100%;

    a:visited{
        color: black;
    }
`;

export const sideMenuImg = css`
    width: 100%;
`

export const sideMenuUserImg = css`
    cursor: pointer;
    margin-right: 15px;
    box-sizing: border-box;
    border: 1px solid #CAD8D8;
    border-radius: 50%;
    width: 40px;
    height: 40px;
`;

export const profileLink = css`
    display: flex;
    align-items: center;
    a {
        text-decoration: none;
    }
`

export const logInButton = css`
    box-sizing: border-box;
    margin-bottom: 5px;
    font-weight: 500;
    font-size: 17px;
    border: none;
    border-radius: 5px;
    background-color: transparent;
    padding: 5px;
    cursor: pointer;


    &:hover {
        font-weight: 700;
        color: #1f4d36;
    }
    &:active {
        color: #000000 !important;
    }
`


export const sideMenu = css`
    box-sizing: border-box;
    margin-top: 10px;
    border-top: 2px solid #CAD8D8;
    padding-top: 10px;
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
    border-top: 2px solid #CAD8D8;
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