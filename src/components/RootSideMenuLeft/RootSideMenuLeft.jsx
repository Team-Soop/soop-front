/** @jsxImportSource @emotion/react */
import { useQueryClient } from "react-query";
import * as s from "./style";
import { useEffect, useState } from "react";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { GoSignIn, GoSignOut } from "react-icons/go";
import instance from "../../apis/utils/instance";

function RootSideMenuLeft(props) {
  const [ isLogin, setLogin ] = useState(false);
  const [ principal, setPrincipal ] = useState();
  const queryClient = useQueryClient();
  const principalQueryState = queryClient.getQueryState("principalQuery");
  
  useEffect(() => {
    setLogin(() => principalQueryState.status === "success");
    if(!!principalQueryState) {
      setPrincipal(principalQueryState.data)
    }
  }, [principalQueryState.status])

  // useEffect(() => {
  //   if(!!principal) {
  //     console.log(principal.data)
  //   }
  // }, [principal])

  // 로그아웃
  const handleLogoutClick = () => {
    localStorage.removeItem("AccessToken");
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = null;
      return config;
    });
    queryClient.refetchQueries("principalQuery");
    window.location.replace("/auth/signin");
  }
  
  
  return (
    <div css={s.layout}>
      <div css={s.sideMenuProfile}>
        <div css={s.sideMenuUserImg}>
          <img src="" alt="" />
        </div>
        {
          principal &&
          <div css={s.sideMenuUser}>{principal.data.nickname}</div>
        }
      </div>
      <div css={s.sideMenu}>
        <div css={s.sideMenuList}><a href="http://localhost:3000/feed">자유게시판</a></div>
        <div css={s.sideMenuList}><a href="http://localhost:3000/schedule">강의스케줄</a></div>
        <div css={s.sideMenuList}><a href="http://localhost:3000/study">스터디</a></div>
        <div css={s.sideMenuList}><a href="http://localhost:3000/lunch">오늘 뭐 먹지?</a></div>

        <div css={s.sideMenuList}>즐겨찾기</div>
      </div>
      <div css={s.sideMenuLeftFooter}>
        <button css={s.sideMenuLeftFooterOptions}><RiAccountPinBoxLine /></button>
        <button css={s.sideMenuLeftFooterOptions}><HiOutlineBellAlert /></button>
        {
          principal && principal.data.userId  
          ?
          <button css={s.sideMenuLeftFooterOptions} onClick={handleLogoutClick}><GoSignOut /></button>
          :
          <button css={s.sideMenuLeftFooterOptions}><GoSignIn /></button>
        }
      </div>
    </div>
  );
}

export default RootSideMenuLeft;