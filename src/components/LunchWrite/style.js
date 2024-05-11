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
  color: #b95757;
`;

export const lunchAddLayout = css`
  height: 720px;
  overflow-y: scroll;
  margin-top: 5px;

  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-button {
    display: none;
  }

  &::-webkit-scrollbar-thumb {
    background: #dbdbdb; /* 스크롤바 막대 색상 */
    border: 1px solid #dbdbdb; /* 스크롤바 막대 테두리 설정  */
    border-radius: 12px 12px 12px 12px;
  }

  &::-webkit-scrollbar-button:vertical:start:decrement {
    display: block;
    height: 17px;
  }

  padding: 0px 40px;
`;

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

export const selectPhotosLayout = css`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 300px;
  border: 2px solid #dbdbdb;
  border-radius: 5px;
  padding: 4px 4px;
`;

export const cancelButtonLayout = css`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 17px;
  height: 17px;
  /* background-color: white; */
`;

export const selectPhotosCancel = css`
  box-sizing: border-box;
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  border: none;
  outline: none;
  background-color: inherit;
  color: black;
  cursor: pointer;
  font-size: 20px;
  border: 0px solid black;
  border-radius: 50%;

  &:hover {
    color: #333333;
  }
`;
export const selectPhotos = css`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  background-color: #dbdbdb86;
  border: 0px solid black;
  border-radius: 5px;
  font-size: 25px;
  color: #333333;
  top: 0;

  &:hover {
    background-color: #dbdbdb;
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

export const quilLayout = css`
  width: 100%;
  height: 300px;
  margin-top: 5px;
`

export const IsPhotosOpenLayout = css`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 30px;

  & > button {
    border: none;
    border-radius: 50%;
    outline: none;
    background-color: inherit;

    font-size: 35px;
  }

`;

export const contentMessageLayout = css`
  display: flex;
  color: red;
`

export const addFeedQuill = css`
  margin-bottom: 10px;
  border-radius: 5px;
`;

export const test = css`

  .ql-container {
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  background: #fefcfc;
  }
  .ql-snow.ql-toolbar {
  display: block;
  background: #eaecec;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
}
`

export const addFeedFooter = css`
  margin-top: 30px;
  margin-bottom: 30px;
  width: 100%;
  button{
    box-sizing: border-box;
    padding: 5px;
    border: none;
    width: 50%;
    height: 35px;
    border: 1px solid #8A9C9988;
    background-color: #f3f3f3;
    
    cursor: pointer;
  }
  button:hover{
    background-color: #e7e7e7;
  }
  button:nth-of-type(1){
    border-right: none;
    /* font-size: 18px; */
  }
  /* button:nth-of-type(2){

    font-size: 15px;
  } */
`;