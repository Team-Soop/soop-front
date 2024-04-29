import instance from "../utils/instance"

export const boardDelete = async ({menuCategoryName, boardId}) => {
  return await instance.delete(`admin/board/${menuCategoryName}/${boardId}/delete`)
}