/** @jsxImportSource @emotion/react */
import * as s from "./style";

import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { searchOptionStudyList, searchStudyList } from '../../apis/api/study';
import SaveStudyGroup from '../../components/Study/SaveStudyGroup/SaveStduyGroup'
import { useNavigate } from "react-router-dom";


function StudyGroupPage() {
	const navigate = useNavigate();
	const [ isWrite, setIsWrite ] = useState(false)
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
	
  return (
    <div css={s.layout}>
		<header css={s.header}>
			<button onClick={() => {setIsWrite(true)}}>글쓰기</button>
			<div>
				<input type="text" value={searchTitle} onChange={(e) => setSearchTitle(e.target.value)}/>
				{
					searchCategory.map((category, index) => {
						return(
							<div key={index}>
								<input type="checkbox" checked={category.checkState} onChange={() => searchCategoryChange(category.studyCategoryId)}/>
								<label>{category.studyCategoryName}</label>
							</div>
						)
					})
				}
				<button onClick={searchOptionStudy}>검색</button>
			</div>
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
  );
}

export default StudyGroupPage;