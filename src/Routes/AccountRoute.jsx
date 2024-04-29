import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import Mypage from '../pages/Mypage/Mypage'
import PasswordEditPage from '../pages/PasswordEditPage/PasswordEditPage'
import { sideMenuState } from '../atoms/SideMenuAtom'
import { useSetRecoilState } from 'recoil'

export default function AccountRoute() {
    const setSideMenuNum = useSetRecoilState(sideMenuState)

    useEffect(() => {
      setSideMenuNum(2)
    }, [])

  return (
    <Routes>
        <Route path='/account/mypage' element={<Mypage />} />
        <Route path='/account/edit/password' element={<PasswordEditPage />}/>
    </Routes>
  )
}
