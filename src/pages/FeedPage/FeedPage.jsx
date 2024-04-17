/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { feedListGet } from "../../apis/api/feed";
import { useQuery, useQueryClient } from "react-query";
import AddFeed from "../../components/AddFeed/AddFeed";
import DOMPurify from "dompurify";


function FeedPage(props) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  const [ feedList, setFeedList ] = useState([]);
  const sanitizer = DOMPurify.sanitize;


  const getFeedListQuery = useQuery(
    "getFeedDataList", feedListGet ,
    {
      retry: 0,
      onSuccess: response => {
        console.log("onSuccess");
        // console.log(response.data);
        setFeedList(response.data);
    },
    onError: error => {
        console.log("오류");
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
          {feedList.map(feed => (
            <li key={feed.feedId} css={s.feedlayout}>
              <div>
                <img src={feed.profileImgUrl} alt="" />
                <div>{feed.username}</div>
              </div>
                <div css={s.feedcontents}>
                <div dangerouslySetInnerHTML={{__html: sanitizer(feed.feedContent)}}></div>
                  {feed.feedImgUrl.map((imgUrl, index) => (
                    <img key={index} src={imgUrl} alt="" css={s.feedImg}/>
                  ))}
                </div>
                
              <div>
                <button>좋아요</button>
                <button>댓글</button>
                <button>신고</button>
              </div>
            </li>
          ))}
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