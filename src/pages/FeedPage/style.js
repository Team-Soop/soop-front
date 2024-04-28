import { css } from "@emotion/react";

export const feedPageRootLayout = css`
  position: relative;
  padding: 20px 0;
`;

export const feedPageLayout = css`

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

export const feedModal = css`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #00000088;
`

export const modalCancel = css`
  position: absolute;
  border: none;
  top: 30px;
  right: 30px;
  font-size: 50px;
  color: #CBF1F5;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    color: #B3E7EC;
  }
  &:active {
    color: #23d1e0;
  }
`;
