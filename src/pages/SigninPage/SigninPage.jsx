import React from 'react';
import AuthPageInput from '../../components/AuthPageInput/AuthPageInput';
import { useInput } from '../../hooks/useInput';
import { Link } from 'react-router-dom';
import { signinRequest } from '../../apis/api/signin';

function SigninPage(props) {
  const [ username, usernameChange ] = useInput();
  const [ password, passwordChange ] = useInput();

  const handleSigninSubmit = () => {
    signinRequest({
      username,
      password,

    }).then(response => {
        const accessToken = response.data;
        localStorage.setItem("AccessToken", accessToken);
        window.location.replace("/");
    }).catch(error => {
        alert(error.response.data);
    })
  }

  return (
    <>
      <div>
          <h1>로그인</h1>
          <button onClick={handleSigninSubmit}>로그인하기</button>
      </div>
      <AuthPageInput type={"text"} name={"username"} placeholder={"사용자이름"} value={username} onChange={usernameChange} />
      <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} />
      <Link to={"/auth/signup"}>회원가입</Link>
      <div>
          <a href="http://localhost:8080/oauth2/authorization/kakao">카카오로그인</a>
          <a href="http://localhost:8080/oauth2/authorization/google">구글로그인</a>
          <a href="http://localhost:8080/oauth2/authorization/naver">네이버로그인</a>
      </div>
    </>
  );
}

export default SigninPage;