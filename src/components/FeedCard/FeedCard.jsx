/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { FaRegCommentAlt } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";
import DOMPurify from "dompurify";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { feedDeleteLike, feedGetLike, feedLike } from "../../apis/api/feed";
import { useEffect } from "react";

function FeedCard({feed}) {
    const sanitizer = DOMPurify.sanitize;
    const queryClient = useQueryClient();

    useEffect(() => {
        return () => {
            queryClient.invalidateQueries([`likeQuery${feed.feedId}`]);
        }
    }, [])

    const likeQuery = useQuery([`likeQuery${feed.feedId}`], 
        () => feedGetLike(feed.feedId),
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

  
    return (
        <li key={feed.feedId} css={s.feedlayout}>
            <div>
            <img src={feed.profileImgUrl} alt="" />
            <div>{feed.username}</div>
            </div>
            <div css={s.feedcontents}>
            <div dangerouslySetInnerHTML={{__html: sanitizer(feed.feedContent)}}></div>
                {feed.feedImgUrl.map((imgUrl, index) => (
                <img key={index} src={imgUrl} alt="" css={s.feedImg}/>
                ))}
            </div>
            
            
            <div>
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
            <button><FaRegCommentAlt /></button>
            <button><BsExclamationCircle /></button>
            </div>
        </li>
    );
}

export default FeedCard;