import instance from "../utils/instance"

export const searchStudyCategory = async () => {
    return await instance.get("/study/category")
}

export const saveStudyGroup = async (data) => {
    return await instance.post("/study/save", data)
}

export const updateStudyGroup = async (data) => {
    return await instance.put(`study/update/${data.id}`, data.data)
}

export const searchStudyList = async () => {
    return await instance.get("/study/boardlist")
}

export const searchStudyBoard = async (id) => {
    return await instance.get(`/study/board/${id}`)
}

export const deleteStudyGroup = async (id) => {
    return await instance.delete(`/study/delete/${id}`)
}