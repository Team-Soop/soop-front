import instance from "../utils/instance"

export const oAtuh2MergeRequest = async (data) => {
    return await instance.post("/auth/oauth2/merge", data);
}