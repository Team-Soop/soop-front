/** @jsxImportSource @emotion/react */
import * as s from "./style";

import React, { useEffect, useState } from 'react'
import { sideMenuSelectNum } from '../../atoms/SideMenuAtom'
import { useSetRecoilState } from 'recoil'
import { useQuery, useQueryClient } from 'react-query';
import { mySearchStudyList } from '../../apis/api/study';
import { useNavigate } from "react-router-dom";
import SaveStudyGroup from '../../components/Study/SaveStudyGroup/SaveStduyGroup'

export default function MypageStudy(set) {

    const setSideMenuSelectNum = useSetRecoilState(sideMenuSelectNum)
    const queryClient = useQueryClient();
    const searchStudyCategories = queryClient.getQueryData("searchStudyCategories");
    const principalData = queryClient.getQueryData("principalQuery");
    const navigate = useNavigate();

    const [ studyBoardList, setStudyBoardList ] = useState([])
    const [ categoryData, setCategoryData ] = useState([])
    const [ isWrite, setIsWrite ] = useState(false)

    const mySearchStudyGroupList = useQuery("mySearchStudyGroupList", () => mySearchStudyList(principalData.data.userId), 
    {
    refetchOnWindowFocus: false,
    onSuccess: response => {
      setStudyBoardList(response.data)
      console.log(response.data)
    },
    onError: error => {
      console.log(error)
    }
    })

    useEffect(() => {
        setSideMenuSelectNum(1)
    })

    useEffect(() => {
      if(!!searchStudyCategories) {
        setCategoryData(searchStudyCategories.data)
      }
    }, [searchStudyCategories])

    const studyBoardOnClick = (studyId) => {
      navigate(`/study/board/${studyId}`)
    }



  return (
    <div css={s.layout}>
		<header css={s.header}>
			<button onClick={() => {setIsWrite(true)}}>글쓰기</button>
		</header>
		<body css={s.boardListLayout}>
			{
				studyBoardList.map((board, index) => {
					return(
						<div key={index} css={s.boardContent} onClick={() => studyBoardOnClick(board.studyId)}>
							{board.studyMemberLimited === board.memberCount || board.timeCount > 0
								? <div> 모집완료 </div>	
								: (0 > board.timeCount && board.timeCount > -1440 
									? <>
									<div>모집 중</div>
									<div>{Math.round(board.timeCount / (60))} Hour</div>
									</>
									: <>
									<div>모집 중</div>
									<div>D{Math.round(board.timeCount / (60 * 24))} Day</div>
									</>
								)
							}
							<div>{board.nickname}</div>
							<div>{board.studyTitle}</div>
							<div>{categoryData.map((category, index) => {
								return(
								board.studySkills.includes(category.studyCategoryId) && 
								<div key={index}>{category.studyCategoryName}</div>
								)
								})}
							</div>
							<div>{board.memberCount}/{board.studyMemberLimited}</div>
						</div>
				)})
			}
		</body>
		<div>
			{ isWrite && <SaveStudyGroup setIsWrite={setIsWrite} /> }
		</div>
	</div>
  )
}
