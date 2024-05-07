import { css } from "@emotion/react";

export const commentContent = css`
  width: 100%;
  display: flex;
  justify-content: left;
  align-items: center;
`;

export const commentProfileImg = css`
  width: 40px;
  height: 40px;
`;

export const editCommentButton = css`
  cursor: pointer;
  button{
    margin-left: 3px;
    padding: 3px 5px;
    width: 40px;
    border: 1px solid #1f4d36;
  }
`

export const addCommentLayout = css`
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  width: 100%;
  & > span {
    font-size: 13px;
  }
`;

export const feedCommentInput = css`
  margin: 0 10px;
  padding: 3px 5px;
  width: 70%;
  height: 20px;
  border: 1px solid #1f4d3677;
`;

export const addCommentButton = css`
  padding: 3px 5px;
  width: 60px;
  height: 30px;
  border: none;
  background-color: #1f4d3677;
  cursor: pointer;

`