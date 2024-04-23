/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { feedDeleteLike, feedGetLike, feedLike, feedListGet } from "../../apis/api/feed";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AddFeed from "../../components/AddFeed/AddFeed";
import DOMPurify from "dompurify";
import { useSearchParams } from "react-router-dom";
import FeedCard from "../../components/FeedCard/FeedCard";


function FeedPage(props) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  const [ feedList, setFeedList ] = useState([]);
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
    
    // 게시글 (피드)
    <div>
      {feedList.length > 0 
      ? (
        <ul css={s.feedrootlayout}>
          {
          feedList.map(feed => <FeedCard feed={feed} key={feed.feedId}/>
          )}
        </ul>
      )
      : <div>빈 게시글</div>
      }

      {/* 우측 하단 버튼 */}
      <div>
        <button>필터</button>
        <button>글 쓰기</button>
      </div>

      {/* 글쓰기 창 */}
      <div>
        <AddFeed />        
      </div>
     
    </div>
  );
}

export default FeedPage;