/** @jsxImportSource @emotion/react */
import * as s from "./style";

import { useState } from "react";


export default function MypageFavoritePage() {
    const [ viewState, setViewState ] = useState(0) // 0 = feed, 1 = lunch



  return (
    <>
        <div css={s.layout}>
            <div css={s.header}>
                <div onClick={() => setViewState(0)}>피드</div>
                <div onClick={() => setViewState(1)}>오늘 뭐 먹지?</div>
            </div>
            <div css={s.contentLayout}>
                {
                    viewState === 0
                    ? <div>
                        feed 콘텐츠 박스
                    </div>
                    : <div>
                        lunch 콘텐츠 박스
                    </div>
                }
            </div>
        </div>
    </>
  )
}
