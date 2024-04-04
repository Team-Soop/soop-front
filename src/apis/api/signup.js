import instance from "../utils/instance"

export const signupRequest = async (data) => {
    try {
        const response = instance.post("/auth/signup", data);
        return response;
    } catch (error) {
        console.log(error);
        return error.response;
    }
}

export const oAuth2SignupRequest = async (data) => {
    return await instance.post("/auth/oauth2/signup", data);
}