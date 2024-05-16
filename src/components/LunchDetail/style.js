import { css } from "@emotion/react";

export const layout = css`
  position: relative;
  box-sizing: border-box;
  margin-bottom: 20px;
  padding: 30px 40px;
  border: 2px solid #8A9C99;
  overflow-y: auto;
  border-radius: 5px;
  width: 500px;
  height: 100%;
  list-style: none;
  background-color: #F6F5EF;
`

export const detailHeader =css`
display: flex;
justify-content: center;
align-items: center;
position: relative;
`

export const placeName =css`
  font-weight: 600;
  font-size: 25px;
`
export const detailFavorite =css`
  position: absolute;
  top: 3px;
  right: 0;
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
`

export const userInfo= css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  width: 100%;
  & > img {
    width: 35px;
    margin-right: 5px;
  }
  & > div {
    width: 100%;
    font-size: 13px;
  }
`

export const line = css`
  margin-top: 10px;
  margin-bottom: 30px;
  border-top: 2px solid #CAD8D8;
`

export const categoriesLayout = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  /* border-right: 2px solid #CAD8D8;
  border-left: 2px solid #CAD8D8; */
  border-top: 1px solid #CAD8D8;
  border-bottom: 1px solid #CAD8D8;
  border-radius: 5px;
`

export const categoriesContainer = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 25%;
  font-size: 40px;
  position: relative;

  & > span {
    width: 40px;
    font-size: 13px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  & > p {
    /* visibility: hidden; */
    display: none;
    position: absolute;
    width: 100px;
    padding: 8px;
    left: -13px;
    top: 75px;
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
    background: #333;
    color: #fff;
    font-size: 14px;
    text-align: center;
    z-index: 100;
  }

  & > p::after {
    position: absolute;
    bottom: 100%;
    left: 50%;
    width: 0;
    height: 0;
    margin-left: -10px;
    border: solid transparent;
    border-color: rgba(51, 51, 51, 0);
    border-bottom-color: #333;
    border-width: 10px;
    pointer-events: none;
    content: ' ';
  }

  & > span:hover + p {
    /* visibility: visible;   */
    display: block;
  }
`
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
  color: black;
  &:hover{
    color: #333333;
  }
`;

export const imgUrl = (url) => css`
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  width: 100%;
  height: 285px;
  background-size: cover;
  background-repeat: repeat;
  background-position: center;
  background-image: url(${url});
`;

export const content = css`
  margin-top: 10px;
  color: #4F5152;
`
export const footer = css`
  display: flex;
  margin: 5px 0;
  width: 100%;
  height: 25px;
  justify-content: center;
  align-items: center;
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
  color: #000000;
  cursor: pointer;
`;
