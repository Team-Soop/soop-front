import instance from "../utils/instance"

export const lunchRequest = async (data) => {
    return await instance.post("/lunch/save", data);
}

export const searchAllLunch = async () => {
    return await instance.get("/lunch/search");
}