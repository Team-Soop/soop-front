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
		}
	})

    const setRightSideBarState = useSetRecoilState(rightSideBarState)

    useEffect(() => {
        setRightSideBarState(2)
    }, [])

    return (
        <Routes>
            <Route path='/board/:id' element={<StudyGroupDetailPage />} />
            <Route path='/boardlist' element={<StudyGroupPage />} />
        </Routes>
    );
}

export default StudyRoute;