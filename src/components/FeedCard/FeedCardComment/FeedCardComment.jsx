import React, { useState } from 'react';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { feedCommentRequest, searchfeedComment } from '../../../apis/api/feed';

function FeedCardComment({feedId}) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery")
  const [ commentSaveInputValue, setCommentSaveInputValue ] = useState("");
  const [ commentList, setCommentList ] = useState([]);

  //댓글 get
  const searchFeedCommentQuery = useQuery(
    ["searchFeedCommentQuery", feedId],
    () => searchfeedComment(feedId),
    {
      retry:0,
      refetchOnWindowFocus: false,
      onSuccess: response => {
        console.log("댓글리스트");
        console.log(response);
        setCommentList(response.data);
      },
      onError: error => {
        console.log(error);
      }
    }

  )

  console.log(commentList);

  // 댓글 작성
  const saveFeedComment = useMutation({
    mutationKey: "saveFeedComment",
    mutationFn: feedCommentRequest,
    onSuccess: response => {
      console.log("작성됨" + response);
      searchFeedCommentQuery.refetch();
    },
    onError: error => {
      console.log(error);
    }
  })


  


  // 댓글 save 버튼
  const addClickSaveComment = () => {
    saveFeedComment.mutate({
      feedId: feedId,
      commentContent: commentSaveInputValue,
    })
  }

  return (
    <div>
      {
        commentList.map(commentInfo => (
          <div key={commentInfo.feedCommentId}>
            <div>
              {commentInfo.feedCommentNickName}
            </div>

            <div>
              {commentInfo.feedCommentUserProfileImgUrl}
            </div>

            <div>
              {commentInfo.feedCommentContent}
            </div>

            <div>
              {
                commentInfo.feedCommentUserId === principalData.data.userId
                  ?
                  <div>
                    <button>수정</button>
                    <button>삭제</button>
                  </div>
                  :
                  <div></div>
              }
            </div>


          </div>

        ))
      }

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