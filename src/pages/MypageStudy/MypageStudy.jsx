import React, { useEffect } from 'react'
import { sideMenuSelectNum } from '../../atoms/SideMenuAtom'
import { useSetRecoilState } from 'recoil'

export default function MypageStudy(set) {

    const setSideMenuSelectNum = useSetRecoilState(sideMenuSelectNum)

    useEffect(() => {
        setSideMenuSelectNum(2)
    })


  return (
    <div>
      테스트
    </div>
  )
}
