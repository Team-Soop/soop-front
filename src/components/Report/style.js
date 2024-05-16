import { css } from "@emotion/react";

export const reportLayout = css`
  box-sizing: border-box;
  position: fixed;
  padding: 20px;
  border: 2px solid #8A9C99;
  border-radius: 5px;
  width: 600px;
  max-height: 700px;
  background-color: #F6F5EF;;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  
`

export const reportButton = css`
  width: 65px;
  height: 30px;
  border: 1px solid #f3f3f3;
  border-radius: 5px;
  background-color: white;
  font-size: 12px;
  cursor: pointer;
`