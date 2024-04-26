/** @jsxImportSource @emotion/react */
import { useQueryClient } from "react-query";
import * as s from "./style";
import { useEffect, useState } from "react";

function RootSideMenuLeft(props) {
  const [ isLogin, setLogin ] = useState(false);
  const queryClient = useQueryClient();
  const principalQueryState = queryClient.getQueryState("principalQuery");

  useEffect(() => {
    setLogin(() => principalQueryState.status === "success");
  }, [principalQueryState.status]);

  return (
    <div css={s.layout}>
      <div css={s.sideMenuProfile}>
        <div css={s.sideMenuUserImg}>
          <img src="" alt="" />
        </div>
        {/* <div>{principalQueryState.data.data.username}</div> */}
      </div>
      <div>
        <div css={s.sideMenuList}><a href="http://localhost:3000/feed">자유게시판</a></div>
        <div css={s.sideMenuList}><a href="http://localhost:3000/schedule">강의스케줄</a></div>
        <div css={s.sideMenuList}><a href="http://localhost:3000/study/boardlist">스터디</a></div>
        <div css={s.sideMenuList}><a href="http://localhost:3000/lunch">오늘 뭐 먹지?</a></div>

        <div>즐겨찾기</div>
        <div>쪽지</div>
        <div>로그인/로그아웃</div>
        
      </div>
    </div>
  );
}

export default RootSideMenuLeft;