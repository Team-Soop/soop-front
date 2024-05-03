import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import instance from '../../apis/utils/instance';
import { sendAuthMailRequest } from '../../apis/api/sendAuthMail';

export default function AccountEditPage() {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");

    
  
    // 이메일 인증하기
    const sendAuthMailMutation = useMutation({
      mutationKey: "sendAuthMailMutation",
      mutationFn: sendAuthMailRequest,
      retry: 0,
      onSuccess: (response) => {
        if(response.data) {
            alert("메일 전송을 완료하였습니다.");
        }else {
            alert("메일 전송에 실패하였습니다.");
        }
      }
    });
  
    const handleSendAuthMailClick = () => {
      sendAuthMailMutation.mutate();
    }
  
    // 로그아웃
    const handleLogoutClick = () => {
  
      localStorage.removeItem("AccessToken");
      instance.interceptors.request.use((config) => {
        config.headers.Authorization = null;
        return config;
      });
      queryClient.refetchQueries("principalQuery");
      window.location.replace("/auth/signin");
    }
  
    
  
    return (
      <div>
        <div>사용자이름: {principalData?.data.username}</div>
        <div>이름: {principalData?.data.name}</div>
        <div>닉네임: {principalData?.data.nickname}</div>
        <div>
          <div>이메일: {principalData?.data.email}</div>
          {
            principalData?.data.authorities.filter(auth => auth.authority === "ROLE_USER").length === 0
              ?
              <button onClick={handleSendAuthMailClick}>인증하기</button>
              :
              <div></div>
          }
        </div>
        <div>
          <button>정보 수정</button>
          <button onClick={() => navigate("/account/edit/password")}>비밀번호 수정</button>
          <button onClick={handleLogoutClick}>로그아웃</button>
        </div>
      </div>
    );
  }
