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

import { Link, useNavigate } from "react-router-dom";


function RootSideMenuLeft() {
  const navigate = useNavigate();
  const [ isLogin, setLogin ] = useState(false);
  const [ principal, setPrincipal ] = useState();
  const queryClient = useQueryClient();
  const principalQueryState = queryClient.getQueryState("principalQuery");
  const getSideMenuState = useRecoilValue(sideMenuState) // side 메뉴 전환 상태 (0 = 디폴트 / 1 = 메인 / 2 = 마이페이지 / 3 = 어드민페이지)
  const getSideMenuSelectNum = useRecoilValue(sideMenuSelectNum) // 선택한 메뉴 Num (2번 - study 사용 중)
  
  useEffect(() => {
    setLogin(() => principalQueryState.status === "success");
    if(!!principalQueryState) {
      setPrincipal(principalQueryState.data)
    }
  }, [principalQueryState.status])

  // console.log(principal?.data.profileImgUrl);

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
      <div css={s.logoLayout}>
        <Link to="/feed">
          <div css={s.logoImg}>
            <img src={logo} alt="" />
          </div>
        </Link>
        <div css={s.logoText}>
          KOREAIT SOOP
        </div>
      </div>
      <div css={s.sideMenuProfile}>
        <div css={s.sideMenuUserImg}>
          <ima src={  
            !principal?.data 
            ?
              "https://media.istockphoto.com/id/1459664492/ko/%EB%B2%A1%ED%84%B0/%EA%B8%B0%EB%B3%B8-%EC%95%84%EB%B0%94%ED%83%80-%ED%94%84%EB%A1%9C%ED%95%84-%EC%82%AC%EC%9A%A9%EC%9E%90-%ED%94%84%EB%A1%9C%ED%95%84-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%ED%94%84%EB%A1%9C%ED%95%84-%EC%82%AC%EC%A7%84-%EC%84%B8%EB%A1%9C-%EA%B8%B0%ED%98%B8%EC%9E%85%EB%8B%88%EB%8B%A4-%EC%82%AC%EC%9A%A9%EC%9E%90-%EA%B5%AC%EC%84%B1%EC%9B%90-%ED%94%8C%EB%9E%AB-%EC%8A%A4%ED%83%80%EC%9D%BC%EC%9D%98-%EC%82%AC%EB%9E%8C-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%EC%95%84%EB%B0%94%ED%83%80-%EC%82%AC%EC%A7%84-%EC%8B%A4%EB%A3%A8%EC%97%A3-%EB%B2%A1%ED%84%B0-%EB%94%94%EC%9E%90%EC%9D%B8%EA%B3%BC-%EA%B7%B8%EB%A6%BC%EC%9D%B4-%EC%9E%88%EB%8A%94-%EC%9B%90%ED%98%95.jpg?s=170667a&w=0&k=20&c=lIJIuHGbMWoHznJrPo3T0gI3laO0bd_C-84TqmQaNoM="
            :
              principal.data.profileImgUrl
          } alt=""/>
        </div>
          
        <div css={s.profileLink}>
          {
            !principal?.data
            ?
            <button css={s.logInButton} onClick={() => navigate("/auth/signin")}>로그인</button>
            :
            <Link to={'/account/mypage'}>
              {principal.data.nickname}
            </Link>
          }
        </div>
      </div>

      {
        getSideMenuState === 1 
        ?
        <div css={s.sideMenu}>
          <div css={s.sideMenuList}>
            <Link to="/feed">자유게시판</Link>
            <Link to="/schedule">강의스케줄</Link>
            <Link to="/study/boardlist">스터디</Link>
            <Link to="/lunch">오늘 뭐 먹지?</Link>
            <Link to="/">즐겨찾기 링크연결</Link>
          </div>
        </div>

        :
        <div css={s.sideMenu}>
            <div css={s.sideMenuList}><Link to="/account/mypage/feed">자유게시판</Link></div>          
            <div css={s.sideMenuList}>
            <Link to="/account/mypage/study">스터디</Link>
          </div>
            {
              getSideMenuSelectNum === 2 &&
              <>
                <div>진행 중 스터디</div>
                <div>모집 중 스터디</div>
              </>
            }
          <div css={s.sideMenuList}><Link to="/account/mypage/lunch">오늘 뭐 먹지?</Link></div>
          <div css={s.sideMenuList}><Link to="/account/mypage/favorite">즐겨찾기</Link></div>

          <div css={s.sideMenuList}><Link to="/account/edit">회원정보</Link></div>
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
        <></>
      </div>
    </div>
  );
}

export default RootSideMenuLeft;