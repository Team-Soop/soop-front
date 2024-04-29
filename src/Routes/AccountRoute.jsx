import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Mypage from '../pages/Mypage/Mypage'
import PasswordEditPage from '../pages/PasswordEditPage/PasswordEditPage'
import { sideMenuState } from '../atoms/SideMenuAtom'
import { useSetRecoilState } from 'recoil'
import AccountEditPage from '../pages/AccountEditPage/AccountEditPage'
import MypageFavoritePage from '../pages/MypageFavoritePage/MypageFavoritePage'
import MypageStudy from '../pages/MypageStudy/MypageStudy'
import MypageFeed from '../pages/MypageFeed/MypageFeed'
import MypageLunch from '../pages/MypageLunch/MypageLunch'

export default function AccountRoute() {
    const setSideMenuNum = useSetRecoilState(sideMenuState)

    useEffect(() => {
      setSideMenuNum(2)
    }, [])

  return (
    <Routes>
        <Route path='/mypage' element={<Mypage />} />
        <Route path='/mypage/feed' element={<MypageFeed />} />
        <Route path='/mypage/study' element={<MypageStudy />} />
        <Route path='/mypage/lunch' element={<MypageLunch />} />
        <Route path='/mypage/favorite' element={<MypageFavoritePage />} />
        <Route path='/edit' element={<AccountEditPage />} />
        <Route path='/edit/password' element={<PasswordEditPage />}/>
    </Routes>
  )
}