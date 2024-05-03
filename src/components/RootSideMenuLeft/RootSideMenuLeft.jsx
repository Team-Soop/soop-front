/** @jsxImportSource @emotion/react */
import * as s from "./style";

import { useQueryClient } from "react-query";
import { useEffect, useState } from "react";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { GoSignIn, GoSignOut } from "react-icons/go";
import instance from "../../apis/utils/instance";
import logo from "../../assets/images/soopLogo.png"

import { useRecoilValue } from "recoil";
import { sideMenuSelectNum, sideMenuState } from "../../atoms/SideMenuAtom";

import { Link } from "react-router-dom";
import UserAlarm from "../UserAlarm/UserAlarm";


function RootSideMenuLeft() {
  const [ isLogin, setLogin ] = useState(false);
  const [ principal, setPrincipal ] = useState();
  const queryClient = useQueryClient();
  const principalQueryState = queryClient.getQueryState("principalQuery");
  const getSideMenuState = useRecoilValue(sideMenuState) // side 메뉴 전환 상태 (0 = 디폴트 / 1 = 메인 / 2 = 마이페이지 / 3 = 어드민페이지)
  const getSideMenuState = useRecoilValue(sideMenuState) // side 메뉴 전환 상태 (0 = default / 1 = 메인 / 2 = 마이 / 3 = 관리자)
  const getSideMenuSelectNum = useRecoilValue(sideMenuSelectNum) // 선택한 메뉴 Num (2번 - study 사용 중)
  
  useEffect(() => {
    setLogin(() => principalQueryState.status === "success");
    if(!!principalQueryState) {
      setPrincipal(principalQueryState.data)
    }
  }, [principalQueryState.status])


  const handleLogoutClick = () => {
    localStorage.removeItem("AccessToken");
    instance.interceptors.request.use((config) => {
      config.headers.Authorization = null;
      return config;
    });
    queryClient.refetchQueries("principalQuery");
    window.location.replace("/auth/signin");
  }
  
  console.log(getSideMenuState);
  
  return (
    <div css={s.layout}>
      <div>
        <a href="http://localhost:3000">
          <img  src={logo} alt="" />KorIt-Soop
        </a>
      </div>
      <div css={s.sideMenuProfile}>
        <Link css={s.profileLink} to={'/account/mypage'}>
          <div css={s.sideMenuUserImg}>
            <img src="" alt="" />
          </div>
          {
            principal &&
            <div css={s.sideMenuUser}>{principal.data.nickname}</div>
          }
        </Link>
      </div>

      {
        getSideMenuState === 1 
        ?
        <div css={s.sideMenu}>
          <div css={s.sideMenuList}>
            <div><a href="http://localhost:3000/feed">자유게시판</a></div>
            <div><a href="http://localhost:3000/schedule">강의스케줄</a></div>
            <div><a href="http://localhost:3000/study/boardlist">스터디</a></div>
            <div><a href="http://localhost:3000/lunch">오늘 뭐 먹지?</a></div>
            <div><a href="http://localhost:3000">즐겨찾기 링크연결</a></div>
          </div>
        </div>

        :
        <div css={s.sideMenu}>
          <div css={s.sideMenuList}><a href="http://localhost:3000/account/mypage/feed">자유게시판</a></div>
          <div css={s.sideMenuList}>
            <a href="http://localhost:3000/account/mypage/study">스터디</a>
          </div>
            {
              getSideMenuSelectNum === 2 &&
              <>
                <div>진행 중 스터디</div>
                <div>모집 중 스터디</div>
              </>
            }
          <div css={s.sideMenuList}><a href="http://localhost:3000/account/mypage/lunch">오늘 뭐 먹지?</a></div>
          <div css={s.sideMenuList}><a href="http://localhost:3000/account/mypage/favorite">즐겨찾기</a></div>

          <div css={s.sideMenuList}><a href="http://localhost:3000/account/edit">회원정보</a></div>
        </div>
      }

      <div css={s.sideMenuLeftFooter}>
        <button css={s.sideMenuLeftFooterOptions}><Link to={'/account/mypage'}><RiAccountPinBoxLine /></Link></button>
        <button css={s.sideMenuLeftFooterOptions}><HiOutlineBellAlert /></button>
        {
          principal && principal.data.userId  
          ?
          <button css={s.sideMenuLeftFooterOptions} onClick={handleLogoutClick}><GoSignOut /></button>
          :
          <button css={s.sideMenuLeftFooterOptions}><Link to={'/auth/signin'}><GoSignIn /></Link></button>
        }
      </div>
    </div>
  );
}

export default RootSideMenuLeft;