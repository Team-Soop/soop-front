/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from 'react';
import { IoBookmark, IoBookmarkOutline  } from "react-icons/io5";
import { useNavigate, useSearchParams } from 'react-router-dom';
import { lunchDetailState } from '../../atoms/lunchDetailAtom';
import { useRecoilState } from 'recoil';
import DOMPurify from "dompurify";
import { AiOutlineLike } from "react-icons/ai";
import LunchDetailMap from "./LunchDetailMap/LunchDetailMap";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { saveBoard, saveDeleteBoard, saveGetBoard } from "../../apis/api/saveBoards";
import LunchComment from "./LunchComment/LunchComment";
import { lunchDeleteLike, lunchGetLike, lunchLike } from "../../apis/api/lunch";
import userImg from "../../assets/images/userProfileNone.png";
import { lunchCategories } from "../../constants/lunchCategroies";
import 'react-slideshow-image/dist/styles.css'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { Slide } from "react-slideshow-image";
import { IoMdHeart } from "react-icons/io";
import { IoMdHeartEmpty } from "react-icons/io";
import { FaRegCommentAlt } from "react-icons/fa";
import { commentContent } from "../FeedCard/FeedCardComment/style";



function LunchDetail() {
  const sanitizer = DOMPurify.sanitize;
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  const [searchParams, setSearchParams] = useSearchParams();
  const [lunchDetailData, setLunchDetailData] = useRecoilState(lunchDetailState);
  const [isCommentOpen, setIsCommentOpen] = useState(false);
  const [ categoryuLabel, setCategoryLabel ] = useState([]);
  

  const detailLunchId = parseInt(searchParams.get("lunchId"))
  const dataResult = lunchDetailData?.filter(detailData => detailData.lunchId === detailLunchId)[0];
  // 슬라이드쇼 
  const settings = {
    className: "slide-container",
    dots: true,
    autoplay: false,
    infinite: dataResult?.imgUrls.length > 1 ? true : false,
    transitionDuration: 300,
    easing: "ease-in"
  }

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries([`boardSaveQuery${detailLunchId}`]);
      queryClient.invalidateQueries([`likeLunchQuery${detailLunchId}`]);
    }
  }, [])

  useEffect(() => {
    setCategoryLabel(() => 
      lunchCategories.filter(lunchCategory => 
        dataResult?.categroies.map(category => category).includes(lunchCategory.value)
      )
    )
  },[dataResult?.categroies])


  // board 들고오기
  const boardSaveQuery = useQuery([`boardSaveQuery${detailLunchId}`],
    () => saveGetBoard(detailLunchId, 2),
    {
      refetchOnWindowFocus: false,
      retry: 0
    }
  )

  // 좋아요,추천 들고오기
  const likeLunchQuery = useQuery([`likeLunchQuery${detailLunchId}`],
    () => lunchGetLike(detailLunchId),
    {
      refetchOnWindowFocus: false,
      retry: 0,
    }
  )


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
  const likeLunch = useMutation({
    mutationKey: "likeLunch",
    mutationFn: lunchLike,
    onSuccess: response => {
      console.log(response);
      likeLunchQuery.refetch();
    },
    onError: error => {
      console.log(error);
    }
  })

  // 추천,좋아요 취소 버튼
  const unLikeLunch = useMutation({
    mutationKey: "unLikeLunch",
    mutationFn: lunchDeleteLike,
    onSuccess: response => {
      console.log(response);
      likeLunchQuery.refetch();
    },
    onError: error => {
      console.log(error);
    }
  })


  // 뒤로 가기버튼
  const handleClickBack = () => {
    navigate('/lunch')
  }

  console.log(dataResult);


  return (
    <div css={s.layout}>
      {/* <button onClick={handleClickBack}>뒤로가기</button> */}

      <div css={s.detailHeader}>
        {/* 가게이름 */}
        <div css={s.placeName}>
          {dataResult?.placeName}
        </div>

        {/* 게시물 저장하기 */}
        <div css={s.detailFavorite}>
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
      </div>
      
      <div css={s.userInfo}>
        <img src=
        {
          !!dataResult?.profileImgUrl
          ? dataResult?.profileImgUrl
          : userImg
        }/>
        <div>{dataResult?.nickName}</div>
      </div>

      <div css={s.line}></div>
      {/* 게시물 내용 */}
      {/* ---------- */}

      
      {
        categoryuLabel > 1
        ?
        <div  css={s.categoriesLayout}>
          {/* 카테고리 */} 
          {categoryuLabel.map(category => {
            return (
              <div css={s.categoriesContainer}>
                <div>{category.label}</div>
                <span>{category.value}</span>
                <p>{category.value}</p>
              </div>
            )
          })
          }
        </div>
        :
        <></>
      }


      {/* 가게 지도 */}

      <LunchDetailMap
        placeName={dataResult?.placeName}
        placeX={dataResult?.placeX}
        placeY={dataResult?.placeY}
        placeUrl={dataResult?.placeUrl}
      />


      {/* 이미지, 게시물 */}
      <div css={s.feedcontents}>
        {
          dataResult?.imgUrls > 1
          ? (
          <div className="slide-container">
            <Slide {...settings} 
              prevArrow={<div css={s.slideArrow}><IoIosArrowDropleftCircle /></div>}
              nextArrow={<div css={s.slideArrow}><IoIosArrowDroprightCircle /></div>}
            >
              {dataResult?.imgUrls.map((photo, index) => (
                <div key={index} css={s.imgUrl(photo)}></div>
              ))}
            </Slide>
          </div>
          )
          : (
          <div className="slide-container">
            {dataResult?.imgUrls.map((photo, index) => (
              <div key={index} css={s.imgUrl(photo)}></div>
            ))}
          </div>
          )
        }

        <div css={s.content}>
          <div dangerouslySetInnerHTML={{ __html: sanitizer(dataResult?.content) }}></div>
        </div>
      </div>

      {/* 댓글, 좋아요 */}
      <div css={s.footer}>
          {
            likeLunchQuery.isLoading
            ? <></>
            : likeLunchQuery.data.data.likeStatus > 0
              ?
                <button css={s.feedFooterButton} onClick={() => unLikeLunch.mutate(detailLunchId)}>
                  <IoMdHeart/> <span>{likeLunchQuery.data.data.totalCount}</span>
                </button>
              :
                <button css={s.feedFooterButton} onClick={() => likeLunch.mutate(detailLunchId)}> 
                  <IoMdHeartEmpty/> <span>{likeLunchQuery.data.data.totalCount}</span>
                </button>
          }



          <button css={s.feedFooterButton} onClick={() => {setIsCommentOpen(!isCommentOpen)}}>
            <FaRegCommentAlt />{" "}
            <span>{!commentContent?.totalCount ? 0 : commentContent?.totalCount}</span>
          </button>
          
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



    </div>
  );
}

export default LunchDetail;