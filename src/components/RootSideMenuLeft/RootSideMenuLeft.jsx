/** @jsxImportSource @emotion/react */
import { useQueryClient } from "react-query";
import * as s from "./style";
import { useEffect, useState } from "react";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { HiOutlineBellAlert } from "react-icons/hi2";
import { GoSignIn, GoSignOut } from "react-icons/go";
import instance from "../../apis/utils/instance";

import { useRecoilValue } from "recoil";
import { sideMenuState } from "../../atoms/SideMenuAtom";

import { Link } from "react-router-dom";


function RootSideMenuLeft(props) {
  const [ isLogin, setLogin ] = useState(false);
  const [ principal, setPrincipal ] = useState();
  const queryClient = useQueryClient();
  const principalQueryState = queryClient.getQueryState("principalQuery");
  const sideMenuNum = useRecoilValue(sideMenuState)
  const [ isMyStudyView, setIsMyStudyView] = useState(false)
  const [ isSaveBoardView, setIsSaveBoardView ] = useState(false)
  
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
  
  
  return (
    <div css={s.layout}>
      <div css={s.sideMenuProfile}>
        <Link to={'/account/mypage'}>
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
        sideMenuNum === 1 
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
          <div css={s.sideMenuList}>자유게시판</div>
          <ul css={s.sideMenuList} onClick={() => setIsMyStudyView(!isMyStudyView)}>스터디
            {
              isMyStudyView &&
              <>
                <li>진행 중 스터디</li>
                <li>모집 중 스터디</li>
              </>
            }
          </ul>
          <div css={s.sideMenuList}>오늘 뭐 먹지?</div>
          <ul css={s.sideMenuList} onClick={() => setIsSaveBoardView(!isSaveBoardView)}>즐겨찾기
            {
              isSaveBoardView &&
              <>
                <li>자유게시판</li>
                <li>오늘 뭐 먹지?</li>
              </>
            }
          </ul>
          <div css={s.sideMenuList}>정보수정</div>
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