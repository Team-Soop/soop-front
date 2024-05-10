/** @jsxImportSource @emotion/react */
import { useQuery, useQueryClient } from "react-query";
import FeedCard from "../../components/FeedCard/FeedCard";
import * as s from "./style";

import { useEffect, useState } from "react";
import { getSavedBoard, getSavedLunchBoard } from "../../apis/api/saveBoards";
import LunchList from "../../components/LunchList/LunchList";

export default function MypageFavoritePage() {
    const [viewState, setViewState] = useState(0); // 0 = feed, 1 = lunch
    const [feeds, setFeeds] = useState([]);
    const [lunchs, setLunchs] = useState([]);
    const [isBookMarkClick, setIsBookMarkClick] = useState(true);

    const getSavedBoardQuery = useQuery(["getSavedBoardQuery", isBookMarkClick], getSavedBoard, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (response) => {
            setFeeds(() => response.data);
        },
        onError: (error) => {
            console.log(error.response?.data);
        },
    });

    const getSavedLunchBoardQuery = useQuery(["getSavedLunchBoardQuery"], getSavedLunchBoard, {
        retry: 0,
        refetchOnWindowFocus: false,
        onSuccess: (response) => {
            setLunchs(() =>
                response.data.map((data) => {
                    return {
                        lunchId: data.lunchId,
                        nickName: data.nickName,
                        profileImgUrl: data.profileImgUrl,
                        PlaceName: data.lunchPlaceName,
                        categroies: data.lunchCategoryNames,
                        title: data.lunchTitle,
                        imgUrls: data.lunchImgUrls,
                    };
                })
            );
        },
    });

    return (
        <>
            <div css={s.layout}>
                <div css={s.header}>
                    <div onClick={() => setViewState(0)}>북마크 피드</div>
                    <div onClick={() => setViewState(1)}>오늘 뭐 먹지?</div>
                </div>
                <div css={s.feedPageLayout}>
                    {viewState === 0 ? (
                        <ul>
                            {feeds.map((feed) => {
                                return (
                                    <FeedCard feed={feed} key={feed.feedId} setIsBookMarkClick={setIsBookMarkClick} />
                                );
                            })}
                        </ul>
                    ) : (
                        <ul>
                            {lunchs.map((lunch) => {
                                return (
                                    <div key={lunch.lunchId}>
                                        <LunchList
                                            lunchId={lunch.lunchId}
                                            profileImgUrl={lunch.profileImgUrl}
                                            nickName={lunch.nickName}
                                            placeName={lunch.PlaceName}
                                            categroies={lunch.categroies}
                                            title={lunch.title}
                                            imgUrls={lunch.imgUrls}
                                            content={lunch.content}
                                        />
                                    </div>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </div>
        </>
    );
}
