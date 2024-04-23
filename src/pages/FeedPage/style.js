import { css } from "@emotion/react";

export const feedPageRootLayout = css`
  position: relative;
`;

export const feedlayout= css`
  
`;

export const FeedPageOptions = css`
  position: fixed;
  right: 0;
  bottom: 10px;
  & > button {
    box-sizing: border-box;
    border-radius: 50%;
    border: none;
    margin: 10px;
    padding: 10px;
    width: 50px;
    height: 50px;
    background-color: #f3c1c1;
    flex-direction: column;
    cursor: pointer;
  }
`;
