import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import Mypage from '../pages/Mypage/Mypage';
import ClassSchedulePage from '../pages/ClassSchedulePage/ClassSchedulePage';
import StudyGroupPage from '../pages/StudyGroupPage/StudyGroupPage';
import LunchRecommendationPage from '../pages/LunchRecommendationPage/LunchRecommendationPage';
import FeedPage from '../pages/FeedPage/FeedPage';
import Admin from '../pages/Admin/Admin';

function AuthRoute(props) {
  return (
    <>
      <Routes>
        <Route path="/auth/*" element={ <AuthPage /> } /> 
        <Route path='' element={ <Admin/>}/>                    // Admin 권한만 접근 가능
        <Route path='' element={ <MainPage/>}/>                 
        <Route path='' element={ <Mypage/>}/>                   // 토큰이 있어야지만 접근 가능
        <Route path='' element={ <ClassSchedulePage/>}/>        // 임시회원, 일반회원은 접근 불가
        <Route path='' element={ <StudyGroupPage/>}/>           // 임시회원, 일반회원은 접근 불가
        <Route path='' element={ <LunchRecommendationPage/>}/>  // 임시회원 글작성 불가
        <Route path='' element={ <FeedPage/>}/>                 // 임시회원 글작성 불가
      </Routes>
    </>
  );
}

export default AuthRoute;