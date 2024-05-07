import instance from "../utils/instance"

export const userBanRequest = async (userId) => {
  return await instance.post(`/user/${userId}/ban`)
}

export const searchUserRequest = async (params) => {
  return await instance.get("/user/search", {params});
}

export const getUserCountRequest = async (params) => {
  return await instance.get("/user/search/count", {params});
}

export const updateUserRoleRequest = async ({newRoleId, oldRoleId,userId}) => {
  return await instance.post(`/user/${newRoleId}/${oldRoleId}/${userId}/update/role`);
}

export const deleteUserRequest = async (data) => {
  return await instance.delete("/user/delete", {data});
}