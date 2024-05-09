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

