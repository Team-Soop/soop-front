/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Select from "react-select";
import UserRegisterInput from "../../components/AdminUser/UserRegisterInput/UserRegisterInput";
import UserSearch from "../../components/AdminUser/UserSearch/UserSearch";



function UserManagement () {

  const selectStyle = {
    control: baseStyles => ({
        ...baseStyles,
        borderRadius: "0px",
        border: "none",
        outline: "none",
        boxShadow: "none"
    })
  }

  return (
    <div css={s.layout}>
      <div css={s.header}>
        <h1>유저관리</h1>
        <div>
          <button>삭제</button>
        </div>
      </div>
      <div css={s.topLayout}>

        <table css={s.registerTable}>
          <tbody>

            <tr>
              <th css={s.registerTh}>userId</th>
              <td>
                <UserRegisterInput
                
                
                />
              </td>
              <th css={s.registerTh}>아이디</th>
              <td>
                <UserRegisterInput
                
                
                />
              </td>
              <td rowSpan={5} css={s.preview}>
                <div css={s.imageBox}>
                  <img src={
                      // !imgUrl.value 
                      // ? 
                      "https://www.shutterstock.com/image-vector/no-image-available-picture-coming-600nw-2057829641.jpg"
                      // : imgUrl.value
                  } alt="" />
                </div>
              </td>
            </tr>

            <tr>
              <th >권한</th>    
              <td>
                <Select 
                  styles={selectStyle} 
                  // options={categoryOptions}
                  // value={categoryId.value}
                  // onKeyDown={categoryId.handleOnKeyDown}
                  // onChange={categoryId.handleOnChange}
                  // ref={inputRefs[3]}
                  // isDisabled={![1, 2].includes(actionStatus)}
                />
              </td>      
            </tr>

            <tr>
              <th css={s.registerTh}>닉네임</th>
              <td colSpan={3}>
                <UserRegisterInput
                
                
                />
              </td>
            </tr> 

            <tr>
              <th css={s.registerTh}>이름</th>
              <td>
                <UserRegisterInput
                
                
                />
              </td>
            </tr>

            <tr>
              <th css={s.registerTh}>이메일</th>    
              <td>
                <UserRegisterInput
                
                
                />
              </td>
            </tr>

            <tr>
              <th css={s.registerTh}>가입일</th>
              <td colSpan={3}>
                <UserRegisterInput
                
                
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