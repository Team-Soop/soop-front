import instance from "../utils/instance"

export const userBanRequest = async (userId) => {
  return await instance.post(`/user/${userId}/ban`)
}