import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import StudyGroupDetailPage from '../pages/StudyGroupDetailPage/StudyGroupDetailPage';
import StudyGroupPage from '../pages/StudyGroupPage/StudyGroupPage';
import { useQuery } from 'react-query';
import { searchStudyCategory } from '../apis/api/study';
import { rightSideBarState } from '../atoms/SideMenuAtom';
import { useRecoilValue, useSetRecoilState } from 'recoil';


function StudyRoute(props) {

    const searchStudyCategories = useQuery("searchStudyCategories", searchStudyCategory,
	{
		refetchOnWindowFocus: true,
		onSuccess: response => {
			console.log(response.data)
		}
	})

    const setRightSideBarState = useSetRecoilState(rightSideBarState)
    const getRightSideBarState = useRecoilValue(rightSideBarState)

    useEffect(() => {
        setRightSideBarState(2)
        console.log(getRightSideBarState)
    }, [getRightSideBarState])

    return (
        <Routes>
            <Route path='/board/:id' element={<StudyGroupDetailPage />} />
            <Route path='/boardlist' element={<StudyGroupPage />} />
        </Routes>
    );
}

export default StudyRoute;