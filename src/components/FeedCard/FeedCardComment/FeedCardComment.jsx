import React, { useState } from 'react';
import { useMutation, useQueries, useQuery } from 'react-query';
import { feedCommentRequest, searchfeedComment } from '../../../apis/api/feed';

function FeedCardComment({feedId}) {
  const [ commentSaveInputValue, setCommentSaveInputValue ] = useState("");
  const [ commentList, setCommentList ] = useState([]);


  // 댓글 작성
  const saveFeedComment = useMutation({
    mutationKey: "saveFeedComment",
    mutationFn: feedCommentRequest,
    onSuccess: response => {
      console.log("작성됨" + response);
      // searchLunchCommentQuery.refetch();
    },
    onError: error => {
      console.log(error);
    }
  })

  console.log(setCommentList);

  //댓글 get
  const searchFeedCommentQuery = useQuery(
    ["searchFeedCommentQuery", feedId],
    () => searchfeedComment(feedId),
    {
      retry:0,
      refetchOnWindowFocus: false,
      onSuccess: response => {
        console.log(response);
        setCommentList(response);
      },
      onError: error => {
        console.log(error);
      }
    }

  )


  // 댓글 save 버튼
  const addClickSaveComment = () => {
    saveFeedComment.mutate({
      feedId: feedId,
      commentContent: commentSaveInputValue,
    })
  }

  return (
    <div>
      댓글리스트,댓글인풋창

      <div>
        댓글작성
        <input 
          type="text" 
          value={commentSaveInputValue}
          placeholder='댓글 입력'
          onChange={e => setCommentSaveInputValue(e.target.value)}
        />
        <button onClick={addClickSaveComment}>게시</button>
      </div>
    </div>
  );
}

export default FeedCardComment;