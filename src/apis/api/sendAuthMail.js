import instance from "../utils/instance"

export const sendAuthMailRequest = async () => {
    return await instance.post("/mail/send");
}