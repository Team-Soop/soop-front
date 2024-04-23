import instance from "../utils/instance"

export const searchStudyCategories = async () => {
    return await instance.get("/study/category")
}

export const saveStudyGroup = async (data) => {
    return await instance.post("/study/save", data)
}

export const searchStudyList = async () => {
    return await instance.get("/study/boardlist")
}