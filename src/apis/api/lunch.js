import instance from "../utils/instance"

export const lunchRequest = async (data) => {
    return await instance.post("/lunch/save", data);
}

export const searchAllLunch = async () => {
    return await instance.get("/lunch/search");
}

export const lunchCommentRequest = async (data) => {
    return await instance.post("/lunch/comment/save", data)
}

export const searchComment = async (data) => {
    return await instance.post("/lunch/comment/search", data)
}
