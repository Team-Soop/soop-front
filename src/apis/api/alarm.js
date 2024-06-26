import instance from "../utils/instance"

export const alarmReportComplete = async (data) => {
  return await instance.post("/alarm/send", data)
}

export const searchUserAlarmList = async (userId) => {
  return await instance.get(`/alarm/search/${userId}`)
}

export const deleteAlarm = async (alarmId) => {
  return await instance.delete(`alarm/delete/${alarmId}`)
}