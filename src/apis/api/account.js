import instance from "../utils/instance"

export const editAccount = async (data) => {
    return await instance.put("/account/edit", data)
}

export const duplicateUsername = async (username) => {
    return await instance.get(`/account/find/username/${username}`)
}