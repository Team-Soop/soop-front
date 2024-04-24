/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import AuthPageInput from '../../components/AuthPageInput/AuthPageInput';
import { useNavigate } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import { signupRequest } from '../../apis/api/signup';

function SignupPage(props) {
  const navigate = useNavigate();

  const [username, userNameChange, usernameMessage, setUsernameValue, setUsernameMessage] = useInput("username");
  const [nickname, nickNameChange, nicknameMessage, setNicknameValue, setNicknameMessage] = useInput("nickname");
  const [password, passwordChange, passwordMessage] = useInput("password");
  const [checkPassword, checkPasswordChange] = useInput("checkPassword");
  const [name, nameChange, nameMessage] = useInput("name");
  const [email, emailChange, emailMessage] = useInput("email");
  const [checkPasswordMessage, setCheckPasswordMessage] = useState(null);

  useEffect(() => {
    if (!checkPassword || !password) {
      setCheckPasswordMessage(() => null);
      return;
    }

    if (checkPassword === password) {
      setCheckPasswordMessage(() => {
        return {
          type: "success",
          text: ""
        }
      })
    } else {
      setCheckPasswordMessage(() => {
        return {
          type: "error",
          text: "비밀번호가 일치하지 않습니다."
        }
      })
    }
  }, [checkPassword, password]);

  const handleSignupSubmit = () => {
    const checkFlags = [
      usernameMessage?.type,
      nicknameMessage?.type,
      passwordMessage?.type,
      checkPasswordMessage?.type,
      nameMessage?.type,
      emailMessage?.type
    ];

    if (checkFlags.includes("error") || checkFlags.includes(undefined) || checkFlags.includes(null)) {
      alert("가입 정보를 다시 확인하세요.");
      return;
    }

    signupRequest({
      username,
      nickname,
      password,
      name,
      email
    }).then(response => {
      console.log(response);
      if (response.status === 201) {
        alert("회원가입이 완료되었습니다. 로그인 해주세요.")
        navigate("/auth/signin");
      }
    }).catch(error => {
      if (error.response.status === 400) {
        const errorMap = error.response.data;
        const errorEntries = Object.entries(errorMap);
        for (let [k, v] of errorEntries) {
          if (k === "username") {
            setUsernameMessage(() => {
              return {
                type: "error",
                text: v
              }
            })
          }
        }
      } else {
        alert("회원가입 오류");
      }
    });
  }


  return (
    <div css={s.root}>
      <div css={s.signupLayout}>
        <div>
          <h1>회원가입</h1>
        </div>
        <div css={s.authPageInput}>
          <AuthPageInput type={"text"} name={"username"} placeholder={"아이디"} value={username} onChange={userNameChange} message={usernameMessage} />
          <AuthPageInput type={"text"} name={"nickname"} placeholder={"닉네임"} value={nickname} onChange={nickNameChange} message={nicknameMessage} />
          <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} message={passwordMessage} />
          <AuthPageInput type={"password"} name={"checkPassword"} placeholder={"비밀번호 확인"} value={checkPassword} onChange={checkPasswordChange} message={checkPasswordMessage} />
          <AuthPageInput type={"text"} name={"name"} placeholder={"성명"} value={name} onChange={nameChange} message={nameMessage} />
          <AuthPageInput type={"text"} name={"email"} placeholder={"이메일"} value={email} onChange={emailChange} message={emailMessage} />
        </div>
        <button css={s.signinButton} onClick={handleSignupSubmit}>가입하기</button>
      </div>
    </div>
  );
}

export default SignupPage;