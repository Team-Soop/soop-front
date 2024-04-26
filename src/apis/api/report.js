import instance from "../utils/instance";

export const reportRequst = async(data) => {
  return await instance.post("/report/save", data)
}

export const searchAllReport = async() => {
  return await instance.get("/report/search");
}