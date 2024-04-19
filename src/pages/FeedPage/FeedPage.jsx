/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { feedDeleteLike, feedGetLike, feedLike, feedListGet } from "../../apis/api/feed";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AddFeed from "../../components/AddFeed/AddFeed";
import DOMPurify from "dompurify";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";


function FeedPage(props) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  const [ feedList, setFeedList ] = useState([]);
  const sanitizer = DOMPurify.sanitize;
  const [ isLike, setIsLike ] = useState(false)

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


  
  const handleClickLike = (feedId) => {
    if(isLike === false) {
      let Like = {
        feedId: feedId,
        userId: principalData.data.userId
      }
      likesFeed.mutate(Like);
    } else if(isLike === true) {

    }
  }
  const deleteLike = useMutation({
    mutationKey: "deleteLike",
    mutationFn: feedDeleteLike,
    onSuccess: response => {
      console.log(response);
    },
    onError: error => {
      console.log(error);
    }
  })

  const likesFeed = useMutation({
    mutationKey: "likesFeed",
    mutationFn: feedLike,
    onSuccess: response => {
      console.log(response);
    },
    onError: error => {
      console.log(error);
    }
  })

  

  const [ feedIdTest, setFeedIdTest ] = useState();
  
  useEffect(() => {
    console.log(feedIdTest)
  }, [feedIdTest])
  
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
                {/* 좋아요, 댓글, 신고하기 */}
                <button onClick={() => handleClickLike(feed.feedId)}> <AiOutlineLike /> <AiFillLike /></button>
                <button><FaRegCommentAlt /></button>
                <button><BsExclamationCircle /></button>
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