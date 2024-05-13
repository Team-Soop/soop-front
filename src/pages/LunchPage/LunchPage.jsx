/** @jsxImportSource @emotion/react */
import * as s from "./style";

import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { searchAllLunch } from "../../apis/api/lunch";
import LunchList from "../../components/LunchList/LunchList";
import LunchDetail from "../../components/LunchDetail/LunchDetail";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { lunchDetailState } from "../../atoms/lunchDetailAtom";
import { rightSideBarState, sideMenuState } from "../../atoms/SideMenuAtom";
import { contentSortState } from "../../atoms/contentSortAtom";

function LunchPage(props) {
  const navigate = useNavigate();
  const [ lunchListsData, setLunchListsData ] = useState([]);
  const [ lunchDetailData, setLunchDetailData] = useRecoilState(lunchDetailState);
  const setSideMenuNum = useSetRecoilState(sideMenuState);
  const [ rightSideBar, sestRightSideBar ] = useRecoilState(rightSideBarState);
  const sortState = useRecoilValue(contentSortState)

  useEffect(() => {
    sestRightSideBar(3)
    setSideMenuNum(1)
  })

  // Recoil이 아닌 State로 변경 시 재렌더링 필요 (RecoilState 스프레드로 변경 불가)
  // useEffect(() => {
  //   let sortLunchList;

  //   if(sortState === 0) {
  //       return;
  //   } else if (sortState === 1) {
  //     sortLunchList = lunchDetailData.sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
  //   } else if (sortState === 2) {
  //     sortLunchList = lunchDetailData.sort((a, b) => new Date(a.createDate) - new Date(b.createDate))
  //   }
  //   setLunchDetailData([...sortLunchList]);
  // }, [sortState])

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
          imgUrls: response.lunchImgUrls
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
          placeUrl: response.lunchPlaceUrl,
          createDate: response.createDate
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

  return (
    <div css={s.lunchPageRootLayout}>
      <Routes>
        <Route path='/Detail' element={<LunchDetail />}/>
      </Routes>

      {/* lunch List 피드 컴포넌트 */}
      <div css={s.lunchPageLayout}>
        <ul>
          {
            lunchDetailData.map(listData => (
              <div key={listData.lunchId}>
                {/* <button onClick={() => handleOnLunchDetail(listData.lunchId)}>
                  상세보기
                </button> */}
                <LunchList
                  lunchId={listData.lunchId}
                  profileImgUrl={listData.profileImgUrl}
                  nickName={listData.nickName}
                  placeName={listData.placeName}
                  categroies={listData.categroies}
                  title={listData.title}
                  imgUrls={listData.imgUrls}
                  content={listData.content}
                />
              </div>
            ))
          }
        </ul>
      </div>


      
    </div>
  );
}

export default LunchPage;
