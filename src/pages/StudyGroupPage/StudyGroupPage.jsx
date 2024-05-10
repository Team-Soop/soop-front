/** @jsxImportSource @emotion/react */
import * as s from "./style";

import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { searchOptionStudyList, searchStudyList } from '../../apis/api/study';
import { useNavigate } from "react-router-dom";
import userImg from "../../assets/images/userProfileNone.png";


function StudyGroupPage() {
	const navigate = useNavigate();
	const [ studyBoardList, setStudyBoardList ] = useState([])
	const [ categoryData, setCategoryData ] = useState([])
	const [ searchTitle, setSearchTitle ] = useState("")
	const [ searchCategory, setSearchCategory ] = useState([])
	const [ option, setOption ] = useState({
		title: "",
		categories: ""
	})
	const [isSearch, setIsSearch ] = useState(false)
	const queryClient = useQueryClient();
	const principalData = queryClient.getQueryData("principalQuery");
	const searchStudyCategories = queryClient.getQueryData("searchStudyCategories");
	
	const searchStudyGroupList = useQuery("searchStudyGroupList", searchStudyList, 
	{
		retry: 3,
		refetchOnWindowFocus: false,
		onSuccess: response => {
			setStudyBoardList(response.data)
		},
		onError: error => {
			console.log(error)
		}
	})

	const searchOptionStudyQuery = useQuery("searchOptionStudyQuery",() => searchOptionStudyList(option), {
		enabled: isSearch,
		refetchOnWindowFocus: false,
		onSuccess: response => {

		},
		onError: error => {

		}
	})
	
	useEffect(() => {
		if(!!searchStudyCategories) {
			setCategoryData(searchStudyCategories.data)
			setSearchCategory(searchStudyCategories.data)
		}
	}, [searchStudyCategories])

	const studyBoardOnClick = (studyId) => {
		navigate(`/study/board/${studyId}`)
	}

	const searchCategoryChange = (id) => {
		let changeSearchCategory = [...searchCategory]
		for(let category of changeSearchCategory){
			if(category.studyCategoryId === id){
				category.checkState = !category.checkState
				console.log(category.checkState)
			}
		}
		setSearchCategory(changeSearchCategory)
	}

	

	const searchOptionStudy = () => {
		let checkedSearchCategory = searchCategory.filter(category => category.checkState === true)
		let categoryArray = [];

		for(let category of checkedSearchCategory) {
			categoryArray.push(category.studyCategoryId)
		}

		setOption({
			title: searchTitle,
			categories: categoryArray.join()
		})

		setIsSearch(true)
	}

	console.log(studyBoardList)
	
  return (
    <div css={s.layout}>
		<header css={s.header}>
				<div css={s.searchTitle}>
					<div css={s.searchTitleBox}>
						<label>제목</label>
						<input type="text" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)}/>
					</div>
					<button onClick={searchOptionStudy}>검색</button>
				</div>
				<div css={s.searchCategory}>
				{
					searchCategory.map((category, index) => {
						return(
							<div css={s.searchCategoryBox} key={index}>
								<input type="checkbox" checked={category.checkState} onChange={() => searchCategoryChange(category.studyCategoryId)}/>
								<label>{category.studyCategoryName}</label>
							</div>
						)
					})
				}
				</div>
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
										? <div> 모집완료 </div>	
										: (0 > board.timeCount && board.timeCount > -1440 
											? <>
											<div>모집 중</div>
											<div>H{Math.round(board.timeCount / (60))}</div>
											</>
											: <>
											<div>모집 중</div>
											<div>D{Math.round(board.timeCount / (60 * 24))}</div>
											</>
										)
									}
								</div>
								<div css={s.memberCount}>{board.memberCount}/{board.studyMemberLimited}</div>
							</div>
						</div>
				)})}
		</body>
	</div>
  );
}

export default StudyGroupPage;