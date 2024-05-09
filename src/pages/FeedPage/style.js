import { css } from "@emotion/react";

export const feedPageRootLayout = css`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const feedPageLayout = css`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const FeedPageOptions = css`
    position: fixed;
    right: -0;
    top: 0;
    button {
      box-sizing: border-box;
      border-radius: 50%;
      border: none;
      margin: 10px;
      padding: 10px;
      width: 50px;
      height: 50px;
      background-color: #f3c1c1;
      cursor: pointer;
  }
`;