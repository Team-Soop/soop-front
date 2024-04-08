import instance from "../utils/instance"

export const addSchedule = async (data) => {
    return await instance.post("/schedule", data)
}

export const searchAllSchedule = async () => {
    return await instance.get("/schedule")
}