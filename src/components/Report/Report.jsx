import React, { useMemo, useState } from 'react';
import ReactQuill from 'react-quill';
import { useQuillContent } from '../../hooks/quillContent';
import { useMutation } from 'react-query';
import { reportRequst } from '../../apis/api/report';
import { useParams } from 'react-router-dom';

function Report() {
  const [reportContent, reportChangeContent, reportContentMessage] = useQuillContent("quilContent");
  const [checkCategories, setcheckCategories] = useState([]);
  const param = useParams();

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ size: ['small', false, 'large', 'huge'] }],
          // [{ align: [] }],
          // ['bold', 'italic', 'underline', 'strike'],
          // [{ list: 'ordered' }, { list: 'bullet' }],
          // [{ color: [], }, { background: [] },],
        ],
      }
    }),
  );


  // 신고하기 뮤테이션
  const saveReport = useMutation({
    mutationKey: "saveReport",
    mutationFn: reportRequst,
    onSuccess: response => {
      alert("신고가 접수 되었습니다.");
    },
    onError: error => {
      if(error.response.data === "데이터 저장 오류.")
      alert("이미 신고된 게시물입니다")
    }
  })

  // 신고하기 버튼
  const requstClickReport = () => {
    saveReport.mutate({
      reportContent: reportContent,
      reportCategories: checkCategories,
      boardId: param.boardId,
      menuCategoryId: param.menuId
    })
  }

  
  // 신고 카테고리 
  const addchangeCategory = (categoryNumber, isChecked) => {
    if(isChecked) {
      setcheckCategories(prevCheckedCategory => [...prevCheckedCategory, categoryNumber]);
    } else{
      setcheckCategories(prevCheckedCategory => prevCheckedCategory.filter(category => category !== categoryNumber))
    }
  }

  return (
    <div>
      {/* 타이틀 */}
      <div>
        <h2>해당 게시물 신고하기</h2>
      </div>

      <div>
        <p>해당 게시물이 어떤 신고 사유가 있는지 가능한 자세하게 적어주세요.</p>
      </div>      

      {/* 신고 카테고리 */}
      <div>
        <div>
          <input type="checkbox" onChange={e => addchangeCategory(1, e.target.checked)}/>
          부정적인 게시물(해당 메뉴카테고리에 맞지 않는 게시물)
        </div>
        <div>
          <input type="checkbox" onChange={e => addchangeCategory(2, e.target.checked)}/>
          욕설
        </div>
        <div>
          <input type="checkbox" onChange={e => addchangeCategory(3, e.target.checked)}/>
          혐오 발언
        </div>
        <div>
          <input type="checkbox" onChange={e => addchangeCategory(4, e.target.checked)}/>
          불쾌감을 주거나 부적적한 닉네임 사용
        </div>
      </div>

      {/* 신고 내용 */}
      <div>
        <ReactQuill
          modules={modules}
          value={reportContent}
          style={{ width: "400px" }}
          onChange={reportChangeContent}
        />
        <div>
          {
            !!reportContentMessage &&
            <div>
              {reportContentMessage.text}
            </div>
          }
        </div>
      </div>  
      
      <button onClick={() => requstClickReport()}>신고하기</button>

        

    </div>
  );
}

export default Report;