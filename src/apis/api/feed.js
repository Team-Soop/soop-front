import instance from "../utils/instance"

export const feedRequest = async (data) => {
    return await instance.post("/feed", data);
}

export const feedListGet = async () => {
    return await instance.get("/feed");
}

export const feedLike = async (feedId) => {
    return await instance.post(`/feed/${feedId}/like`);
}

export const feedDeleteLike = async (feedId) => {
   return await instance.delete(`/feed/${feedId}/like`);
}

export const feedGetLike = async (feedId) => {
    return await instance.get(`/feed/${feedId}/like`);
}

export const feedCommentRequest = async (data) => {
    return await instance.post("/feed/comment/save", data)
}

export const searchFeedComment = async (feedId) => {
    return await instance.get(`feed/${feedId}/comment`)
}

export const updateFeedComment = async (data) => {
    return await instance.put("/feed/comment/update", data)
}

export const deleteFeedComment = async (data) => {
    return await instance.delete(`/feed/comment/delete/${data}`);
}

export const getMypageFeedList = async (userId) => {
    return await instance.get(`/account/mypage/feed/${userId}`)
}

export const deleteMypageFeed = async ({menuCategoryName, feedId}) => {
    return await instance.delete(`/account/mypage/feed/${menuCategoryName}/${feedId}/delete`);
}