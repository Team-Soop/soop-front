import instance from "../utils/instance"

export const lunchRequest = async (data) => {
    return await instance.post("/lunch/save", data);
}