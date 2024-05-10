import { css } from "@emotion/react";

export const commentRootLayout = css`
  border-top: 2px solid #CAD8D8;
  padding-top: 5px;
`
export const commentContentLayout = css`
  margin-bottom: 8px;
  width: 100%;
  align-items: flex-start;
  display: flex;
  flex-direction: row;
`;

export const commentProfileImg = css`
  margin-right: 10px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

export const contents = css`
  position: relative;
  padding-right: 7px;
  width: 100%;
  & > h4{
    margin-right: 8px;
    display: inline-block;
  }
`

export const commentContent = css`
  display: inline;
  font-size: 13px;
`;

export const editCommentLayout = css`
  position: relative;
  box-sizing: border-box;
  display: flex;
  justify-content: left;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 5px;
  width: 100%;
  & > span {
    font-size: 13px;
    color: #777;
  }
`

export const editingCommentButton = css`
  display: flex;
  width: 65px;
  height: 30px;
  & > button{
    padding: 4px;
    border: 1px solid #f3f3f3;
    background-color: #ffffff;
    font-size: 11px;
    cursor: pointer;
    &:hover{
      background-color: #e7e7e7;
    }
    &:active{
      background-color: #d7d7d7;
  
    }

  }
`

export const editCommentButton = css`
  position: absolute;
  top: 0;
  right: 7px;
  margin-left: 5px;
  width: 70px;
  height: 70px;
  background-color: #F6F5EF;
  z-index: 1;
  & > button {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    width: 100%;
    height: 50%;
    border: 2px solid #CAD8D8;
    border-radius: 2px;
    font-size: 12px;
    font-weight: 600;
    color: #585858;
    background-color: transparent;
    cursor: pointer;
  }
  & > button:hover{
    background-color: #f3f3f3;
  }
  & > button:nth-of-type(1){
    border-bottom: none;
  }
`

export const commentMenu = css`
  position: absolute;
  width: 15px;
  top: 0;
  right: 0;
  & > button {
    margin-left: 5px;
    padding: 2px;
    border: none;
    width: 15px;
    background-color: transparent;
    font-size: 15px;
    cursor: pointer;
  }

`

export const commentMenuDots = css`
  color: #4F5152;
`

export const addCommentLayout = css`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  margin-top: 5px;
  width: 100%;
  & > span {
    font-size: 13px;
  }
`;

export const feedCommentInput = css`
  margin: 0 8px;
  padding: 3px 5px;
  width: 70%;
  height: 20px;
  border: 1px solid #f3f3f3;
`;

export const addCommentButton = css`
  padding: 0 5px;
  width: 65px;
  height: 30px;
  border: 1px solid #f3f3f3;
  background-color: #ffffff;
  cursor: pointer;
  &:hover{
    background-color: #e7e7e7;
  }
  &:active{
    background-color: #d7d7d7;

  }
`
