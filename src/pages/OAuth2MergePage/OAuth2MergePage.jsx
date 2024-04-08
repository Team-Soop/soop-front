import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { useInput } from '../../hooks/useInput';
import { useMutation } from "react-query";
import AuthPageInput from '../../components/AuthPageInput/AuthPageInput';
import { oAtuh2MergeRequest } from '../../apis/api/oAuth2Merge';

function OAuth2MergePage(props) {
  const [ searchParams ] = useSearchParams();
  const [ username, usernameChange ] = useInput();
  const [ password, passwordChange ] = useInput();

  const oAuth2MergeMutation = useMutation({
    mutationKey: "oAuth2MergeMutation",
    mutationFn: oAtuh2MergeRequest,
    onSuccess: response => {
        console.log(response)
        alert("계정 통합이 완료되었습니다.\n다시 로그인 하세요.");
        window.location.replace("/auth/signin");
    },
    onError: error => {
        alert(error.response.data);
    }
  });

  const handleSigninSubmit = () => {
    oAuth2MergeMutation.mutate({
        username,
        password,
        oauth2Name: searchParams.get("name"),
        providerName: searchParams.get("provider")
    });
  }


  return (
    <>
      <div>
          <h2>계정 통합 로그인</h2>
          <button onClick={handleSigninSubmit}>로그인하기</button>
      </div>
      <AuthPageInput type={"text"} name={"username"} placeholder={"사용자이름"} value={username} onChange={usernameChange} />
      <AuthPageInput type={"password"} name={"password"} placeholder={"비밀번호"} value={password} onChange={passwordChange} />
    </>
  );
}

export default OAuth2MergePage;