/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Select from "react-select";
import UserRegisterInput from "../../components/AdminUser/UserRegisterInput/UserRegisterInput";
import UserSearch from "../../components/AdminUser/UserSearch/UserSearch";
import { useEffect, useState } from "react";
import { useUserRegisterInput } from "../../hooks/useUserRegisterInput";
import { selectedUserState } from "../../atoms/adminSelectedUserAtom";
import { useRecoilState } from "recoil";
import RightTopButton from "../../components/RightTopButton/RightTopButton";



function UserManagement () {

  const [ actionStatus, setActionStatus ] = useState(0);  
  // 0 = 선택, 1 = 수정, 2 = 삭제

  const Authority = [
    { value: 1, label: "임시회원" },
    { value: 2, label: "사용자" },
    { value: 3, label: "수강생" },
    { value: 4, label: "관리자" },
    { value: 5, label: "이용정지자" },
  ]
  
  const selectStyle = {
    control: baseStyles => ({
        ...baseStyles,
        borderRadius: "0px",
        border: "none",
        outline: "none",
        boxShadow: "none"
    })
  }

  const userId = useUserRegisterInput();
  const userName = useUserRegisterInput();
  const nickName = useUserRegisterInput();
  const name = useUserRegisterInput();
  const email = useUserRegisterInput();
  const roleNameKor =useUserRegisterInput();
  const profileImgUrl =useUserRegisterInput();
  const createDate = useUserRegisterInput();
  const [ selectUser ] = useRecoilState(selectedUserState);

  
  useEffect(() => {
    userId.setValue(() => selectUser.userId);
    userName.setValue(() => selectUser.userName);
    nickName.setValue(() => selectUser.nickName);
    name.setValue(() => selectUser.name)
    email.setValue(() => selectUser.email)
    profileImgUrl.setValue(() => selectUser.profileImgUrl)
    createDate.setValue(() => selectUser.createDate)

    let selectAuthority  = Authority.filter((authority) => authority.label === selectUser.roleNameKor)[0]
    roleNameKor.setValue(() => selectAuthority)

  }, [selectUser])

  const submit = () => {
    if(actionStatus === 1) {
        // registerBookMutation.mutate({
        //     isbn: isbn.value,
        //     bookTypeId: bookTypeId.value.value,
        //     categoryId: categoryId.value.value,
        //     bookName: bookName.value,
        //     authorName: authorName.value,
        //     publisherName: publisherName.value,
        //     coverImgUrl: imgUrl.value
        // });
    } else if(actionStatus === 2) {
        // setDelete(() => true);
    }

    cancel();
}

const cancel = () => {
    userId.setValue(() => 0);
    userName.setValue(() => "");
    nickName.setValue(() => "");
    name.setValue(() => "");
    email.setValue(() => "");
    profileImgUrl.setValue(() => "");
    createDate.setValue(() => "");
    roleNameKor.setValue(() => "");

    setActionStatus(() => 0);
}

  


  return (
    <div css={s.layout}>
      <div css={s.header}>
        <h1>유저관리</h1>
        <div>
          {
            actionStatus === 0
            ?
            <>
              <RightTopButton onClick={() => setActionStatus(1)}>수정</RightTopButton>
              <RightTopButton onClick={() => setActionStatus(2)}>삭제</RightTopButton>
            </>
            :
            <>
              <RightTopButton>확인</RightTopButton>
              <RightTopButton onClick={cancel}>취소</RightTopButton>
            </>


          }
        </div>
      </div>
      <div css={s.topLayout}>

        <table css={s.registerTable}>
          <tbody>

            <tr>
              <th css={s.registerTh}>userId</th>
              <td>
                <UserRegisterInput
                  value={userId.value}
                  isDisabled={true}
                />
              </td>
              <th css={s.registerTh}>아이디</th>
              <td>
                <UserRegisterInput
                  value={userName.value}
                  isDisabled={true}
                />
              </td>
              <td rowSpan={5} css={s.preview}>
                <div css={s.imageBox}>
                  <img src={
                      !profileImgUrl.value 
                      ? 
                      "https://media.istockphoto.com/id/1459664492/ko/%EB%B2%A1%ED%84%B0/%EA%B8%B0%EB%B3%B8-%EC%95%84%EB%B0%94%ED%83%80-%ED%94%84%EB%A1%9C%ED%95%84-%EC%82%AC%EC%9A%A9%EC%9E%90-%ED%94%84%EB%A1%9C%ED%95%84-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%ED%94%84%EB%A1%9C%ED%95%84-%EC%82%AC%EC%A7%84-%EC%84%B8%EB%A1%9C-%EA%B8%B0%ED%98%B8%EC%9E%85%EB%8B%88%EB%8B%A4-%EC%82%AC%EC%9A%A9%EC%9E%90-%EA%B5%AC%EC%84%B1%EC%9B%90-%ED%94%8C%EB%9E%AB-%EC%8A%A4%ED%83%80%EC%9D%BC%EC%9D%98-%EC%82%AC%EB%9E%8C-%EC%95%84%EC%9D%B4%EC%BD%98%EC%9E%85%EB%8B%88%EB%8B%A4-%EC%95%84%EB%B0%94%ED%83%80-%EC%82%AC%EC%A7%84-%EC%8B%A4%EB%A3%A8%EC%97%A3-%EB%B2%A1%ED%84%B0-%EB%94%94%EC%9E%90%EC%9D%B8%EA%B3%BC-%EA%B7%B8%EB%A6%BC%EC%9D%B4-%EC%9E%88%EB%8A%94-%EC%9B%90%ED%98%95.jpg?s=170667a&w=0&k=20&c=lIJIuHGbMWoHznJrPo3T0gI3laO0bd_C-84TqmQaNoM="
                      : profileImgUrl.value
                  } alt="" />
                </div>
              </td>
            </tr>

            <tr>
              <th >권한</th>    
              <td>
                <Select 
                  styles={selectStyle} 
                  options={Authority}
                  value={roleNameKor.value}
                  onChange={roleNameKor.handleOnChange}
                  isDisabled={![1, 2].includes(actionStatus)}
                />
              </td>      
            </tr>

            <tr>
              <th css={s.registerTh}>닉네임</th>
              <td colSpan={3}>
                <UserRegisterInput
                 value={nickName.value}
                
                />
              </td>
            </tr> 

            <tr>
              <th css={s.registerTh}>이름</th>
              <td>
                <UserRegisterInput
                  value={name.value}
                
                />
              </td>
            </tr>

            <tr>
              <th css={s.registerTh}>이메일</th>    
              <td>
                <UserRegisterInput
                  value={email.value}
                
                />
              </td>
            </tr>

            <tr>
              <th css={s.registerTh}>가입일</th>
              <td colSpan={3}>
                <UserRegisterInput
                  value={createDate.value}
                
                />
              </td>    
            </tr>

          </tbody>
        </table>
      </div>





      <UserSearch/>
    </div>
  );
};



export default UserManagement;