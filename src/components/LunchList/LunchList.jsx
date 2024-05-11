/** @jsxImportSource @emotion/react */
import * as s from "./style";
import DOMPurify from "dompurify";
import { IoBookmark, IoBookmarkOutline } from "react-icons/io5";
import { BsExclamationCircle } from "react-icons/bs";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { saveBoard, saveDeleteBoard, saveGetBoard } from "../../apis/api/saveBoards";
import { useEffect, useState } from "react";
import { lunchGetLike } from "../../apis/api/lunch";
import { useNavigate } from "react-router-dom";
import userImg from "../../assets/images/userProfileNone.png";
import { lunchCategories } from "../../constants/lunchCategroies";
import { RiEmotionHappyLine } from "react-icons/ri";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdHeart } from "react-icons/io";



function LunchList({
    lunchId,
    profileImgUrl,
    nickName,
    placeName,
    categroies,
    title,
    imgUrls,
    content,
    setIsLunchClick,
}) {
    const sanitizer = DOMPurify.sanitize;
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const [ categoryLabel, setCategoryLabel ] = useState([]);

    useEffect(() => {
        // setCategoryLabel(() => 
        //     categroies.filter(category => 
        //         lunchCategories.map(
        //             lunchCategory => lunchCategory.value).includes(category)
        //         )
        // )

        setCategoryLabel(() =>
            lunchCategories.filter(lunchCategory =>
                categroies.map(category => category).includes(lunchCategory.value)
            )
        )


    },[categroies])

    useEffect(() => {
        return () => {
            queryClient.invalidateQueries([`BoardSaveQuery${lunchId}`]);
            queryClient.invalidateQueries([`likeLunchQuery${lunchId}`]);
        };
    }, []);

    // 저장된 board 들고오기
    const BoardSaveQuery = useQuery([`BoardSaveQuery${lunchId}`], () => saveGetBoard(lunchId, 2), {
        refetchOnWindowFocus: false,
        retry: 0,
    });

    // 좋아요,추천 들고오기
    const likeLunchQuery = useQuery([`likeLunchQuery${lunchId}`], () => lunchGetLike(lunchId), {
        refetchOnWindowFocus: false,
        retry: 0,
    });

    // 저장하기 버튼
    const lunchBoardSave = useMutation({
        mutationKey: "lunchBoardSave",
        mutationFn: saveBoard,
        onSuccess: (response) => {
            BoardSaveQuery.refetch();
        },
        onError: (error) => {
            console.log(error);
        },
    });

    // 저장취소 버튼
    const deleteLunchBoardSave = useMutation({
        mutationKey: "deleteLunchBoardSave",
        mutationFn: saveDeleteBoard,
        onSuccess: (response) => {
            BoardSaveQuery.refetch();
            setIsLunchClick((prev) => !prev);
        },
        onError: (error) => {
            console.log(error);
        },
    });

    // 신고 창 opne 버튼
    const isReportOpen = () => {
        if (window.confirm("이 게시물을 신고 하시겠습니까?")) {
            navigate(`/lunch/report/3/${lunchId}`);
        }
        return;
    };

    return (
        <div>
          <li css={s.lunchLayout}>
            {/* 제목, 북마크 버튼 */}
            <div css={s.listHeader}>
              <div css={s.plaecName}>{placeName}</div>

              <div css={s.lunchfavorite}>
                {BoardSaveQuery.isLoading ? (
                    <></>
                ) : BoardSaveQuery.data.data.saveBoardStatus > 0 ? (
                    <button onClick={() => deleteLunchBoardSave.mutate({ boardId: lunchId, menuId: 2 })}>
                        <IoBookmark css={s.saveFavorite}/>
                    </button>
                ) : (
                    <button onClick={() => lunchBoardSave.mutate({ boardId: lunchId, menuId: 2 })}>
                        <IoBookmarkOutline />
                    </button>
                )}
              </div>
            </div>
            
            <div css={s.line}></div>

            {/* 유저 정보, 카테고리들 */}
            <div css={s.lunchBody}>
              {/* 닉네임, 프로필 */}
              <div css={s.userInfo}>
                <img src=
                {
                    !!profileImgUrl 
                    ? profileImgUrl
                    : userImg

                } />
                <div>{nickName}</div>
              </div>

              <div css={s.categoriesLayout}>
                {/* 카테고리 */}
                {categoryLabel.map(category => {
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
            </div>


            <div css={s.lunchFooter}>
              <div css={s.likeLayout}>
                <div css={s.lunchReport}>
                  <button onClick={() => isReportOpen()}>
                      <BsExclamationCircle />
                  </button>
                </div>
                <span><IoMdHeart/></span> 
                {likeLunchQuery.isLoading ? <></> : likeLunchQuery.data.data.totalCount}
              </div>

            </div>




              


              {/* <div>글 제목: {title}</div>
              <div>
                  글 내용:
                  <div dangerouslySetInnerHTML={{ __html: sanitizer(content) }}></div>
              </div> */}

              <div>{!!imgUrls ? imgUrls.map((imgUrl, idx) => <img key={idx} src={imgUrl} />) : <p>사진없음</p>}</div>
          </li>
        </div>
    );
}

export default LunchList;
