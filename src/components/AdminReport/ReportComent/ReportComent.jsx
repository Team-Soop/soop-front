import DOMPurify from 'dompurify';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";

function ReportComent({ category, content, boardId }) {
  const sanitizer = DOMPurify.sanitize;
  const navigate = useNavigate();


  return (
    <div>
      <div>
        <input type="checkbox"
          readOnly
          checked={category.includes(1)}
        />
        부정적인 게시물(해당 메뉴카테고리에 맞지 않는 게시물)
      </div>
      <div>
        <input type="checkbox"
          readOnly
          checked={category.includes(2)}
        />
        욕설
      </div>
      <div>
        <input type="checkbox"
          readOnly
          checked={category.includes(3)}
        />
        혐오 발언
      </div>
      <div>
        <input type="checkbox"
          readOnly
          checked={category.includes(4)}
        />
        불쾌감을 주거나 부적적한 닉네임 사용
      </div>

      <div dangerouslySetInnerHTML={{ __html: sanitizer(content) }}></div>

      <div>
        <button onClick={() => navigate(`/lunch/Detail?lunchId=${boardId}`)}>
          해당 게시물
        </button>
      </div>
      <div>
        {/* <button  onclick={() => `window.open(``)"}>
          네이버
        </button> */}


      </div>

      <div>
        <button>
          유저 밴하기
        </button>
      </div>
      <div>
        <button>
          게시물 삭제하기
        </button>
      </div>
    </div>
  );
}

export default ReportComent;