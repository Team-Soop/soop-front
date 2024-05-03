import { css } from "@emotion/react";

export const feedCardRoot = css`
  /* position: relative; */
`;

export const feedlayout = css`
  position: relative;
  box-sizing: border-box;
  padding: 10px;
  border: 2px solid #ffffff;
  border-radius: 10px;
  margin: 30px 80px;
  min-height: 150px;
  max-height: 700px;
  list-style: none;
  background-color: #ffffff96;
`;

export const feedHeader = css`
  height: 40px;
  width: 100%;
  margin-bottom: 10px;
`;

export const feedHeaderProfileImg = css`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: aqua;
`;

export const feedHeaderUser = css`
  position: absolute;
  padding: 0 50px;
  top: 20px;
  width: 250px;
`;

export const feedcontents = css`
  margin-bottom: 10px;
  padding-bottom: 5px;
  border-bottom: 1px solid #cccccc;
  width: 100%;
  min-height: 50px;
  max-height: 600px;
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
  padding: 5px 0;
  
`;

export const feedfavorite = css`
  position: absolute;
  top: 10px;
  right: 10px;
`;

export const feedFavoriteButton = css`
  border: none;
  background-color: transparent;
  font-size: 20px;
  color: #1f4d36;
`;

export const saveFavorite = css`
  color: #71C9CE;
`;

export const feedFooter = css`
  width: 100%;
  height: 25px;
  button:nth-of-type(2) {
    border-left: 1px solid #cccccc;
    border-right: 1px solid #cccccc;
  }
`;

export const feedFooterButton = css`
  width: 33%;
  background-color: transparent;
  border: none;
  font-size: 16px;
  color: #1f4d36;
`;