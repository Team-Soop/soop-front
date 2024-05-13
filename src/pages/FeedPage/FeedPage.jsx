/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import { feedDeleteLike, feedGetLike, feedLike, feedListGet } from "../../apis/api/feed";
import { useMutation, useQuery, useQueryClient } from "react-query";
import AddFeed from "../../components/AddFeed/AddFeed";
import DOMPurify from "dompurify";
import { useSearchParams } from "react-router-dom";
import FeedCard from "../../components/FeedCard/FeedCard";
import Modal from "react-modal";
import { MdOutlineCancel } from "react-icons/md";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { rightSideBarState, sideMenuState } from "../../atoms/SideMenuAtom";
import { contentSortState } from "../../atoms/contentSortAtom";

function FeedPage(props) {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const [feedList, setFeedList] = useState([]);
    const [modal, setModal] = useState(false);
    const [rightSideBar, setRightSideBar] = useRecoilState(rightSideBarState);
    const setSideMenuState = useSetRecoilState(rightSideBarState);
    const sortState = useRecoilValue(contentSortState)

    useEffect(() => {
        setRightSideBar(1);
        setSideMenuState(1);
    });

    // 피드 리스트 get
    const getFeedListQuery = useQuery("getFeedDataList", feedListGet, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (response) => {
            console.log("피드 리스트 성공");
            setFeedList(response.data);
        },
        onError: (error) => {
            console.log("피드 리스트 오류");
            console.log(error);
        },
    });

    useEffect(() => {
        let sortFeedList;

        if(sortState === 0) {
            return;
        } else if (sortState === 1) {
            sortFeedList = feedList.sort((a, b) => new Date(b.createDate) - new Date(a.createDate))
        } else if (sortState === 2) {
            sortFeedList = feedList.sort((a, b) => new Date(a.createDate) - new Date(b.createDate))
        }
        setFeedList([...sortFeedList]);
    }, [sortState])

    return (
        <div css={s.feedPageRootLayout}>
            <div css={s.feedPageLayout}>
                {/*  게시글 (피드) */}
                {feedList.length > 0 ? (
                    <ul>
                        {feedList.map((feed) => (
                            <FeedCard feed={feed} key={feed.feedId} />
                        ))}
                    </ul>
                ) : (
                    <div>빈 게시판입니다.</div>
                )}
            </div>
        </div>
    );
}

export default FeedPage;
