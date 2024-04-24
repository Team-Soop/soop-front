/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from 'react';
import { IoBookmark, IoBookmarkOutline  } from "react-icons/io5";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { lunchDetailState } from '../../atoms/lunchDetailAtom';
import { useRecoilState } from 'recoil';
import DOMPurify from "dompurify";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import LunchDetailMap from "./LunchDetailMap/LunchDetailMap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { saveBoard, saveDeleteBoard, saveGetBoard } from "../../apis/api/saveBoards";
import LunchComment from "./LunchComment/LunchComment";
import { lunchLike } from "../../apis/api/lunch";

function LunchDetail() {
  const sanitizer = DOMPurify.sanitize;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  const [searchParams, setSearchParams] = useSearchParams();
  const [lunchDetailData, setLunchDetailData] = useRecoilState(lunchDetailState);
  const [isCommentOpen, setIsCommentOpen] = useState(false);


  const detailLunchId = parseInt(searchParams.get("lunchId"))
  const dataResult = lunchDetailData.filter(detailData => detailData.lunchId === detailLunchId)[0];

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries([`boardSaveQuery${detailLunchId}`]);
    }
  }, [])


  // board 들고오기
  const boardSaveQuery = useQuery([`boardSaveQuery${detailLunchId}`],
    () => saveGetBoard(detailLunchId, 2),
    {
      refetchOnWindowFocus: false,
      retry: 0
    }
  )

  // 추천 들고오기
  // const likeLunchQuery = useQuery([`likeLunchQuery${detailLunchId}`],
  //   () => lunchGetLike(detailLunchId),
  //   {
  //     refetchOnWindowFocus: false,
  //     retry: 0,
  //   }
  // )


  // 저장하기 버튼
  const boardSave = useMutation({
    mutationKey: "boardSave",
    mutationFn: saveBoard,
    onSuccess: response => {
      boardSaveQuery.refetch();
    },
    onError: error => {
      console.log(error);
    }
  }) 

  // 저장취소 버튼
  const deleteBoardSave = useMutation({
    mutationKey: "deleteBoardSave",
    mutationFn: saveDeleteBoard,
    onSuccess: response => {
      boardSaveQuery.refetch();
    },
    onError: error => {
      console.log(error);
    }
  })

  // 추천,좋아요 버튼
  const likelunch = useMutation({
    mutationKey: "likelunch",
    mutationFn: lunchLike,
    onSuccess: response => {
      console.log(response);
    },
    onError: error => {
      console.log(error);
    }
  })



  // 뒤로 가기버튼
  const handleClickBack = () => {
    navigate('/lunch')
  }

  
  return (
    <div>
      <button onClick={handleClickBack}>뒤로가기</button>

      {/* 게시물 저장하기 */}
      <div>
        저장하기
        {
          boardSaveQuery.isLoading
          ? <></>
          : boardSaveQuery.data.data.saveBoardStatus > 0
            ? 
              <button onClick={() => deleteBoardSave.mutate({boardId:detailLunchId, menuId: 2})}>
                <IoBookmark />
              </button>
            : 
              <button onClick={() => boardSave.mutate({boardId:detailLunchId, menuId: 2})}>
                <IoBookmarkOutline/>
              </button>
        }
      </div>

      {/* 게시물 내용 */}
      {/* ---------- */}
      {/* 가게이름 */}
      <div>
        {dataResult?.placeName}
      </div>
      {/* 카테고리 */}
      <div>
        {dataResult?.categroies}
      </div>
      {/* 이미지 */}
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
      {/* 게시물 글 */}
      <div>
        <div dangerouslySetInnerHTML={{ __html: sanitizer(dataResult?.content) }}></div>
      </div>

      <div>
        {
          !!dataResult?.likeUserId ?
            dataResult?.likeUserId.length
            :
            0
        }
      </div>

      {/* 가게 지도 */}
      <div>
        <LunchDetailMap
          placeName={dataResult?.placeName}
          placeX={dataResult?.placeX}
          placeY={dataResult?.placeY}
          placeUrl={dataResult?.placeUrl}
        />
      </div>

      {/* 댓글 */}
      <div>
        <button onClick={() => {setIsCommentOpen(!isCommentOpen)}}>댓글보기</button>
        {
          isCommentOpen ?
            <LunchComment 
              userId={principalData.data.userId}
              lunchId={detailLunchId}
            />
          :
            <></>
        }
      </div>

      {/* 좋아요/추천 */}
      <div>
        <button onClick={() => likelunch.mutate(detailLunchId)}> 
          <AiOutlineLike /> <span></span>
        </button>
      </div>



    </div>
  );
}

export default LunchDetail;