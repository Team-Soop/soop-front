import { css } from "@emotion/react";

export const lunchPageRootLayout = css`
  box-sizing: border-box;
  position: relative;
  /* padding: 10px 0; */
  width: 500px;
  height: 100%;
`;

export const lunchPageLayout = css`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;
