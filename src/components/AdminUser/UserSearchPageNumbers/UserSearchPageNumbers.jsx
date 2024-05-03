/** @jsxImportSource @emotion/react */
import { useSearchParams } from "react-router-dom";
import * as s from "./style";
import { useState } from "react";

function UserSearchPageNumbers() {
  const [ searchParams ] = useSearchParams();
  const page = parseInt(searchParams.get("page"));
  const [ numbers, setNumbers ] = useState([]);


  return (
    <div>
      
    </div>
  );
}

export default UserSearchPageNumbers;