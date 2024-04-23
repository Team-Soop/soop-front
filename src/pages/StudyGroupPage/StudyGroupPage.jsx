import React, { useState } from 'react';
import SaveStudyGroup from '../../components/SaveStudyGroup/SaveStduyGroup'
import { useQuery } from 'react-query';
import { searchStudyList } from '../../apis/api/study';


function StudyGroupPage(props) {

	const searchStudyGroupList = useQuery("searchStudyGroupList", searchStudyList, 
	{
		onSuccess: responce => {
			console.log(responce)
		},
		onError: error => {
			console.log(error)
		}
	})
	
  return (
    <>
		<header>
			<button>글쓰기</button>
		</header>
		<body>

		</body>
		<SaveStudyGroup/>
	</>
  );
}

export default StudyGroupPage;