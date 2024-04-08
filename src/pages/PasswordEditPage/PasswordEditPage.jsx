import { useInput } from '../../hooks/useInput';
import { useAuthCheck } from '../../hooks/useAuthCheck';
import { useMutation } from 'react-query';
import { editPasswordRequest } from '../../apis/api/editPassword';
import AuthPageInput from '../../components/AuthPageInput/AuthPageInput';
import { useEffect, useState } from 'react';

function PasswordEditPage(props) {
  useAuthCheck();
  const [ oldPassword, handleOldPassword, oldMessage, setOld, setOldMessage ] = useInput("oldPassword");
  const [ newPassword, handleNewPassword, newMessage, setNew, setNewMessage ] = useInput("newPassword");
  const [ newPasswordCheck, handleNewPasswordCheck, newCheckMessage, setNewCheck, setNewCheckMessage ] = useInput("newPasswordCheck");
  const [checkPasswordMessage, setCheckPasswordMessage] = useState(null);

  useEffect(() => {
    if (!newPasswordCheck || !newPassword) {
      setCheckPasswordMessage(() => null);
      return;
    }

    if (newPasswordCheck === newPassword) {
      setCheckPasswordMessage(() => {
        return {
          type: "success",
          text: ""
        }
      })
    } else {
      setCheckPasswordMessage(() => {
        return {
          type: "error",
          text: "비밀번호가 일치하지 않습니다."
        }
      })
    }
  }, [newPasswordCheck, newPassword]);


  const editPasswordMutation = useMutation({
    mutationKey: "editPasswordMutation",
    mutationFn: editPasswordRequest,
    onSuccess: response => {
        alert("비밀번호를 정상적으로 변경하였습니다.\n다시 로그인 하세요.");
        localStorage.removeItem("AccessToken");
        window.location.replace("/auth/signin");
    },
    onError: error => {
        if(error.response.status === 400) {
            const errorMap = error.response.data;
            const errorEntries = Object.entries(errorMap);
            setOldMessage(null);
            setNewMessage(null);
            setNewCheckMessage(null);
            for(let [ k, v ] of errorEntries) {
                const message = {
                    type: "error",
                    text: v
                }
                if(k === "oldPassword") {
                    setOldMessage(() => message);
                }
                if(k === "newPassword") {
                    setNewMessage(() => message);
                }
                if(k === "newPasswordCheck") {
                    setNewCheckMessage(() => message);
                }
            }
        }
    }
  });

  const handleEditSubmitClick = () => {
    const checkFlags = [
      oldMessage?.type,
      newMessage?.type,
      checkPasswordMessage?.type
    ];

    console.log(oldMessage);
    if (checkFlags.includes("error") || checkFlags.includes(undefined) || checkFlags.includes(null)) {
      alert("가입 정보를 다시 확인하세요.");
      return;
    }


    editPasswordMutation.mutate({
        oldPassword,
        newPassword,
        newPasswordCheck
    });
  } 


  return (
    <div>
      <h1>비밀번호 변경</h1>
      <AuthPageInput type={"password"} value={oldPassword} onChange={handleOldPassword} placeholder={"현재 비밀번호를 입력하세요."} message={oldMessage} />
      <AuthPageInput type={"password"} value={newPassword} onChange={handleNewPassword} placeholder={"새로운 비밀번호를 입력하세요."} message={newMessage} />
      <AuthPageInput type={"password"} value={newPasswordCheck} onChange={handleNewPasswordCheck} placeholder={"새로운 비밀번호를 확인"} message={checkPasswordMessage} />
      <button onClick={handleEditSubmitClick}>비밀번호 변경하기</button>
    </div>
  );
}

export default PasswordEditPage;