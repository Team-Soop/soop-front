/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { lunchDetailState } from '../../atoms/lunchDetailAtom';
import { useRecoilState } from 'recoil';
import DOMPurify from "dompurify";
import LunchDetailMap from "./LunchDetailMap/LunchDetailMap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteComment, lunchCommentRequest, searchComment, updateComment } from "../../apis/api/lunch";

function LunchDetail() {
  const sanitizer = DOMPurify.sanitize;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  const [ searchParams, setSearchParams ] = useSearchParams();
  const [ lunchDetailData, setLunchDetailData ] = useRecoilState(lunchDetailState);
  const [ commentSaveInputValue, setCommentSaveInputValue ] = useState("");
  const [ commentPutInputValue, setCommentPutInputValue ] = useState("");
  const [ commentList, setCommentList ] = useState([]);
  const [ putCommentId, setPutCommentId ] = useState(0);


  const detailLunchId  = parseInt(searchParams.get("lunchId"))
  
  const dataResult = lunchDetailData.filter(detailData => detailData.lunchId === detailLunchId)[0];
  
  useEffect(() => {
    
  },[detailLunchId])


  const searchLunchCommentQuery = useQuery(
    ["searchLunchCommentQuery", detailLunchId], 
    () => searchComment(detailLunchId),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: response => {
        console.log("댓글Listget","onSuccess");
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
      console.log("작성됨"+response);
      searchLunchCommentQuery.refetch();
      // navigate(/)
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
      console.log("수정됨"+response);
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
      console.log("삭제됨"+response);
      searchLunchCommentQuery.refetch()
    },
    onError: error => {
      console.log(error);
    }
  })


  // 댓글 save 버튼
  const addClickSaveComment = () => {
    saveLunchComment.mutate({
      lunchId: detailLunchId,
      commentUserId: principalData.data.userId,
      commentContent: commentSaveInputValue,
    })
  }

  // 댓글 put 버튼
  const putClickComment = (commentId, userId) => {
    putLunchComment.mutate({
      commentId: commentId,
      lunchId: detailLunchId,
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

  // 뒤로 가기버튼
  const handleClickBack = () => {
    navigate('/lunch')
  }

  return (
    <div>
      <button onClick={handleClickBack}>뒤로가기</button>

      <div>
        저장
      </div>

      <div>
        {dataResult?.placeName}
      </div>

      <div>
        {dataResult?.categroies}
      </div>

      <div>
        {
          !!dataResult?.imgUrls ? 
          dataResult.imgUrls.map((imgUrl, idx) => 
            <img css={s.imgLayOut} 
              key={idx} 
              src={imgUrl}
            />
          )
          :
          <p>사진없음</p>
        }
      </div>

      <div>
        <div dangerouslySetInnerHTML={{__html: sanitizer(dataResult?.content)}}></div>
      </div>

      <div>
        {
          !!dataResult?.likeUserId ?
          dataResult?.likeUserId.length
          :
          0
        }
      </div>

      <div>
        <LunchDetailMap
          placeName = {dataResult?.placeName}
          placeX = {dataResult?.placeX}
          placeY = {dataResult?.placeY}
          placeUrl = {dataResult?.placeUrl}
        />
      </div>
      
      {/* 댓글 리스트 */}
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
                  listData.commentUserId === principalData.data.userId 
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

export default LunchDetail;