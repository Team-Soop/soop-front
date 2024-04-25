/** @jsxImportSource @emotion/react */
import * as s from "./style";
import DOMPurify from "dompurify";
import { IoBookmark, IoBookmarkOutline  } from "react-icons/io5";
import { BsExclamationCircle } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { saveBoard, saveDeleteBoard, saveGetBoard } from "../../apis/api/saveBoards";
import { useEffect } from "react";
import { lunchGetLike } from "../../apis/api/lunch";
import { useNavigate } from "react-router-dom";

function LunchList({lunchId, profileImgUrl, nickName, placeName, categroies, title, imgUrls, content}) {
  const sanitizer = DOMPurify.sanitize;
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries([`BoardSaveQuery${lunchId}`]);
      queryClient.invalidateQueries([`likeLunchQuery${lunchId}`]);
    }
  }, [])



  // 저장된 board 들고오기
  const BoardSaveQuery = useQuery([`BoardSaveQuery${lunchId}`],
    () => saveGetBoard(lunchId, 2),
    {
      refetchOnWindowFocus: false,
      retry: 0
    }
  )

  // 좋아요,추천 들고오기
  const likeLunchQuery = useQuery([`likeLunchQuery${lunchId}`],
    () => lunchGetLike(lunchId),
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  )

  // 저장하기 버튼
  const lunchBoardSave = useMutation({
    mutationKey: "lunchBoardSave",
    mutationFn: saveBoard,
    onSuccess: response => {
      BoardSaveQuery.refetch();
    },
    onError: error => {
      console.log(error);
    }
  }) 

  // 저장취소 버튼
  const deleteLunchBoardSave = useMutation({
    mutationKey: "deleteLunchBoardSave",
    mutationFn: saveDeleteBoard,
    onSuccess: response => {
      BoardSaveQuery.refetch();
    },
    onError: error => {
      console.log(error);
    }
  })
  
  // 신고 창 opne 버튼
  const isReportOpen = () => {
    if(window.confirm("이 게시물을 신고 하시겠습니까?")){
      navigate(`/lunch/report/3/${lunchId}`)
    }
    return;
  }
  
  return (
    <div css={s.Layout}>

      <div>
        신고버튼
        <button onClick={() => isReportOpen()}><BsExclamationCircle /></button>
      </div>

      <div>추천수
        {
          likeLunchQuery.isLoading
          ? <></>
          : likeLunchQuery.data.data.totalCount
        }
      </div>

      <div>
        저장하기
        {
          BoardSaveQuery.isLoading
          ? <></>
          : BoardSaveQuery.data.data.saveBoardStatus > 0
            ? 
              <button onClick={() => deleteLunchBoardSave.mutate({boardId :lunchId, menuId: 2})}>
                <IoBookmark />
              </button>
            : 
              <button onClick={() => lunchBoardSave.mutate({boardId :lunchId, menuId: 2})}>
                <IoBookmarkOutline/>
              </button>
        }
      </div>

      <div>
        카테고리: {categroies}
      </div>

      <div>
        프로필이미지: {profileImgUrl}
      </div>

      <div>
        닉네임: {nickName}
      </div>

      <div>
        가게이름: {placeName}
      </div>

      <div>
        글 제목: {title}
      </div>
      <div>
        글 내용:<div dangerouslySetInnerHTML={{__html: sanitizer(content)}}></div>
      </div>
      
      <div>
        {
          !!imgUrls ? 
          imgUrls.map((imgUrl, idx) => 
            <img css={s.imgLayOut} 
              key={idx} 
              src={imgUrl}
            />
          )
          :
          <p>사진없음</p>
        }
      </div>

      


    </div>
  );
}

export default LunchList;