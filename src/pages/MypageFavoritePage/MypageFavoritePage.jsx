/** @jsxImportSource @emotion/react */
import { useQuery } from "react-query";
import FeedCard from "../../components/FeedCard/FeedCard";
import * as s from "./style";

import { useState } from "react";
import { getSavedBoard } from "../../apis/api/saveBoards";

export default function MypageFavoritePage() {
    const [viewState, setViewState] = useState(0); // 0 = feed, 1 = lunch
    const [feeds, setFeeds] = useState([]);

    const getSavedBoardQuery = useQuery(["getSavedBoardQuery"], getSavedBoard, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (response) => {
            setFeeds(() => response.data);
        },
        onError: (error) => {
            console.log(error.response?.data);
        },
    });

    return (
        <>
            <div css={s.layout}>
                <div css={s.header}>
                    <div onClick={() => setViewState(0)}>피드</div>
                    <div onClick={() => setViewState(1)}>오늘 뭐 먹지?</div>
                </div>
                <div css={s.feedPageLayout}>
                    {viewState === 0 ? (
                        <ul>
                            {feeds.map((feed) => {
                                return <FeedCard feed={feed} key={feed.feedId} />;
                            })}
                        </ul>
                    ) : (
                        <div>lunch 콘텐츠 박스</div>
                    )}
                </div>
            </div>
        </>
    );
}
