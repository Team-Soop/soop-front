/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useMutation, useQuery, useQueryClient } from 'react-query';
import FeedCard from '../../components/FeedCard/FeedCard';
import { useState } from "react";
import { getMypageFeedList } from "../../apis/api/feed";

export default function MypageFeed() {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  const [ mypageFeedList, setMypageFeedList ] = useState([]);

  // 마이 페이지 피드 리스트 get
  const getmypageFeedListQuery = useQuery(
    "getmypageFeedListQuery", 
    () => getMypageFeedList(principalData.data.userId),
    {
      refetchOnWindowFocus: false,
      retry: 0,
      onSuccess: response => {
        console.log("피드 리스트 성공");
        setMypageFeedList(response.data);
        console.log(response);
      },
      onError: error => {
        console.log("피드 리스트 오류");
        console.log(error);
      }
    }
  );

  return (
      <div css={s.mypageFeedRootLayout}>
        {mypageFeedList.length > 0 
        ? 
          (
            <ul>
              {
                mypageFeedList.map(feed => <FeedCard feed={feed} key={feed.feedId}/>
              )}
            </ul>
          )
        : <div>작성한 게시글이 없습니다.</div>
      }
      </div>
  )
}
