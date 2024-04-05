import instance from "../utils/instance"

export const feedRequest = async () => {
    return await instance.get("/feed");
}