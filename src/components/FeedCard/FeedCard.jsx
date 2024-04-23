/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";
import { IoBookmark, IoBookmarkOutline  } from "react-icons/io5";
import DOMPurify from "dompurify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { feedDeleteLike, feedGetLike, feedLike } from "../../apis/api/feed";
import { useEffect, useState } from "react";
import { saveBoard, saveDeleteBoard, saveGetBoard } from "../../apis/api/saveBoards";
import FeedCardComment from "./FeedCardComment/FeedCardComment";

function FeedCard({feed}) {
    const sanitizer = DOMPurify.sanitize;
    const queryClient = useQueryClient();
    const [ isCommentOpen, setIsCommentOpen ] = useState(false);

    useEffect(() => {
        return () => {
            queryClient.invalidateQueries([`likeQuery${feed.feedId}`]);
            queryClient.invalidateQueries([`boardSaveQuery${feed.feedId}`]);
        }
    }, [])

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

  
    return (
        <li key={feed.feedId} css={s.feedlayout}>
            <div css={s.feedHeader}>
                <img src={feed.profileImgUrl} alt="" />
                <div>{feed.username}</div>
            </div>
            <div css={s.feedcontents}>
            <div dangerouslySetInnerHTML={{__html: sanitizer(feed.feedContent)}}></div>
                {feed.feedImgUrl.map((imgUrl, index) => (
                <img key={index} src={imgUrl} alt="" css={s.feedImg}/>
                ))}
            </div>

            {/* 저장하기 */}
            <div>
            {
                boardSaveQuery.isLoading
                ? <></>
                : boardSaveQuery.data.data.saveBoardStatus > 0
                    ? 
                    <button onClick={() => deleteLunchBoardSave.mutate({boardId : feed.feedId, menuId: 1})}>
                        <IoBookmark />
                    </button>
                    : 
                    <button onClick={() => lunchBoardSave.mutate({boardId : feed.feedId, menuId: 1})}>
                        <IoBookmarkOutline/>
                    </button>
                }
            </div>
            
            
            <div css={s.feedFooter}>
            {/* 좋아요, 댓글, 신고하기 */}
            {
                likeQuery.isLoading 
                ? <></>
                : likeQuery.data.data.likeStatus > 0 
                    ? 
                        <button onClick={() => deleteLike.mutate(feed.feedId)}> 
                            <AiFillLike /> <span>{likeQuery.data.data.totalCount}</span>
                        </button>
                    :
                        <button onClick={() => likeFeed.mutate(feed.feedId)}> 
                            <AiOutlineLike /> <span>{likeQuery.data.data.totalCount}</span>
                        </button>
            }
            
            </div>
                <button><BsExclamationCircle /></button>
            <div>
                <button onClick={() => setIsCommentOpen(!isCommentOpen)}><FaRegCommentAlt /></button>
                {
                    isCommentOpen ?
                        <FeedCardComment feedId={feed.feedId}/>
                    :
                    <></>
                }
            </div>
        </li>
    );
}

export default FeedCard;