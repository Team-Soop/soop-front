/** @jsxImportSource @emotion/react */
import * as s from "./style";
import React, { useEffect, useState } from 'react';
import Select from "react-select";
import { useReactSelect } from "../../../hooks/useReactSelect";
import { useQuery } from "react-query";
import { getUserCountRequest, searchUserRequest } from "../../../apis/api/userManagement";
import { useUserRegisterInput } from "../../../hooks/useUserRegisterInput";
import { useRecoilState } from "recoil";
import { selectedUserState } from "../../../atoms/adminSelectedUserAtom";
import { useSearchParams } from "react-router-dom";

function UserSearch() {
  const [ userList, setUserList ] = useState([]);
  const [ checkAll, setCheckAll ] = useState({
    checked: false,
    target: 1   // 1 => 전체 선택, 2 => 부분 선택
  });
  const [ selectedUser, setSelectedUser ] = useRecoilState(selectedUserState)
  const [ lastCheckUserId, setLastCheckUserId ] = useState(0);
  const [ searchParams, setSearchParams ] = useSearchParams();
  const searchCount = 10;


  const searchUserQuery = useQuery(
    ["searchUserQuery", searchParams.get("page")],
    async () => await searchUserRequest({
      page: searchParams.get("page"),
      count: searchCount,
      roleId: selectedUserAuthority.option.value,
      searchTypeId: selectedSearchType.option.value,
      searchText: searchText.value
    }),
    {
      refetchOnWindowFocus: false,
      onSuccess: response => {
        console.log(response);
        setUserList(() => response.data.map(user => {
          return {
            ...user,
            checked: false
          }
        }));
      }
    }
  )


  // const getUserCountQuery = useQuery(
  //   ["getUserCountQuery", searchUserQuery.data],
  //   async () => await getUserCountRequest({
  //     count: searchCount,
  //     roleId: selectedUserAuthority.option.value,
  //     searchTypeId: selectedSearchType.option.value,
  //     searchText: searchText.value
  //   }),
  //   {
  //     refetchOnWindowFocus: false,
  //     onSuccess: response => {
  //       console.log(response);
  //     }
  //   }
  // )

  console.log(searchParams.get("page"));

  const searchTypeOptions = [
    { value: 0, label: "전체" },
    { value: 1, label: "userId" },
    { value: 2, label: "아이디" },
    { value: 3, label: "닉네임" },
    { value: 4, label: "이름" },
    { value: 5, label: "이메일" },
    { value: 6, label: "가입일" }
  ]

  const Authority = [
    { value: 1, label: "임시사용자" },
    { value: 2, label: "사용자" },
    { value: 3, label: "수강생" },
    { value: 4, label: "관리자" },
    { value: 5, label: "이용정지자" },
  ]

  const selectStyle2 = {
    control: baseStyles => ({
      ...baseStyles,
      borderRadius: "0px",
      border: "none",
      borderRight: "1px solid #dbdbdb",
      outline: "none",
      boxShadow: "none"
    })
  }

  const selectStyle = {
    control: baseStyles => ({
      ...baseStyles,
      borderRadius: "0px",
      border: "none",
      outline: "none",
      boxShadow: "none"
    })
  }

  useEffect(() => {
    const findCount = userList.filter(user => user.checked === false).length;
    if (findCount === 0) {
      setCheckAll(() => {
        return {
          checked: true,
          target: 2
        }
      })
    } else {
      setCheckAll(() => {
        return {
          checked: false,
          target: 2
        }
      })
    }

  }, [userList])

  useEffect(() => {
    if (checkAll.target === 1) {
      setUserList(() =>
        userList.map(user => {
          return {
            ...user,
            checked: checkAll.checked
          }
        })
      );
    }
  }, [checkAll.checked])

  useEffect(() => {
    let lastSelectedUser = { ...selectedUser };
    let checkStatus = false;
    lastSelectedUser = userList.filter(user => user.userId === lastCheckUserId && user.checked === true)[0];
    console.log(lastSelectedUser);
    if (!!lastSelectedUser) {
      checkStatus = true;
    }

    if (!checkStatus) {
      setSelectedUser(() => ({
        userId: 0,
        userName: "",
        nickName: 0,
        name: "",
        email: "",
        roleNameKor: "",
        profileImgUrl: "",
        createDate: "",
      }))
    } else {
      setSelectedUser(() => lastSelectedUser);
    }
  }, [userList])


  const handleCheckAllChange = (e) => {
    setCheckAll(() => {
      return {
        checked: e.target.checked,
        target: 1
      }
    })
  }

  const handleCheckOnChange = (e) => {
    const userId = parseInt(e.target.value);
    setUserList(() =>
      userList.map(user => {
        if (user.userId === userId) {
          return {
            ...user,
            checked: e.target.checked
          }
        }
        return user;
      })
    )
    setLastCheckUserId(() => userId)
  }


  const searchSubmit = () => {
    setSearchParams({
      page: 1
    })
    searchUserQuery.refetch();
  }


  const selectedUserAuthority = useReactSelect({ value: 0, label: "전체" });
  const selectedSearchType = useReactSelect({ value: 0, label: "전체" });
  const searchText = useUserRegisterInput(searchSubmit);


  return (
    <div>

      <div css={s.searchBar}>
        <Select
          styles={selectStyle2}
          options={[{ value: 0, label: "전체" }, ...Authority]}
          defaultValue={selectedUserAuthority.defaultValue}
          value={selectedUserAuthority.option}
          onChange={selectedUserAuthority.handleOnChange}
        />
        <Select
          styles={selectStyle}
          options={searchTypeOptions}
          defaultValue={selectedSearchType.defaultValue}
          value={selectedSearchType.option}
          onChange={selectedSearchType.handleOnChange}
        />
        <input
          css={s.searchInput}
          type='text'
          value={searchText.value}
          onChange={searchText.handleOnChange}
          onKeyDown={searchText.handleOnKeyDown}
        />
        <button css={s.searchButton} onClick={() => searchSubmit()}>검색</button>
      </div>

      <div css={s.tableLayout}>
        <table css={s.table}>

          <thead>
            <tr css={s.theadTr}>
              <th><input type="checkbox" checked={checkAll.checked} onChange={handleCheckAllChange} /></th>
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
            {
              userList.map(
                user =>
                  <tr key={user.userId}>
                    <td><input
                      type="checkbox"
                      value={user.userId}
                      checked={user.checked}
                      onChange={handleCheckOnChange}
                    /></td>
                    <td>{user.userId}</td>
                    <td>{user.userName}</td>
                    <td>{user.nickName}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.roleNameKor}</td>
                    <td>{user.createDate}</td>
                  </tr>
              )
            }
          </tbody>

        </table>
      </div>
      {/* {
        !get
      }           */}


    </div>
  );
};

export default UserSearch;