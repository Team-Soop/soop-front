import instance from "../utils/instance"

export const userBanRequest = async (userId) => {
  return await instance.post(`/user/${userId}/ban`)
}

export const searchUserRequest = async (params) => {
  console.log(params);
  return await instance.get("/user/search", {params});
}