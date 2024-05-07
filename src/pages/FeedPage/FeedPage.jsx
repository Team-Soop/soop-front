/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { feedDeleteLike, feedGetLike, feedLike, feedListGet } from "../../apis/api/feed";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AddFeed from "../../components/AddFeed/AddFeed";
import DOMPurify from "dompurify";
import { useSearchParams } from "react-router-dom";
import FeedCard from "../../components/FeedCard/FeedCard";
import Modal from 'react-modal';
import { MdOutlineCancel } from "react-icons/md";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { rightSideBarState, sideMenuState } from "../../atoms/SideMenuAtom";

function FeedPage(props) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  const [ feedList, setFeedList ] = useState([]);
  const [ modal, setModal ] = useState(false);
  const setSideMenuState = useSetRecoilState(rightSideBarState);

  useEffect(() => {
    setSideMenuState(1)
  }, [])

  // 피드 리스트 get
  const getFeedListQuery = useQuery(
    "getFeedDataList", feedListGet ,
    {
      retry: 0,
      onSuccess: response => {
        console.log("피드 리스트 성공");
        setFeedList(response.data);
      },
      onError: error => {
        console.log("피드 리스트 오류");
        console.log(error);
      }
    }
  );

  return (
    <div css={s.feedPageRootLayout}>
      <div css={s.feedPageLayout}>
      {/*  게시글 (피드) */}
        {feedList.length > 0 
        ? 
          (
            <ul>
              {
                feedList.map(feed => <FeedCard feed={feed} key={feed.feedId}/>
              )}
            </ul>
          )
        : <div>빈 게시판입니다.</div>
      }
      </div>

    </div>
  );
}

export default FeedPage;