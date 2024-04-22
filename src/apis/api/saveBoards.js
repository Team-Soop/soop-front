import instance from "../utils/instance";

export const saveLunchBoard = async (lunchId) => {
  return await instance.post(`save/${lunchId}/lunch/board`);
}