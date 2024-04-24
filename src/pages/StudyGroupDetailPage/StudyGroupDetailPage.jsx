/** @jsxImportSource @emotion/react */
import * as s from "./style";

import React from 'react'
import { useQuery } from 'react-query';
import { useLocation, useParams } from 'react-router-dom'
import { searchStudyBoard } from '../../apis/api/study';

export default function StudyGroupDetailPage() {

  const param = useParams();

  const searchStudyGroup = useQuery("searchStudyGroup", () => searchStudyBoard(param.id), 
    {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: response => {
            console.log(response)
        }
    }
  )

  return (
    <div css={s.layout}>
        <div css={s.contentBox}>
            <div>
                <div>제목</div>
                <div>신고 아이콘</div>
            </div>
            <div>글쓰니</div>
            <div>
                <div>
                    <div>모집 중 / 완료</div>
                    <div>Dday</div>
                </div>
                <div>언어</div>
                <div>모집 인원</div>
            </div>
            <div>
                내용
            </div>
            <div>
                <div>가입신청</div>
            </div>
        </div>
    </div>
  )
}
