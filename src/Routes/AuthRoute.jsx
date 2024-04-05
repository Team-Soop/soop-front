import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from '../pages/MainPage/MainPage';
import Mypage from '../pages/Mypage/Mypage';
import ClassSchedulePage from '../pages/ClassSchedulePage/ClassSchedulePage';
import StudyGroupPage from '../pages/StudyGroupPage/StudyGroupPage';
import LunchRecommendationPage from '../pages/LunchRecommendationPage/LunchRecommendationPage';
import FeedPage from '../pages/FeedPage/FeedPage';
import Admin from '../pages/Admin/Admin';
import AuthPage from '../pages/AuthPage/AuthPage';
import { useQuery } from 'react-query';
import { getPrincipalRequest } from '../apis/api/principal';

function AuthRoute(props) {
  const principalQuery = useQuery(["principalQuery"], getPrincipalRequest, 
    {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            console.log("onSuccess");
            console.log(response);
        },
        onError: error => {
            console.log("오류");
            console.log(error);
        }
    });

  return (
    <>
      <Routes>
        <Route path="/auth/*" element={ <AuthPage /> } /> 
        <Route path='' element={ <Admin/>}/>                    
        <Route path='/main' element={ <MainPage/>}/>                 
        <Route path='/account/mypage' element={ <Mypage/>}/>                  
        <Route path='' element={ <ClassSchedulePage/>}/>        
        <Route path='' element={ <StudyGroupPage/>}/>           
        <Route path='' element={ <LunchRecommendationPage/>}/> 
        <Route path='/feed' element={ <FeedPage/>}/>                 
      </Routes>
    </>
  );
}

export default AuthRoute;