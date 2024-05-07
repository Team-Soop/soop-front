/** @jsxImportSource @emotion/react */
import { Link, useSearchParams } from "react-router-dom";
import * as s from "./style";
import { useEffect, useState } from "react";

function UserSearchPageNumbers({userCount}) {
  const [ searchParams ] = useSearchParams();
  const page = parseInt(searchParams.get("page"));
  const [ numbers, setNumbers ] = useState([]);
  const maxPageNumber = userCount.maxPageNumber;

  useEffect(() => {
    const startPageNumber = page % 10 === 0 ? page - 9 : (page - (page % 10)) + 1;
    const endPageNumber = startPageNumber + 9 > maxPageNumber ? maxPageNumber : startPageNumber + 9;
    let pageNumbers = [];

    for(let i = startPageNumber; i <= endPageNumber; i++) {
      pageNumbers = [...pageNumbers, i];
    }

    setNumbers(() => pageNumbers);
  }, [page, userCount])


  return (
    <div css={s.layout}>
      <div css={s.pageNumbers}>
        {
          page !== 1 &&
          <Link
            css={s.pageButton(false)}
            to={`/admin/user/management?page=${page - 1}`}
          >
            &#60;
          </Link>
        }
        {
          numbers.map(number => 
            <Link key={number} css={s.pageButton(number === page)} to={`/admin/user/management?page=${number}`}>
              {number}
            </Link>
          )
        }
        {
          page !== maxPageNumber &&
          <Link
            css={s.pageButton(false)}
            to={`/admin/user/management?page=${page + 1}`}
          >
            &#62;
          </Link>
        }
      </div>
      <div css={s.pageCount}>
        <div css={s.page}>Page {page} of {maxPageNumber}</div>
        <div css={s.count}>Count: {userCount.totalCount}</div>
      </div>
    </div>
  );
}

export default UserSearchPageNumbers;