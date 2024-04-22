/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { lunchDetailState } from '../../atoms/lunchDetailAtom';
import { useRecoilState } from 'recoil';
import DOMPurify from "dompurify";
import LunchDetailMap from "./LunchDetailMap/LunchDetailMap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { lunchCommentRequest, searchComment } from "../../apis/api/lunch";

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
  

  const searchLunchCommentQuery = useQuery(
    ["searchLunchCommentQuery", detailLunchId], 
    () => searchComment(detailLunchId),
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: response => {
        console.log("onSuccess");
        console.log(response);
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
    },
    onError: error => {
      console.log(error);
    }
  })

  // 댓글 수정
  const putLunchComment = useMutation({
    mutationKey: "putLunchComment",
    // mutationFn: a,
    onSuccess: response => {
      console.log("작성됨"+response);
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
  const putClickComment = () => {
    putLunchComment.mutate({})
  }


  // 댓글 put input open버튼
  const openClickCommentInput = (commentId) => {
    setPutCommentId(commentId)
  }

  // 뒤로 가기버튼
  const handleClickBack = () => {
    navigate('/lunch')
  }

  console.log(principalData.data.userId);
  return (
    <div>
      <button onClick={handleClickBack}>뒤로가기</button>

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
      
      <div>
        {
          commentList.map(listData => (
            listData.commentId === putCommentId ? 
            
            <div>
              <input 
                type="text" 
                value={listData.commentContent} 
                onChange={e => setCommentPutInputValue(e.target.value)}
              />
              <button onClick={putClickComment}>수정하기</button>
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
                    <button>삭제</button>
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