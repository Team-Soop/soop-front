import React, { useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { deleteComment, lunchCommentRequest, searchComment, updateComment } from '../../../apis/api/lunch';

function LunchComment({userId, lunchId}) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  const [commentSaveInputValue, setCommentSaveInputValue] = useState("");
  const [commentPutInputValue, setCommentPutInputValue] = useState("");
  const [commentList, setCommentList] = useState([]);
  const [putCommentId, setPutCommentId] = useState(0);


  useEffect(() => {
    queryClient.invalidateQueries(["searchLunchCommentQuery"]);
  }, [])

  // 댓글 get
  const searchLunchCommentQuery = useQuery(
    ["searchLunchCommentQuery", lunchId],
    () => searchComment(lunchId),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: response => {
        setCommentList(() => response.data.map(response => {
          return {
            commentId: response.lunchCommentId,
            commentUserId: response.lunchCommentUserId,
            commentNickName: response.lunchCommentNickName,
            commentUserProfileImgUrl: response.lunchCommentUserProfileImgUrl,
            commentContent: response.lunchCommentContent,
            createDate: response.createDate,
            updateDate: response.updateDate
          }
        }))
      },
      onError: error => {
        console.log(error);
      }
    }
  );  

  // 댓글 작성 
  const saveLunchComment = useMutation({
    mutationKey: "saveLunchComment",
    mutationFn: lunchCommentRequest,
    onSuccess: response => {
      console.log("작성됨" + response);
      searchLunchCommentQuery.refetch();
    },
    onError: error => {
      console.log(error);
    }
  })

  // 댓글 수정
  const putLunchComment = useMutation({
    mutationKey: "putLunchComment",
    mutationFn: updateComment,
    onSuccess: response => {
      console.log("수정됨" + response);
      searchLunchCommentQuery.refetch()
    },
    onError: error => {
      console.log(error);
    }
  })

  // 댓글 삭제
  const deleteLunchComment = useMutation({
    mutationKey: "deleteLunchComment",
    mutationFn: deleteComment,
    onSuccess: response => {
      console.log("삭제됨" + response);
      searchLunchCommentQuery.refetch()
    },
    onError: error => {
      console.log(error);
    }
  })

  // 댓글 save 버튼
  const addClickSaveComment = () => {
    saveLunchComment.mutate({
      lunchId: lunchId,
      commentUserId: principalData.data.userId,
      commentContent: commentSaveInputValue,
    })
  }

  // 댓글 put 버튼
  const putClickComment = (commentId, userId) => {
    putLunchComment.mutate({
      commentId: commentId,
      lunchId: lunchId,
      commentUserId: userId,
      commentContent: commentPutInputValue,
    })
  }

  // 댓글 delete 버튼
  const deleteClickComment = (commentId) => {
    deleteLunchComment.mutate(commentId)
  }

  
  // 댓글 put input open버튼
  const openClickCommentInput = (commentId) => {
    setPutCommentId(commentId)
  }


  return (
    <div>
      <div>
        {
          commentList.map(listData => (
            listData.commentId === putCommentId ?

              // 수정하기 클릭했을때 input창 띄우기
              <div key={listData.commentId}>
                <input
                  type="text"
                  defaultValue={listData.commentContent}
                  onChange={e => setCommentPutInputValue(e.target.value)}
                />
                <button onClick={() => putClickComment(listData.commentId, listData.commentUserId)}>수정하기</button>
                <button onClick={() => setPutCommentId(0)}>취소</button>
              </div>

              :

              <div key={listData.commentId}>
                <div>
                  {listData.commentNickName}
                </div>
                <div>
                  {listData.commentUserProfileImgUrl}
                </div>
                <div>
                  {listData.commentContent}
                </div>
                <div>
                  {
                    listData.commentUserId === userId
                      ?
                      <div>
                        <button onClick={() => openClickCommentInput(listData.commentId)}>수정</button>
                        <button onClick={() => deleteClickComment(listData.commentId)}>삭제</button>
                      </div>
                      :
                      <div></div>
                  }
                </div>
              </div>
          ))
        }
      </div>

      <div>
        댓글작성
        <input
          type="text"
          value={commentSaveInputValue}
          placeholder="댓글 달기..."
          onChange={e => setCommentSaveInputValue(e.target.value)}
        />
        <button onClick={addClickSaveComment}>게시</button>
      </div>

    </div>
  );
}

export default LunchComment;