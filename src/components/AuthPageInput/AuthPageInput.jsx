import React from 'react';

function AuthPageInput({ type, name, placeholder, value, onChange, onBlur, ref, message }) {
    return (
        <div>
            <input
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                onBlur={onBlur}
                ref={ref}
            />
            {/* <MdCheckCircleOutline /> 확인 임티*/}
            {/* <MdErrorOutline /> 에러 임티 */}

            {
                !!message &&
                <div>
                    {message.type === "error" ? "에러" : "확인"}
                </div>
            }
            {
                !!message &&
                <div>
                    {message.text}
                </div>
            }

        </div>
    );
}

export default AuthPageInput;