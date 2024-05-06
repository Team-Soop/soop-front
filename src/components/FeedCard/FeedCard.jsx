/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";
import { IoBookmark, IoBookmarkOutline  } from "react-icons/io5";
import DOMPurify from "dompurify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteMypageFeed, feedDeleteLike, feedGetLike, feedLike } from "../../apis/api/feed";
import { useEffect, useState } from "react";
import { saveBoard, saveDeleteBoard, saveGetBoard } from "../../apis/api/saveBoards";
import FeedCardComment from "./FeedCardComment/FeedCardComment";
import { AiOutlineAlert } from "react-icons/ai";
import { useRecoilValue } from "recoil";
import { sideMenuState } from "../../atoms/SideMenuAtom";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-slideshow-image/dist/styles.css'
import { Slide } from "react-slideshow-image";

function FeedCard({feed}) {
    const sanitizer = DOMPurify.sanitize;
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const [ isCommentOpen, setIsCommentOpen ] = useState(false);
    const setSideMenuNum = useRecoilValue(sideMenuState);

    useEffect(() => {
        return () => {
            queryClient.invalidateQueries([`likeQuery${feed.feedId}`]);
            queryClient.invalidateQueries([`boardSaveQuery${feed.feedId}`]);
        }
    }, [])

    // 좋아요 들고오기
    const likeQuery = useQuery([`likeQuery${feed.feedId}`], 
        () => feedGetLike(feed.feedId),
        {
            refetchOnWindowFocus: false,
            retry: 0,
        }
    )

    // 저장된 board 들고오기
    const boardSaveQuery = useQuery([`boardSaveQuery${feed.feedId}`],
        () => saveGetBoard(feed.feedId, 1),
        {
            refetchOnWindowFocus: false,
            retry: 0
        }
    )
    
    // 좋아요
    const likeFeed = useMutation({
        mutationKey: "likesFeed",
        mutationFn: feedLike,
        onSuccess: response => {
            likeQuery.refetch();
        },
        onError: error => {
            console.log(error);
        }
    })
    // 좋아요 취소
    const deleteLike = useMutation({
        mutationKey: "deleteLike",
        mutationFn: feedDeleteLike,
        onSuccess: response => {
            likeQuery.refetch();
        },
        onError: error => {
            console.log(error);
        }
    })
    // 저장하기 버튼
    const lunchBoardSave = useMutation({
        mutationKey: "lunchBoardSave",
        mutationFn: saveBoard,
        onSuccess: response => {
            boardSaveQuery.refetch();
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
            boardSaveQuery.refetch();
        },
        onError: error => {
            console.log(error);
        }
    })
    
    // 마이페이지 피드 삭제
    const deleteFeed = useMutation({
        mutationKey: "deleteFeed",
        mutationFn: deleteMypageFeed,
        onSuccess: response => {
            alert("삭제완료");
            window.location.replace("/account/mypage/feed")
        },
        onError: error => {
            console.log(error);
        }
    })

    // 마이페이지 피드 삭제 버튼
    const deleteMypageFeedButton = () => {
        if(window.confirm("삭제하시겠습니까?") === true) {
            deleteFeed.mutate({menuCategoryName: "자유게시판", feedId: feed.feedId})
        } else { 
            return; 
        }
    }

    const editMypageFeed = () => {
        
    }

    const isReportOpen = (feedId) => {
        if(window.confirm("이 게시물을 신고 하시겠습니까?")){
          navigate(`/report/1/${feedId}`)
        // console.log(feedId)
        }
        return;
      }
    
  
    return (
        <div>
            {
            //  기본 페이지 피드 
            setSideMenuNum === 1
            ?
            <div css={s.feedCardRoot}>
                <li key={feed.feedId} css={s.feedlayout}>
                    {/* 유저정보 */}
                    <div css={s.feedHeader}>
                        <div css={s.feedHeaderProfileImg}><img src={feed.profileImgUrl} alt="" /></div>
                        <div css={s.feedHeaderUser}>{feed.nickname}</div>
                    </div>

                    {/* 피드(이미지, 게시글) */}
                    <div css={s.feedcontents}>
                        {
                            feed.feedImgUrl.length > 0 && 
                            <div className="slide-container">
                                <Slide autoplay={false} infinite={false}>
                                    {feed.feedImgUrl.map((imgUrl, index)=> (
                                        <div key={index} css={s.feedImg(imgUrl)}></div>
                                    ))} 
                                </Slide>
                            </div>
                        }
                        
                        <div css={s.feedText} dangerouslySetInnerHTML={{__html: sanitizer(feed.feedContent)}}></div>
                    </div>
                    {/* 저장하기 */}
                    <div css={s.feedfavorite}>
                        {
                            boardSaveQuery.isLoading
                            ? <></>
                            : boardSaveQuery.data.data.saveBoardStatus > 0
                                ? 
                                <button css={s.feedFavoriteButton} onClick={() => deleteLunchBoardSave.mutate({boardId : feed.feedId, menuId: 1})}>
                                    <IoBookmark css={s.saveFavorite}/>
                                </button>
                                : 
                                <button css={s.feedFavoriteButton} onClick={() => lunchBoardSave.mutate({boardId : feed.feedId, menuId: 1})}>
                                    <IoBookmarkOutline/>
                                </button>
                        }
                    </div>
                    
                    <div css={s.feedFooter}>
                    {/* 좋아요 */}
                    
                    {
                        likeQuery.isLoading 
                        ? <></>
                        : likeQuery.data.data.likeStatus > 0 
                            ? 
                                <button css={s.feedFooterButton} onClick={() => deleteLike.mutate(feed.feedId)}> 
                                    <AiFillLike /> <span>{likeQuery.data.data.totalCount}</span>
                                </button>
                            :
                                <button css={s.feedFooterButton} onClick={() => likeFeed.mutate(feed.feedId)}> 
                                    <AiOutlineLike /> <span>{likeQuery.data.data.totalCount}</span>
                                </button>
                        }
                        
                        {/* 댓글 아이콘 */}
                        <button css={s.feedFooterButton} onClick={() => setIsCommentOpen(!isCommentOpen)}><FaRegCommentAlt /></button>
                        {/* 신고하기 */}
                        <button css={s.feedFooterButton} onClick={() => {isReportOpen(feed.feedId)}}><BsExclamationCircle /></button>
                        {/* <AiOutlineAlert /> 신고하기아이콘 */}
                    </div>

                    {/* 댓글 아이콘 눌렀을 때 */}
                    {
                        isCommentOpen 
                        ?
                        <FeedCardComment feedId={feed.feedId}/>
                        :
                        <></>
                    }
                </li>
            </div>
            : 
            // 마이페이지 피드 (수정, 삭제 버튼 있음)
            setSideMenuNum ===2
            ?
            <div css={s.feedCardRoot}>
                <li key={feed.feedId} css={s.feedlayout}>
                    {/* 유저정보 */}
                    <div css={s.feedHeader}>
                        <div css={s.feedHeaderProfileImg}><img src={feed.profileImgUrl} alt="" /></div>
                        <div css={s.feedHeaderUser}>{feed.username}</div>
                    </div>
                    {/* 피드(이미지, 게시글) */}
                    <div css={s.feedcontents}>
                        <div>
                            <button></button>
                            {feed.feedImgUrl.map((imgUrl, index) => (    
                                <img key={index} src={imgUrl} alt="" css={s.feedImg}/>
                            ))}   
                            <button></button>
                        </div>
                        
                        <div css={s.feedText} dangerouslySetInnerHTML={{__html: sanitizer(feed.feedContent)}}></div>
                    </div>
                    
                    {/* 수정, 삭제, 저장 */}
                    <div css={s.feedfavorite}>
                    <button onClick={editMypageFeed}>수정</button>
                    <button onClick={deleteMypageFeedButton}>삭제</button>
                        {
                            boardSaveQuery.isLoading
                            ? <></>
                            : boardSaveQuery.data.data.saveBoardStatus > 0
                                ? 
                                <button css={s.feedFavoriteButton} onClick={() => deleteLunchBoardSave.mutate({boardId : feed.feedId, menuId: 1})}>
                                    <IoBookmark css={s.saveFavorite}/>
                                </button>
                                : 
                                <button css={s.feedFavoriteButton} onClick={() => lunchBoardSave.mutate({boardId : feed.feedId, menuId: 1})}>
                                    <IoBookmarkOutline/>
                                </button>
                        }
                    </div>
                    
                    <div css={s.feedFooter}>
                    {/* 좋아요 */}
                    {
                        likeQuery.isLoading 
                        ? <></>
                        : likeQuery.data.data.likeStatus > 0 
                            ? 
                                <button css={s.feedFooterButton} onClick={() => deleteLike.mutate(feed.feedId)}> 
                                    <AiFillLike /> <span>{likeQuery.data.data.totalCount}</span>
                                </button>
                            :
                                <button css={s.feedFooterButton} onClick={() => likeFeed.mutate(feed.feedId)}> 
                                    <AiOutlineLike /> <span>{likeQuery.data.data.totalCount}</span>
                                </button>
                        }
                        
                        {/* 댓글 아이콘 */}
                        <button css={s.feedFooterButton} onClick={() => setIsCommentOpen(!isCommentOpen)}><FaRegCommentAlt /></button>
                        {/* 신고하기 */}
                        <button css={s.feedFooterButton} onClick={() => isReportOpen(feed.feedId)}><BsExclamationCircle /></button>
                    </div>
                    {/* 댓글 아이콘 눌렀을 때 */}
                    {
                        isCommentOpen 
                        ?
                        <FeedCardComment feedId={feed.feedId}/>
                        :
                        <></>
                    }
                </li>
            </div>
            :
            <></>
            }
            </div>
    );
}

export default FeedCard;