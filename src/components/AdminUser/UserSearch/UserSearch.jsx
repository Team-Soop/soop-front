/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React from 'react';
import Select from "react-select";
import { useReactSelect } from "../../../hooks/useReactSelect";

function UserSearch() {

  const searchTypeOptions = [
   {value: 0, label: "전체"},
   {value: 1, label: "userId"},
   {value: 2, label: "아이디"},
   {value: 3, label: "닉네임"},
   {value: 4, label: "이름"},
   {value: 5, label: "이메일"},
   {value: 6, label: "가입일"}
  ]

  const Authority = [
   {value: 1, label: "임시사용자"},
   {value: 2, label: "사용자"},
   {value: 3, label: "수강생"},
   {value: 4, label: "관리자"},
   {value: 5, label: "이용정지자"},

  ]

  const selectedUserAuthority = useReactSelect({value: 0, label:"전체"});


  return (
    <div>

      <div>
        <Select 
          options={[{value: 0, label: "전체"}, ...Authority]}
          defaultValue={selectedUserAuthority.defaultValue}
          value={selectedUserAuthority.option}
          onChange={selectedUserAuthority.handleOnChange}
        />
        <Select 
          options={searchTypeOptions}
        />
        <input
          type='text'

        />
      </div>

      <div css={s.tableLayout}>
        <table css={s.table}>

          <thead>
            <tr css={s.theadTr}>
              <th><input type="checkbox" /></th>
              <th>userId</th>
              <th>아이디</th>
              <th>닉네임</th>
              <th>이름</th>
              <th>이메일</th>
              <th>권한</th>
              <th>가입일</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td><input type="checkbox" /></td>
              <td>d</td>
              <td>d</td>
              <td>d</td>
              <td>d</td>
              <td>d</td>
              <td>d</td>
              <td>d</td>
            </tr>
          </tbody>

        </table>
      </div>



    </div>
  );
};

export default UserSearch;