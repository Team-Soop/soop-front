import DOMPurify from 'dompurify';
import React from 'react';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { userBanRequest } from '../../../apis/api/userManagement';
import { boardDelete, deleteBoard } from '../../../apis/api/boardManagement';

function ReportComent({ userId, category, content, boardId,  menuCategoryId}) {
  const sanitizer = DOMPurify.sanitize;
  const navigate = useNavigate();

  // 유저 정지 뮤텐트
  const banUser = useMutation({
    mutationKey: "banUser",
    mutationFn: userBanRequest,
    onSuccess: response => {
      alert("해당 유저가 정상적으로 정지 처리 되었습니다.")
    }
  })

  // 게시글 삭제 뮤텐트
  const deleteBoard = useMutation({
    mutationKey: "deleteBoard",
    mutationFn: boardDelete,
    onSuccess: response => {
      console.log(response);
    }
  })


  // 유저 정지 클릭 이벤트
  const addClickbanUser = () => {
    if(window.confirm("해당 유저를 정시 시키시겠습니까?")) {
      banUser.mutate(userId);
    }
    return;
  }

  // 보드 삭제 클릭 이벤트
  const deleteClickBoard = () => {
    if(window.confirm("해당 게시물을 삭제 하시겠습니까?")) {
      deleteBoard.mutate({
        menuCategoryName: menuCategoryId,
        boardId: boardId
      })
    }
  }


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
        <button onClick={() => addClickbanUser()}>
          유저 정지시키기
        </button>
      </div>
      <div>
        <button onClick={() => deleteClickBoard()}>
          게시물 삭제하기
        </button>
      </div>
    </div>
  );
}

export default ReportComent;