/** @jsxImportSource @emotion/react */
import * as s from "./style";
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
      password
    }).then(response => {
        const accessToken = response.data;
        localStorage.setItem("AccessToken", accessToken);
        window.location.replace("/");
    }).catch(error => {
        alert(error.response.data);
    })
  }

  return (
    <div css={s.root}>
      <div css={s.signinLayout}>
        <div>
            <h1>로그인</h1>
        </div>
        <div css={s.authPageInput}>
          <AuthPageInput type={"text"} name={"username"} placeholder={"사용자이름"} value={username} onChange={usernameChange} />
          <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} />
        </div>
        <div css={s.button}>
          <button css={s.signinButton} onClick={handleSigninSubmit}>로그인하기</button>
          <button css={s.signinButton}><Link to={"/auth/signup"}>회원가입</Link> </button>
        </div>
        <div css={s.oauth2Signin}>
            <div><a href="http://localhost:8080/oauth2/authorization/kakao">카카오</a></div>
            <div><a href="http://localhost:8080/oauth2/authorization/google">구글</a></div>
            <div><a href="http://localhost:8080/oauth2/authorization/naver">네이버</a></div>
        </div>
      </div>
    </div>
  );
}

export default SigninPage;