import instance from "../utils/instance"

export const searchStudyCategory = async () => {
    return await instance.get("/study/category")
}

export const saveStudyGroup = async (data) => {
    return await instance.post("/study/save", data)
}

export const updateStudyGroup = async (data) => {
    return await instance.put(`/study/update/${data.id}`, data.data)
}

export const searchStudyList = async () => {
    return await instance.get("/study/boardlist")
}

export const searchOptionStudyList = async (params) => {
    return await instance.get("/study/boardlist/option", {params: params})
}

export const mySearchStudyList = async (userId) => {
    return await instance.get(`study/boardlist/${userId}`)
}

export const searchStudyBoard = async (id) => {
    return await instance.get(`/study/board/${id}`)
}

export const deleteStudyGroup = async (id) => {
    return await instance.delete(`/study/delete/${id}`)
} 

export const searchWaitingMember = async (id) => {
    return await instance.get(`/study/waiting/${id}`)
}

export const searchRecruitment = async (id) => {
    return await instance.get(`/study/recruitment/${id}`)
}

export const applyPeriod = async (data) => {
    return await instance.post(`/study/apply/period`, data)
}

export const admissionWatingMember = async (data) => {
    return await instance.put(`/study/admission`, data)
}

export const refuseWatingMember = async (waitingId) => {
    return await instance.put(`/study/refuse/${waitingId}`,)
}

export const resignMember = async (recruitmentId) => {
    return await instance.delete(`/study/recruitment/${recruitmentId}`)
}