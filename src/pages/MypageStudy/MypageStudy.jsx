/** @jsxImportSource @emotion/react */
import * as s from "./style";

import React, { useEffect, useState } from 'react'
import { sideMenuSelectNum } from '../../atoms/SideMenuAtom'
import { useSetRecoilState } from 'recoil'
import { useQuery, useQueryClient } from 'react-query';
import { mySearchStudyList } from '../../apis/api/study';
import { useNavigate } from "react-router-dom";
import SaveStudyGroup from '../../components/Study/SaveStudyGroup/SaveStduyGroup'
import userImg from "../../assets/images/userProfileNone.png";

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
				<label css={s.modalName}>마이페이지 - 스터디</label>
		</header>
		<body css={s.boardListLayout}>
			{
				studyBoardList.map((board, index) => {
					return(
						
						<div key={index} css={s.boardContent} onClick={() => studyBoardOnClick(board.studyId)}>
							<div css={s.userInfo}>
								<img src=
								{
									!!board.profileImgUrl
									? board.profileImgUrl
									: userImg
								} alt="" />
								<div>{board.nickname}</div>
							</div>
							<div css={s.contentBody}>
								<div css={s.skill}>
									{categoryData.map((category, index) => {
										return(
										board.studySkills.includes(category.studyCategoryId) && 
										<div key={index}>{category.studyCategoryName}</div>
										)
									})}
								</div>
								<div css={s.title}> {board.studyTitle} </div>
							</div>
							<div css={s.party}>
								<div css={s.period}>
									{board.studyMemberLimited === board.memberCount || board.timeCount > 0
										? <div css={s.complete}> 모집완료 </div>	
										: (0 > board.timeCount && board.timeCount > -1440 
											?
											<div css={s.recruiting}>
												<div>모집 중</div>
												<div>H{Math.round(board.timeCount / (60))}</div>
											</div>
											:
											<div css={s.recruiting}>
												<div css={s.recruiting}>모집 중</div>
												<div>D{Math.round(board.timeCount / (60 * 24))}</div>
											</div>
										)
									}
								</div>
								<div css={s.memberCount}>{board.memberCount}/{board.studyMemberLimited}</div>
							</div>
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
