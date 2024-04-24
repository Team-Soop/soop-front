import React, { useEffect } from 'react';
import { useQueryClient } from 'react-query';

function Admin(props) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");

  useEffect(() => {
    if(!principalData) {
      alert("접근 권한이 없습니다.")
      window.location.replace("/")
    } 
    else if (principalData.data.authorities.filter((authoritie) => authoritie.authority === "ROLE_ADMIN").length === 0){
      alert("관리자만 접근 가능합니다")
      window.location.replace("/")
    }

    // if(
    //   principalData.data.authorities
    //     .filter((authoritie) => 
    //       authoritie.authority === "ROLE_ADMIN")[0].authority === "ROLE_ADMIN") {
    //       alert("관리자만 접근 가능합니다")
    // }
  },[principalData])
  
  // console.log(principalData.data.authorities.filter((authoritie) => authoritie.authority === "ROLE_ADMIN")[0].authority === "ROLE_ADMIN");
  
  // console.log(principalData.data.authorities.filter((authoritie) => authoritie.authority === "ROLE_ADMIN").length === 0);
  return (
    <div>
      어드민 페이지 입니다.
    </div>
  );
}

export default Admin;