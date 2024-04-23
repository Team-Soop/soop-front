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

  console.log(principalQueryState);

  return (
    <div css={s.layout}>
      <div css={s.sideMenuProfile}>
        <div css={s.sideMenuUserImg}>
          <img src="" alt="" />
        </div>
        {/* <div>{principalQueryState.data.data.username}</div> */}
      </div>
      <div>
        <div css={s.sideMenuList}>자유게시판</div>
        <div css={s.sideMenuList}>강의스케줄</div>
        <div css={s.sideMenuList}>스터디</div>
        <div css={s.sideMenuList}>오늘 뭐 먹지?</div>

        <div>즐겨찾기, 쪽지, 하단-로그아웃 (추가하기) </div>
        <div>화면 좁게하면 left메뉴 없어지거나 작아지게</div>
        
      </div>
    </div>
  );
}

export default RootSideMenuLeft;