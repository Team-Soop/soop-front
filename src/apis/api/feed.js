import instance from "../utils/instance"

export const feedRequest = async (data) => {
    return await instance.post("/feed", data);
}