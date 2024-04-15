/** @jsxImportSource @emotion/react */
import * as s from "./style";

import LunchWrite from '../../components/LunchWrite/LunchWrite';
import { useState } from "react";

function LunchPage(props) {
  const [ writeButton, setWriteButton ] = useState(false);


  




  // 글쓰기 컴포넌트 클릭 버튼
  const handleOnLunchWrite = () => {
    setWriteButton(!writeButton);
  }

  return (
    <div>

      <div>
        <h1>검색</h1>
      </div>
      <div>
        카테고리 필터 체크박스
      </div>
      <div>
        런치피드 컨테이너
      </div>

      <div css={s.componentsLayout}>
        <h1>글쓰기 컴포넌트</h1>
        <button onClick={handleOnLunchWrite}>글쓰기</button>
        {
          writeButton ? <LunchWrite/> : "닫힘"
        }
      </div>

      <div>
        런치피드 순위 필터 컨테이너
      </div>

    </div>
  );
}

export default LunchPage;
