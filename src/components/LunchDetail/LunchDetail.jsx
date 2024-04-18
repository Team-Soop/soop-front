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
  const [searchParams, setSearchParams] = useSearchParams();
  const [ lunchDetailData, setLunchDetailData] = useRecoilState(lunchDetailState);
  const [ detailData, setDetailData ] = useState("");
  const [ commentValue, setCommentValue] = useState("");


  let detailLunchId  = parseInt(searchParams.get("lunchId"))
  
  const dataResult = lunchDetailData.filter(detailData => detailData.lunchId === detailLunchId)[0];

  console.log(dataResult);
  
  // const searchLunchCommentQuery = useMutation({
  //   mutationKey: "sasearchLunchCommentQueryve",
  //   mutationFn: searchComment,
  //   onSuccess: response => {
  //     console.log("작성됨"+response);
  //   },
  //   onError: error => {
  //     console.log(error);
  //   }
  // })

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



  


  // 댓글 save 버튼
  const addClickSaveComment = () => {
    saveLunchComment.mutate({
      lunchId: detailLunchId,
      commentUserId: principalData.data.userId,
      commentContent: commentValue,
    })
  }

  // 뒤로 가기버튼
  const handleClickBack = () => {
    navigate('/lunch')
  }


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
        <button>댓글 펼치기</button>
      </div>

      <div>
        댓글작성
        <input
          type="text"
          value={commentValue}
          placeholder="댓글 달기..."
          onChange={e => setCommentValue(e.target.value)}
        />
        <button onClick={addClickSaveComment}>게시</button>
      </div>
      

    </div>
  );
}

export default LunchDetail;