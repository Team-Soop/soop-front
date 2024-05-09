import { css } from "@emotion/react";

export const mypageFeedRootLayout = css`
  box-sizing: border-box;
  position: relative;
  width: 100%;
  height: 100%;
`;

export const mypageFeedLayout = css`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;