import { atom } from "recoil";

export const selectedUserState = atom({
    key: "selectedUserState",
    default: {
      userId: 0,
      userName: "",
      nickName: 0,
      name: "",
      email: "",
      roleNameKor: "",
      profileImgUrl: "",
      createDate: "",
    }
});