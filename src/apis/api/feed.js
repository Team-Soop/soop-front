import instance from "../utils/instance"

export const feedRequest = async (data) => {
    return await instance.post("/feed", data);
}

export const feedListGet = async () => {
    return await instance.get("/feed");
}

export const feedLike = async (data) => {
    return await instance.post("/feed/like", data);
}

export const feedGetLike = async () => {
    return await instance.get("/feed/like")
}
 
export const feedDeleteLike = async (data) => {
    return await instance.delete("/feed/like", {data});
}