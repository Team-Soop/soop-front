import { atom } from "recoil";

export const sideMenuState = atom({
    key: "sideMenuState",
    default: 1
})

export const rightSideBarState = atom({
    key: "rightSideBarState",
    default: 0
})