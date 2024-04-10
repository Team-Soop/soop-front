import instance from "../utils/instance"

export const feedRequest = async (data) => {
    return await instance.post("/feed", data);
}

export const feedListGet = async () => {
    return await instance.get("/feed");
}