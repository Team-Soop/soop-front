import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import SigninPage from '../SigninPage/SigninPage';
import SignupPage from '../SignupPage/SignupPage';
import OAuth2SigninPage from '../OAuth2SigninPage/OAuth2SigninPage'
import OAuth2Page from '../OAuth2Page/OAuth2Page';
import OAuth2SignUpPage from '../OAuth2SignUpPage/OAuth2SignUpPage';
import OAuth2MergePage from '../OAuth2MergePage/OAuth2MergePage';
import { useQueryClient } from 'react-query';

function AuthPage(props) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");

  useEffect(() => {
    if (!!principalData) {
      alert("잘못된 접근입니다, 닌 토큰있다")
      window.location.replace("/")
    }
  }, [principalData])


  return (
    <div>
      {/*토큰이 있으면 접근 불가한 페이지들 */}
      <Routes>
        <Route path='/signin' element={<SigninPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/oauth2/merge' element={<OAuth2MergePage />} />
        <Route path='/oauth2/' element={<OAuth2Page />} />
        <Route path='/oauth2/signin' element={<OAuth2SigninPage />} />
        <Route path='/oauth2/signup' element={<OAuth2SignUpPage />} />
      </Routes>
    </div>
  );
}

export default AuthPage;