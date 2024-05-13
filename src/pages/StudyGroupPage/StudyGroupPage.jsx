/** @jsxImportSource @emotion/react */
import * as s from "./style";

import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { searchOptionStudyList, searchStudyList } from '../../apis/api/study';
import { useNavigate } from "react-router-dom";
import userImg from "../../assets/images/userProfileNone.png";
import { useRecoilValue } from "recoil";
import { contentSortState } from "../../atoms/contentSortAtom";


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
	const sortState = useRecoilValue(contentSortState)

	const searchStudyGroupList = useQuery("searchStudyGroupList", searchStudyList, 
	{
		retry: 0,
		refetchOnWindowFocus: false,
		onSuccess: response => {
			setStudyBoardList(response.data)
		},
		onError: error => {
			console.log(error)
		}
	})

	useEffect(() => {
		
	}, [])

	const searchOptionStudyQuery = useQuery("searchOptionStudyQuery",() => searchOptionStudyList(option), {
		enabled: isSearch,
		retry: 0,
		refetchOnWindowFocus: false,
		onSuccess: response => {
			setIsSearch(false)
			setStudyBoardList(response.data)
		},
		onError: error => {
			setIsSearch(false)
		}
	})
	
	useEffect(() => {
		if(!!searchStudyCategories) {
			setCategoryData(searchStudyCategories.data)
			setSearchCategory(searchStudyCategories.data)
		}
	}, [searchStudyCategories])

	useEffect(() => {
		queryClient.refetchQueries("searchStudyCategories")
	}, [])

	const studyBoardOnClick = (studyId) => {
		navigate(`/study/board/${studyId}`)
	}

	useEffect(() => {
        let sortStudyList;

        if(sortState === 0) {
            return;
        } else if (sortState === 1) {
            sortStudyList = studyBoardList.sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
        } else if (sortState === 2) {
            sortStudyList = studyBoardList.sort((a, b) => new Date(a.createDate) - new Date(b.createDate))
        }

        setStudyBoardList([...sortStudyList]);
    }, [sortState])

	const searchCategoryChange = (id) => {
		let changeSearchCategory = [...searchCategory]
		for(let category of changeSearchCategory){
			if(category.studyCategoryId === id){
				category.checkState = !category.checkState
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
		<h1>스터디 모집</h1>
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
								<input type="checkbox" id={index} checked={category.checkState} onChange={() => searchCategoryChange(category.studyCategoryId)}/>
								<label for={index}>{category.studyCategoryName}</label>
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
				)})}
		</body>
	</div>
  );
}

export default StudyGroupPage;