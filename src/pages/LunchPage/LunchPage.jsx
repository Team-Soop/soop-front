/** @jsxImportSource @emotion/react */
import * as s from "./style";

import LunchWrite from '../../components/LunchWrite/LunchWrite';
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { searchAllLunch } from "../../apis/api/lunch";
import LunchList from "../../components/LunchList/LunchList";
import LunchDetail from "../../components/LunchDetail/LunchDetail";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { lunchDetailState } from "../../atoms/lunchDetailAtom";
import Report from "../../components/Report/Report";
import { rightSideBarState, sideMenuState } from "../../atoms/SideMenuAtom";

function LunchPage(props) {
  const navigate = useNavigate();
  const [ lunchListsData, setLunchListsData ] = useState([]);
  const [ lunchDetailData, setLunchDetailData] = useRecoilState(lunchDetailState);
  const [ writeOpen, setWriteOpen ] = useState(false);
  const setSideMenuNum = useSetRecoilState(sideMenuState);
  const [ rightSideBar, sestRightSideBar ] = useRecoilState(rightSideBarState);

  useEffect(() => {
    sestRightSideBar(3)
    setSideMenuNum(1)
  }, [])


  // 랜더링 될때마다 DB에서 LIST 데이터를 get함
  const searchAllLunchQuery = useQuery("searchAllLunchQuery", searchAllLunch,
  {
    retry: 0,
    refetchOnWindowFocus: false,
    onSuccess: response => {
      // List를 위한 data
      setLunchListsData(() => response.data.map(response => {
        return {
          lunchId: response.lunchId,
          nickName: response.nickName,
          profileImgUrl: response.profileImgUrl,
          PlaceName: response.lunchPlaceName,
          categroies: response.lunchCategoryNames,
          title: response.lunchTitle,
          imgUrls: response.lunchImgUrls,
        }
      }))
      // 상세페이지를 위한 data
      setLunchDetailData(() =>response.data.map(response => {
        return {
          lunchId: response.lunchId,
          nickName: response.nickName,
          profileImgUrl: response.profileImgUrl,
          placeName: response.lunchPlaceName,
          categroies: response.lunchCategoryNames,
          title: response.lunchTitle,
          imgUrls: response.lunchImgUrls,
          content: response.lunchContent,
          placeX: response.lunchPlaceX,
          placeY: response.lunchPlaceY,
          placeUrl: response.lunchPlaceUrl
        }
      }))
    },
    onError: error => {
      console.log(error);
    }
  })

  

  // 상세보기 컴포넌트 클릭 버튼
  const handleOnLunchDetail = (lunchId) => {
    navigate(`/lunch/Detail?lunchId=${lunchId}`)
  }

  // 글쓰기 컴포넌트 클릭 버튼
  const handleOnLunchWrite = () => {
    setWriteOpen(!writeOpen);
  }


  return (
    <div>
      <Routes>
        <Route path='/Detail' element={<LunchDetail />}/>
      </Routes>

      {/* <div>
        <h1>검색</h1>
      </div> */}

      <div>
        카테고리 필터 체크박스
      </div>

      {/* lunch List 피드 컴포넌트 */}
      <div >
        {
          lunchDetailData.map(listData => (
            <div key={listData.lunchId}>
              <button onClick={() => handleOnLunchDetail(listData.lunchId)}>
                상세보기
              </button>
              <LunchList
                lunchId={listData.lunchId}
                profileImgUrl={listData.profileImgUrl}
                nickName={listData.nickName}
                placeName={listData.PlaceName}
                categroies={listData.categroies}
                title={listData.title}
                imgUrls={listData.imgUrls}
                content={listData.content}
              />
            </div>
          ))
        }
      </div>

      <div css={s.componentsLayout}>
        <h1>글쓰기 컴포넌트</h1>
        <button onClick={handleOnLunchWrite}>글쓰기</button>
        {
          writeOpen ? <LunchWrite/> : <></>
        }
      </div>

      
    </div>
  );
}

export default LunchPage;
