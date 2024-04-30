import DOMPurify from 'dompurify';
import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import { userBanRequest } from '../../../apis/api/userManagement';
import { boardDelete, deleteBoard } from '../../../apis/api/boardManagement';
import { useEffect } from 'react';
import { alarmReportComplete } from '../../../apis/api/alarm';
import { alarmMessage } from '../../../constants/alarmMessage';

function ReportComent({ userId, category, content, boardId, menuCategoryId, searchReportQuery, setIsContentOpen }) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  const sanitizer = DOMPurify.sanitize;
  const navigate = useNavigate();
  const alarmMessageEntries = Object.entries(alarmMessage);

  // 유저 정지 뮤텐트
  const banUser = useMutation({
    mutationKey: "banUser",
    mutationFn: userBanRequest,
    onSuccess: response => {
      alert("해당 유저가 정상적으로 임시정지 처리 되었습니다.")
    }
  })

  // 게시글 삭제 뮤텐트
  const deleteBoard = useMutation({
    mutationKey: "deleteBoard",
    mutationFn: boardDelete,
    onSuccess: response => {
      alert("해당 게시물이 삭제 처리 되었습니다.")
      searchReportQuery.refetch()
      setIsContentOpen(false);
    }
  })

  // 삭제 알림 메세지 보내기
  const sendUserAlarm = useMutation({
    mutationKey: "sendUserAlarm",
    mutationFn: alarmReportComplete,
    onSuccess: response => {
      console.log("알람보냈음");
      console.log(response);
    }
  })
  

  // 유저 정지 클릭 이벤트
  const addClickbanUser = () => {
    if (window.confirm("해당 유저를 정시 시키시겠습니까?")) {
      banUser.mutate(userId);
    }
    return;
  }

  // 보드 삭제 클릭 이벤트
  const deleteClickBoard = () => {
    if (window.confirm("해당 게시물을 삭제 하시겠습니까?")) {
      // deleteBoard.mutate({
      //   menuCategoryName: menuCategoryId,
      //   boardId: boardId
      // })
      sendUserAlarm.mutate({
          toUserId: userId,
          fromUserId: principalData.data.userId,
          content: alarmMessageEntries[0][1].text
      })
    }
  }

  console.log();

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

      
      
      {
        searchReportQuery.data.config.url !== "/report/search" ? 

        <div>
          <button onClick={() => addClickbanUser()}>
            유저 정지시키기
          </button>
        </div>
        : 
        <div>
          <div>
            <button onClick={() => navigate(`/lunch/Detail?lunchId=${boardId}`)}>
              해당 게시물
            </button>
          </div>
          <div>
            <button onClick={() => deleteClickBoard()}>
              게시물 삭제하기
            </button>
          </div>
        </div>
      }


    </div>
  );
}

export default ReportComent;