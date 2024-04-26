import instance from "../utils/instance";

export const reportRequst = async(data) => {
  return await instance.post("/report/save", data)
}


export const searchReportRequest = async (params) => {
  return await instance.get("/report/search", {params});
}