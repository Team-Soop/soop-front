import { css } from "@emotion/react";

export const writeLunchLayout = css`
  position: fixed;
  box-sizing: border-box;
  border-radius: 5px;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 700px;
  height: 800px;
  padding: 20px 50px;
  background-color: #fafafa;
`;

export const restaurantNameInput = css`
  width: 100%;
  height: 50px;
  border-radius: 5px;
  font-size: 30px;
  font-weight: 700;
  text-align: center;
`;

export const lunchAddLayout = css`
  height: 720px;
  overflow-y:scroll;
  margin-top: 5px;

  &::-webkit-scrollbar {
    width: 8px;  
  }

  &::-webkit-scrollbar-button{
    display: none;
  }

  &::-webkit-scrollbar-thumb{
    background: #dbdbdb; /* 스크롤바 막대 색상 */
    border: 1px solid #dbdbdb; /* 스크롤바 막대 테두리 설정  */
    border-radius: 12px 12px 12px 12px;
  }

  &::-webkit-scrollbar-button:vertical:start:decrement{
    display: block;
    height: 17px;
  }

  
  
  padding: 0px 40px;
`

export const categoryLayout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  height: 150px;
  margin-top: 5px;
`;

export const checkLayout = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60px;
  margin-left: 10px;
  margin-right: 10px;
  & > span {
    font-size: 11px;
    margin-top: 3px;
  }
`;

export const checkContainer = css`
  position: relative;

  & > label {
    position: absolute;
    cursor: pointer;
    width: 60px;
    height: 60px;
  }

  & > input[type="checkbox"]:checked + label::after {
    position: absolute;
    color: red;
    content: "✔";
    font-size: 17px;
    right: 5px;
    top: -5px;
  }
`;

export const checkIntput = css`
  display: none;
`;

export const checkIcon = css`
  font-size: 30px;
`;
