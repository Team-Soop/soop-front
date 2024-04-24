import { css } from "@emotion/react";


export const feedlayout= css`
  
  border: 1px solid #dbdbdb;
  margin-bottom: 10px;
  min-height: 150px;
  max-height: 700px;
  list-style: none;
`;

export const feedHeader = css`
  height: 50px;
`;

export const feedImg = css`
  width: 400px;
`;

export const feedcontents = css`
  width: 500px;

  & > img {
    width: 250px;
  }
`;

export const feedFooter = css`


`;