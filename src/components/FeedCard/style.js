import { css } from "@emotion/react";

export const feedCardRoot = css`
  /* position: relative; */
`;

export const feedlayout = css`
  position: relative;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 30px 40px;
  border: 2px solid #8A9C99;
  border-radius: 5px;
  width: 100%;
  min-height: 150px;
  list-style: none;
  background-color: #F6F5EF;
`;

export const feedHeader = css`
  margin-bottom: 5px;
  padding: 5px;
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
`;

export const feedHeaderProfileImg = css`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  overflow: hidden;
  & > img {
    width: 100%;
  }
`;

export const feedHeaderUser = css`
  box-sizing: border-box;
  width: 250px;
  font-size: 17px;
  font-weight: 600;
`;

export const feedfavorite = css`
  position: absolute;
  top: 48px;
  right: 45px;
  button{
    padding-left: 7px;
    border: none;
    color: #4F5152;
    background-color: transparent;
    font-size: 20px;
    cursor: pointer;
  }
  button:hover{
    color: #8A9C99;
  }
`;

export const saveFavorite = css`
  color: #8A9C99;
`;

export const feedcontents = css`
  margin-bottom: 5px;
  padding-bottom: 10px;
  border-top: 2px solid #CAD8D8;
  border-bottom: 2px solid #CAD8D8;
  width: 100%;
  min-height: 70px;
  `;

export const slideArrow = css`
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  color: #4F5152;
  &:hover{
    color: #ffffff80;
  }
`;

export const feedImg = (url) => css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
  border-radius: 5px;
  width: 100%;
  height: 550px;
  background-size: cover;
  background-repeat: repeat;
  background-position: center;
  background-image: url(${url});
`;


export const feedText = css`
  margin-top: 10px;
  color: #4F5152;  
`;



export const feedFooter = css`
  display: flex;
  margin: 5px 0;
  width: 100%;
  height: 25px;
  & > button {
    display: flex;  
  align-items: center;
  justify-content: center;
  }
  & > button > span {
    margin: 0 5px;
  }
`;

export const feedFooterButton = css`
  width: 33%;
  background-color: transparent;
  border: none;
  font-size: 16px;
  color: #1f4d36;
  cursor: pointer;
`;