import { css } from "@emotion/react";

export const layout = css`
    position: fixed;
    box-sizing: border-box;
    left: 0;
    top: 0;
    width: 200px;
    height: 100%;
`;

export const sideMenuProfile = css`
    position: relative;
    display: flex;
    justify-content: left;
    margin: 10px;
    padding: 10px;
    width: 160px;
    height: 40px;
    cursor: pointer;

    a{
        width: 100%;
        display: block;
    }
    a:link{
        color: black;
    }
    a:visited{
        color: black;
    }
`;

export const sideMenuUserImg = css`
    margin-right: 10px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: #333333;
`;

export const sideMenuUser = css`
    position: absolute;
    left: 60px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 20px;
`;

export const sideMenu = css`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
    border-right: 1px solid #cccccc;
`;

export const sideMenuList = css`
    /* display: flex;
    justify-content: center;
     */
    width: 160px;
    font-size: 18px;
    font-weight: 600;
    margin: 10px;
    cursor: pointer;

    a{
        display: block;
        text-decoration: none;
        padding: 25px 10px;
        width: 100%;
    }
    a:hover{
        background-color: #f2f2f2;
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
    width: 100%;
    height: 50px;
`;

export const sideMenuLeftFooterOptions = css`
    font-size: 25px;
    width: 33%;
    border: none;
    background-color: transparent;
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