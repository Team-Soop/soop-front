import instance from "../utils/instance";

export const saveBoard = async ({boardId, menuId}) => {
  return await instance.post(`save/${boardId}/${menuId}/board`);
}

export const saveGetBoard = async (boardId, menuId) => {
  return await instance.get(`save/${boardId}/${menuId}/board`)
}

export const saveDeleteBoard = async ({boardId, menuId}) => {
  return await instance.delete(`save/${boardId}/${menuId}/board`)
}