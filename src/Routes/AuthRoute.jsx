import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import MainPage from "../pages/MainPage/MainPage";
import ClassSchedulePage from "../pages/ClassSchedulePage/ClassSchedulePage";
import AuthPage from "../pages/AuthPage/AuthPage";
import { useQuery } from "react-query";
import { getPrincipalRequest } from "../apis/api/principal";
import LunchPage from "../pages/LunchPage/LunchPage";
import RootSideMenuLeft from "../components/RootSideMenuLeft/RootSideMenuLeft";
import PageContainer from "../components/PageContainer/PageContainer";
import StudyRoute from "./StudyRoute";
import { useSetRecoilState } from "recoil";
import { rightSideBarState, sideMenuState } from "../atoms/SideMenuAtom";
import AccountRoute from "./AccountRoute";
import RootSideMenuRight from "../components/RootSideMenuRight/RootSideMenuRight";
import AdminRoute from "./AdminRoute";
import Report from "../components/Report/Report";
import UserAlarm from "../components/UserAlarm/UserAlarm";
import FeedRoute from "./FeedRoute";
import LunchRoute from "./LunchRoute";

function AuthRoute(props) {
  const principalQuery = useQuery("principalQuery", getPrincipalRequest, {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: (response) => {
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const setSideMenuNum = useSetRecoilState(sideMenuState);
  const setRightSideMenu = useSetRecoilState(rightSideBarState);

  useEffect(() => {
    setSideMenuNum(1);
  });

  useEffect(() => {
    setRightSideMenu(0);
  });

  return (
    <>
      <RootSideMenuLeft />
      <PageContainer>
        {principalQuery.isLoading ? (
          <></>
        ) : (
          <Routes>
            <Route path="/auth/*" element={<AuthPage />} />
            {/* Admin 권한만 접근 가능 */}
            <Route path="/admin/*" element={<AdminRoute />} />
            <Route path="/" element={<MainPage />} />
            {/* 토큰이 있어야지만 접근 가능 */}
            <Route path="/report/:menuId/:boardId" element={<Report />} />
            {/* 임시회원, 일반회원은 접근 불가  */}
            <Route path="/account/*" element={<AccountRoute />} />
            {/* 임시회원, 일반회원은 접근 불가  */}
            <Route path="/schedule" element={<ClassSchedulePage />} />
            {/* 임시회원, 일반회원은 접근 불가 */}
            <Route path="/study/*" element={<StudyRoute />} />
            {/* 임시회원 글작성 불가  */}
            <Route path="/lunch/*" element={<LunchRoute />} />
            {/* 임시회원 글작성 불가 */}
            <Route path="/feed/*" element={<FeedRoute />} />
          </Routes>
        )}
      </PageContainer>
      {!!principalQuery.data ? <UserAlarm /> : <div style={{"width":"320px"}}></div>}
      <RootSideMenuRight />
    </>
  );
}

export default AuthRoute;
