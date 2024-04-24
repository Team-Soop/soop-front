/** @jsxImportSource @emotion/react */
import * as s from "./style";

import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { searchStudyCategory, searchStudyList } from '../../apis/api/study';
import SaveStudyGroup from '../../components/SaveStudyGroup/SaveStduyGroup'
import CheckStudyPeriod from "../../components/CheckStudyPeriod/CheckStudyPeriod";
import { useNavigate } from "react-router-dom";


function StudyGroupPage(props) {
	const navigate = useNavigate();
	const [ isWrite, setIsWrite ] = useState(false)
	const [ studyBoardList, setStudyBoardList ] = useState([])
	const [ categoryData, setCategoryData ] = useState([])

	const searchStudyGroupList = useQuery("searchStudyGroupList", searchStudyList, 
	{
		refetchOnWindowFocus: false,
		onSuccess: responce => {
			setStudyBoardList(responce.data)
		},
		onError: error => {
			console.log(error)
		}
	})

	const searchStduyCategories = useQuery("searchStduyCategories", searchStudyCategory,
	{
		refetchOnWindowFocus: false,
		onSuccess: response => {
			setCategoryData(response.data)
		}
	})

	const studyBoardOnClick = (studyId) => {
		navigate(`/study/studyId=${studyId}`)
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
							<div>{categoryData.map((category) => {
								return(
								board.studySkills.includes(category.studyCategoryId) && 
								<div>{category.studyCategoryName}</div>
								)
							})}</div>
							<div>{board.memberCount}/{board.studyMemberLimited}</div>
						</div>
				)})
			}
		</body>
		<div>
			{ isWrite && <SaveStudyGroup /> }
		</div>
	</div>
  );
}

export default StudyGroupPage;