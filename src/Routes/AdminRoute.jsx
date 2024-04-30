import React from 'react';
import { Route, Routes } from 'react-router-dom';
import AdminReport from '../pages/Admin/AdminReport';
import { useQueryClient } from 'react-query';
import { useEffect } from 'react';
import UserManagement from '../pages/Admin/UserManagement';

function AdminRoute(props) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");

  useEffect(() => {
    if (!principalData) {
      alert("접근 권한이 없습니다.")
      window.location.replace("/")
    }
    else if (principalData.data.authorities.filter((authoritie) => authoritie.authority === "ROLE_ADMIN").length === 0) {
      alert("관리자만 접근 가능합니다")
      window.location.replace("/")
    }

  }, [principalData])

  return (
    <>
      <Routes>
        <Route path='/report' element={<AdminReport />} />
        <Route path='/user/management' element={<UserManagement/>}/>
      </Routes>
    </>
  );
}

export default AdminRoute;