import { css } from "@emotion/react";


export const lunchLayout = css`
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
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    
    /* padding: 40px 50px; */
    border: 2px solid #dbdbdb;
  }
`

export const listHeader = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`

export const plaecName = css`
  font-weight: 600;
  font-size: 25px;
`

export const lunchfavorite = css`
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
`;

export const saveFavorite = css`
  color: #8A9C99;
`

export const line = css `
  margin-top: 10px;
  margin-bottom: 30px;
  border-top: 2px solid #CAD8D8;
`

export const lunchBody = css`
  display: flex;
`;

export const userInfo = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 10px 6px 10px 0px;
  width: 20%;

  & > img {
      width: 50px;
      margin-bottom: 10px;
      border-radius: 50%;
  }

  & > div {
    font-size: 13px;
  }
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
    z-index: 1;
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

export const lunchFooter = css`
  margin-top: 20px;
  display: flex;
  justify-content: center;
`;

export const likeLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  position: relative;

  & >  span {
    font-size: 30px;
    color: red;
  }
`;

export const lunchReport = css`
  position: absolute;
  top: 30%;
  right: 0;
  & > button {
    width: 33%;
    background-color: transparent;
    border: none;
    font-size: 16px;
    color: #1f4d36;
    cursor: pointer;
  }
  & > button:hover{
    color: #8A9C99;
  }
`;