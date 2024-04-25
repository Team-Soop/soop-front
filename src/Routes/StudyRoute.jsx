import React from 'react';
import { Route, Routes } from 'react-router-dom';
import StudyGroupDetailPage from '../pages/StudyGroupDetailPage/StudyGroupDetailPage';
import StudyGroupPage from '../pages/StudyGroupPage/StudyGroupPage';
import { useQuery } from 'react-query';
import { searchStudyCategory } from '../apis/api/study';

function StudyRoute(props) {

    const searchStudyCategories = useQuery("searchStudyCategories", searchStudyCategory,
	{
		refetchOnWindowFocus: false,
		onSuccess: response => {
			console.log(response.data)
		}
	})


    return (
        <Routes>
            <Route path='/board/:id' element={<StudyGroupDetailPage />} />
            <Route path='/boardlist' element={<StudyGroupPage />} />
        </Routes>
    );
}

export default StudyRoute;