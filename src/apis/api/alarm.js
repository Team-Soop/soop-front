import instance from "../utils/instance"

export const alarmReportComplete = async (data) => {
  return await instance.post("/alarm/send", data)
}