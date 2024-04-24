import instance from "../utils/instance"
// 게시물
export const lunchRequest = async (data) => {
    return await instance.post("/lunch/save", data);
}

export const searchAllLunch = async () => {
    return await instance.get("/lunch/search");
}

// 댓글
export const lunchCommentRequest = async (data) => {
    return await instance.post("/lunch/comment/save", data)
}

export const searchComment = async (data) => {
    return await instance.post(`/lunch/comment/search?detailLunchId=${data}`)
}

export const updateComment = async (data) => {
    return await instance.put("/lunch/comment/update", data)
}

export const deleteComment = async (data) => {
    return await instance.delete(`/lunch/comment/delete/${data}`);
}

// 좋아요,추천
export const lunchLike = async (lunchId) => {
    return await instance.post(`/lunch/${lunchId}/like`);
}