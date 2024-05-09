import { css } from "@emotion/react";

export const commentRootLayout = css`
  border-top: 2px solid #ffffff;
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
  width: 40px;
  height: 40px;
`;

export const contents = css`
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
  button{
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
  margin-left: 5px;
  display: inline;

  button {
    margin-left: 3px;
    width: 18px;
    height: 15px;
    border: none;
    font-size: 17px;
    color: #585858;
    background-color: transparent;
    cursor: pointer;
  }

  button:hover{
    color: #01a151;
  }
  button:active{
    color: #00c763;
  }
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
  width: 60px;
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