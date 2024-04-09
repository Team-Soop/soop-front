/** @jsxImportSource @emotion/react */
import * as s from "./style";

import LunchWrite from '../../components/LunchWrite/LunchWrite';

function LunchPage(props) {
  return (
    <div>
      <div>
        <h1>리스트</h1>
      </div>

      <div css={s.componentsLayout}>
        <h1>글쓰기 컴포넌트</h1>
        <LunchWrite/>
      </div>
    </div>
  );
}

export default LunchPage;
