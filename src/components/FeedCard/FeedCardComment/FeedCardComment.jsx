/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useState } from 'react';
import { useMutation, useQueries, useQuery, useQueryClient } from 'react-query';
import { deleteFeedComment, feedCommentRequest, searchFeedComment, updateFeedComment } from '../../../apis/api/feed';
import { deleteComment } from '../../../apis/api/lunch';
import { FaRegUser } from "react-icons/fa6";

function FeedCardComment({feedId}) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery")
  const [commentSaveInputValue, setCommentSaveInputValue] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [putCommentId, setPutCommentId] = useState(0);
  const [putChangeComment, setPutChangeComment] = useState("");

  //댓글 get
  const searchFeedCommentQuery = useQuery(
    ["searchFeedCommentQuery", feedId],
    () => searchFeedComment(feedId),
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

  // 댓글 작성
  const saveFeedCommentMutation = useMutation({
    mutationKey: "saveFeedCommentMutation",
    mutationFn: feedCommentRequest,
    onSuccess: response => {
      console.log("작성됨" + response);
      searchFeedCommentQuery.refetch();
    },
    onError: error => {
      console.log(error);
    }
  })

  // 댓글 수정
  const putFeedCommentMutation = useMutation({
    mutationKey: "putFeedCommentMutation",
    mutationFn: updateFeedComment,
    onSuccess: response => {
      console.log("수정됨" + response);
      searchFeedCommentQuery.refetch()
      setPutCommentId(0)
    },
    onError: error => {
      console.log(error);
    }
  })
  
  //댓글 삭제
  const deleteFeedCommentMutation = useMutation({
    mutationKey: "deleteFeedCommentMutation",
    mutationFn: deleteFeedComment,
    onSuccess: response => {
      console.log("삭제됨" + response);
      searchFeedCommentQuery.refetch()
    },
    onError: error => {
      console.log(error);
    }
  })



  // 댓글 save 버튼
  const addClickSaveComment = () => {
    saveFeedCommentMutation.mutate({
      feedId: feedId,
      commentContent: commentSaveInputValue,
    })
  }

  // 댓글 put 버튼
  const putClickFeedComment = (commentId, userId) => {
    putFeedCommentMutation.mutate({
      commentId: commentId,
      feedId: feedId,
      commentUserId: userId,
      commentContent: putChangeComment,
    })
  }

  // 댓글 삭제 버튼
  const deletClickFeedComment = (commentId) => {
    deleteFeedCommentMutation.mutate(commentId)
  }

  // 수정 input 창 open 
  const openClickCommentInput = (feedCommentId) => {
    setPutCommentId(feedCommentId)
  }

  return (
    <div>
      {
        commentList.map(comment => (
          comment.feedCommentId === putCommentId 
          ?
          // 수정클릭 했을때 input창
          <div key={comment.feedCommentId}>
            <input 
              type="text" 
              defaultValue={comment.commentContent}
              onChange={e => setPutChangeComment(e.target.value)}
            />
            <button onClick={() => putClickFeedComment(comment.feedCommentId, comment.feedCommentUserId)}>게시</button>
            <button onClick={() => setPutCommentId(0)}>취소</button>
          </div>
          :
          <div key={comment.feedCommentId}>
            <div css={s.feedComments}>
              <div css={s.feedCommentUser}>
                {!!comment.feedCommentUserProfileImgUrl 
                ? comment.feedCommentUserProfileImgUrl 
                : <FaRegUser /> }
                {comment.feedCommentNickName}
              </div>
              <div css={s.feedComment}>
                {comment.feedCommentContent}
              </div>
            </div>

            <div>
              {
                comment.feedCommentUserId === principalData.data.userId
                  ?
                  <div css={s.commentEdit}>
                    <button css={s.commentEditButton} onClick={() => openClickCommentInput(comment.feedCommentId)}>수정</button>
                    <button css={s.commentEditButton}onClick={() => deletClickFeedComment(comment.feedCommentId)}>삭제</button>
                  </div>
                  :
                  <div></div>
              }
            </div>
          </div>

        ))
      }

      <div css={s.commentReg}>
        댓글작성
        <input 
          css={s.commentInput}
          type="text" 
          value={commentSaveInputValue}
          placeholder='댓글 입력'
          onChange={e => setCommentSaveInputValue(e.target.value)}
        />
        <button css={s.commentInputButton} onClick={addClickSaveComment}>등록</button>
      </div>
    </div>
  );
}

export default FeedCardComment;