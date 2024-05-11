import { css } from "@emotion/react";

export const addFeedRootLayout = css`
`;

export const addFeedLayout = css`
  box-sizing: border-box;
  position: fixed;
  align-items: center;
  padding: 20px;
  border: 2px solid #8A9C99;
  border-radius: 5px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 600px;
  max-height: 700px;
  background-color: #fafafa;
  overflow: auto;
  ::-webkit-scrollbar {
    display: none;
  }
  
  
`;

export const addFeedHeader = css`
  margin-bottom: 10px;
  display: flex;
  justify-content: left;
  align-items: center;
  width: 100%;
  height: 40px;
`;

export const addFeedProfileImg = css`
  margin-right: 15px;
  border-radius: 50%;
  width: 40px;
  height: 40px;
`;

export const addFeedImg = css`
  width: 100%;
`

export const addFeedNickname = css`
  font-size: 18px;
  font-weight: 600;
  color: #4F5152;
`

export const addFeedContents = css`

`;

export const addFeedImgPrievew = css`
  margin-bottom: 10px;
`;

export const slideArrow = css`
  padding: 0 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 25px;
  color: #ffffff77;
  &:hover{
    color: #c4c4c4;
  }
`;

export const feedImg = (url) => css`
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

export const qillLayout = css`
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

export const selectPhotosLayout = css`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 300px;
  border: 2px solid #dbdbdb;
  border-radius: 5px;
  padding: 4px 4px;
  margin-top: 20px;
  margin-bottom: 10px;
`
export const cancelButtonLayout = css`
  position: absolute;
  top: 10px;
  right: 10px;
  width: 17px;
  height: 17px;
`

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


export const addFeedQuill = css`
  margin-bottom: 10px;
`;

export const addFeedFooter = css`
  width: 100%;
  button{
    box-sizing: border-box;
    padding: 5px;
    border: none;
    width: 50%;
    border: 1px solid #8A9C9988;
    background-color: #f3f3f3;
    cursor: pointer;
  }
  button:hover{
    background-color: #e7e7e7;
  }
  button:nth-of-type(1){
    border-right: none;
  }
`;