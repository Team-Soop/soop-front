/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';

const inputBox = css`
    box-sizing: border-box;
    border: none;
    outline: none;
    padding: 0px 10px;
    height: 100%;
    width: 100%;
    &:disabled {
        background-color: white;
    }
`;

function UserRegisterInput({ value, onChange, onKeyDown, bookref, isDisabled }) {

    return (
        <input 
            css={inputBox}
            type="text" 
            value={value} 
            onChange={onChange} 
            onKeyDown={onKeyDown}
            ref={bookref}
            disabled={isDisabled}
        />
    );
}

export default UserRegisterInput;