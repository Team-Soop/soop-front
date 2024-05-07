/** @jsxImportSource @emotion/react */
import * as s from "./style";

import { useQuery, useQueryClient } from "react-query"
import { searchMyLunch } from "../../../apis/api/lunch"
import { useState } from "react";
import LunchList from "../../LunchList/LunchList";
import { useNavigate } from "react-router-dom";



function MyLunchList(props) {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  const [ myPageLunchList, setMyPageLunchList ] = useState([]);
  
  const searchMyLunchQuery = useQuery(
    ["searchMyLunchQuery"], 
    () => searchMyLunch(principalData.data.userId),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: response => {
        console.log("피드 리스트 성공");
        console.log(response);
        setMyPageLunchList(() => response.data);
      },
      onError: error => {
        console.log(error);
      }
    }
  );  

  console.log(myPageLunchList);

  // 상세보기 컴포넌트 클릭 버튼
  const handleOnLunchDetail = (lunchId) => {
    navigate(`/lunch/Detail?lunchId=${lunchId}`)
  }

  return (
    <div>
      {
        myPageLunchList.map(listData => (
          <div key={listData.lunchId}>
            <button onClick={() => handleOnLunchDetail(listData.lunchId)}>
              상세보기
            </button>
            <LunchList
              lunchId={listData.lunchId}
              profileImgUrl={listData.profileImgUrl}
              nickName={listData.nickName}
              placeName={listData.lunchPlaceName}
              categroies={listData.lunchCategoryNames}
              title={listData.lunchTitle}
              imgUrls={listData.lunchImgUrls}
              content={listData.lunchContent}
            />
          </div>
        ))
      }
    </div>
  )
}



export default MyLunchList

