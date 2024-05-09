import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import FeedPage from '../pages/FeedPage/FeedPage';
import { useSetRecoilState } from 'recoil';
import { rightSideBarState, sideMenuState } from '../atoms/SideMenuAtom';

function FeedRoute(props) {
  
  const setSideMenuNum = useSetRecoilState(sideMenuState);
  const setRightSideMenu = useSetRecoilState(rightSideBarState);

  useEffect(() => {
    setSideMenuNum(1)
  }, [])
  
  useEffect(() => {
    setRightSideMenu(1)
  }, [])

  return (
    <Routes>
      <Route path='' element={<FeedPage/> } />
    </Routes>
  );
}

export default FeedRoute;
