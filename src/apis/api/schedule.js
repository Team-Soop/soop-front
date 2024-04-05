import instance from "../utils/instance"

export const addSchedule = async (data) => {
    return await instance.post("/schedule", data)
}