import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import Mypage from '../pages/Mypage/Mypage';
import ClassSchedulePage from '../pages/ClassSchedulePage/ClassSchedulePage';
import StudyGroupPage from '../pages/StudyGroupPage/StudyGroupPage';
import FeedPage from '../pages/FeedPage/FeedPage';
import Admin from '../pages/Admin/Admin';
import AuthPage from '../pages/AuthPage/AuthPage';
import { useQuery } from 'react-query';
import { getPrincipalRequest } from '../apis/api/principal';
import PasswordEditPage from '../pages/PasswordEditPage/PasswordEditPage';
import { searchAllSchedule } from '../apis/api/schedule';
import LunchPage from '../pages/LunchPage/LunchPage';
import RootSideMenuLeft from '../components/RootSideMenuLeft/RootSideMenuLeft';
import PageContainer from '../components/PageContainer/PageContainer';
import StudyGroupDetailPage from '../pages/StudyGroupDetailPage/StudyGroupDetailPage';

function AuthRoute(props) {

  const principalQuery = useQuery(["principalQuery"], getPrincipalRequest,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: response => {
        console.log("토큰 있음");
      },
      onError: error => {
        console.log("토큰 없음");
        console.log(error);
      }
    }
  );




  return (
    <>
      <RootSideMenuLeft />
      <PageContainer>

          {
            principalQuery.isLoading 
            ? <></> 
            :
            <Routes>
              <Route path="/auth/*" element={<AuthPage />} />
              {/* Admin 권한만 접근 가능 */}
              <Route path='/admin' element={<Admin />} />
              <Route path='/' element={<MainPage />} />
              {/* 토큰이 있어야지만 접근 가능 */}
              <Route path='/account/mypage' element={<Mypage />} />
              {/* 임시회원, 일반회원은 접근 불가  */}
              <Route path='/account/edit/password' element={<PasswordEditPage />} />
              {/* 임시회원, 일반회원은 접근 불가  */}
              <Route path='/schedule' element={<ClassSchedulePage />} />
              {/* 임시회원, 일반회원은 접근 불가 */}
              <Route path='/study/board/:id' element={<StudyGroupDetailPage />} />
              <Route path='/study/boardlist' element={<StudyGroupPage />} />
               {/* 임시회원 글작성 불가  */}
              <Route path='/lunch/*' element={<LunchPage />} />
              {/* 임시회원 글작성 불가 
              <Route path='/lunch/Detail/:id' element={<LunchDetail />} />   */}
              {/* 임시회원 글작성 불가 */}
              <Route path='/feed' element={<FeedPage />} />
            </Routes>
          }

      </PageContainer>

    </>
  );
}

export default AuthRoute;