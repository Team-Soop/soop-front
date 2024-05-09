import { css } from "@emotion/react";

export const feedCardRoot = css`
  /* position: relative; */
`;

export const feedlayout = css`
  position: relative;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 10px 10px 0 10px;
  border: 2px solid #ffffff;
  border-radius: 10px;
  min-height: 150px;
  list-style: none;
  background-color: #ffffff96;
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
  display: flex;
  justify-content: right;
  button{
    border: none;
    background-color: transparent;
    font-size: 20px;
    color: #1f4d36;
    cursor: pointer;
  }
`;

export const saveFavorite = css`
  color: #71C9CE;
`;

export const feedcontents = css`
  padding: 10px 0;
  border-top: 2px solid #ffffff;
  border-bottom: 2px solid #ffffff;
  width: 100%;
  min-height: 50px;
  `;

export const slideArrow = css`
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  color: #dfdfdf80;
  &:hover{
    color: #ffffff80;
  }
`;

export const feedImg = (url) => css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 500px;
  background-size: cover;
  background-repeat: repeat;
  background-position: center;
  background-image: url(${url});
`;


export const feedText = css`
  padding-top: 8px;
  
`;



export const feedFooter = css`
display: flex;
align-items: center;
justify-content: center;
  margin: 5px 0;
  width: 100%;
  height: 25px;
  button:nth-of-type(2) {
    border-left: 2px solid #ffffff;
    border-right: 2px solid #ffffff;
  }
`;

export const feedFooterButton = css`
  width: 33%;
  background-color: transparent;
  border: none;
  font-size: 16px;
  color:  #585858;
  cursor: pointer;
  &:hover{
    color: #01a151;
  }
  &:active{
    color: #00c763;
  }
`;