/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useState } from 'react';
import { useQuery } from 'react-query';
import { searchAllReport } from '../../../apis/api/report';
import ReportComent from "../ReportComent/ReportComent";


function AdminReportSearch(props) {
  const [reportList, setReportList] = useState([]);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState({
    category: '',
    content: '',
    boardId: ''
  });

  const searchAllReportQuery = useQuery(["searchAllReportQuery"],
    searchAllReport,
    {
      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: response => {
        console.log(response);
        setReportList(() => response.data.map(response => {
          return response
        }))
      },
      onError: error => {
        console.log(error);
      }
    }
  )

  // 신고 내용 컴포넌트 opne 버튼
  const openContent = (reportCategories, reportContent, boardId) => {
    setIsContentOpen(!isContentOpen)
    setSelectedReport({
      category: reportCategories,
      content: reportContent,
      boardId: boardId
    })
  }

  console.log(reportList);

  return (
    <div>
      <div>

      </div>

      <div css={s.tableLayout}>
        <table css={s.table}>
          <thead>
            <tr css={s.theadTr}>
              <th>ID</th>
              <th>게시판</th>
              <th>게시물ID</th>
              <th>신고내용</th>
              <th>신고한유저ID</th>
              <th>신고날짜</th>
            </tr>
          </thead>
          <tbody>
            {
              reportList.map(report => 
                <tr key={report.reportId}>
                  <td>{report.reportId}</td>
                  <td>{report.menuCategoryId}</td>
                  <td>{report.boardId}</td>
                  <td>
                    <button onClick={() => openContent(report.reportCategories, report.reportContent, report.boardId)}>
                      신고내용 보기
                    </button>
                  </td>
                  <td>{report.userId}</td>
                  <td>{report.createDate}</td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>

      <div>
        {
          isContentOpen ? 
            <ReportComent
              category={selectedReport.category}
              content={selectedReport.content}
              boardId={selectedReport.boardId}
            />
          :
            <></>
        }
      </div>

    </div>
  );
}

export default AdminReportSearch;