import { css } from "@emotion/react";

export const rigthButton = css`
    position: fixed;
    right: 300px;
    bottom: 50px;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      border: 2px solid #ffffff73;
      border-radius: 50%;
      /* background-color: var(--secondary-button-background-floating); */
      background-color: #fafafa88;
      width: 65px;
      height: 65px;
      cursor: pointer;
      
      box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    }
    

    button:nth-child(1) {
      margin-right: 15px;
      font-size: 25px;
    }

    button:nth-child(2) {
      font-size: 25px;
    }

    button:hover {
      background-color: #fafafa;
      /* -webkit-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
      -moz-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
      -ms-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
      -o-box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23); */
    }

`

export const feedModal = css`
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #00000088;
`

export const modalCancel = css`
  position: absolute;
  top: 20px;
  right: 20px;
  border: none;
  font-size: 40px;
  color: #d8dfdd;
  background-color: transparent;
  cursor: pointer;
  &:hover{
    color: #b4bdbb;
  }
`;

export const sortMenu = css`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  border: 1px solid #ffffff73;
  border-radius: 5px;
  background-color: #fafafa88;
  top: -100%;
  left: -25%;
  text-align: center;
  z-index: 2;
`

export const sortButton = css`
  width: 100%;
  padding: 5px 0px;
  font-size: 20px;

  :nth-of-type(2) {
    border-top: 1px solid #ffffff73;
  }

  :hover {
    background-color: #fafafaa1;
  }
`