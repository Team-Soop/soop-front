/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useQuery } from 'react-query'
import Select from "react-select";
import ReportComent from "../ReportComent/ReportComent";
import { useState } from "react";
import { useReactSelect } from "../../../hooks/useReactSelect";
import { searchCompletedReport } from "../../../apis/api/report";


function ReportCompleted () {
  const [reportCompletedList, setReportCompletedList] = useState([]);
  const [isContentOpen, setIsContentOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState({
    category: '',
    content: '',
    boardId: '',
    menuCategoryId:''
  });

  const selectedPageName = useReactSelect({value: 0, label: "게시판 전체"})

  const selectOptions = [
    {
      value: 0,
      label: "게시판 전체"
    },
    {
      value: 1,
      label: "자유게시판"
    },
    {
      value: 2,
      label: "스터디게시판"
    },
    {
      value: 3,
      label: "점심추천게시판"
    },
  ]

  const searchReportcompleted = useQuery(
    ["searchReportcompleted", selectedPageName.option.value],
    async () => await searchCompletedReport({
      menuCategoryId:selectedPageName.option.value
    }),
    {
      refetchOnWindowFocus: false,
      onSuccess: response => {
        setReportCompletedList(() => response.data.map(response => {
          return response
        }))
      }
    }

  )

  // console.log(isContentOpen);

  const openContent = (userId, reportCategories, reportContent, boardId, menuCategoryId) => {
    setIsContentOpen(!isContentOpen)
    setSelectedReport({
      userId: userId,
      category: reportCategories,
      content: reportContent,
      boardId: boardId,
      menuCategoryId: menuCategoryId,
      searchReportQuery: searchReportcompleted
    })
  }


  return (
    <div>
      <h1>처리 완료된 Rport</h1>
      <div>
        <Select
          options={selectOptions}
          defaultValue={selectedPageName.defaultValue}
          value={selectedPageName.option}
          onChange={selectedPageName.handleOnChange}
        />
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
              <th>삭제 신고처리되 날짜</th>
            </tr>
          </thead>
          <tbody>
            {
              reportCompletedList.map(report => 
                <tr key={report.reportId}>
                  <td>{report.reportId}</td>
                  <td>{report.menuCategoryId}</td>
                  <td>{report.boardId}</td>
                  <td>
                    <button onClick={() => openContent(report.userId, report.reportCategories, report.reportContent, report.boardId, report.menuCategoryId)}>
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
              userId={selectedReport.userId}
              category={selectedReport.category}
              content={selectedReport.content}
              boardId={selectedReport.boardId}
              menuCategoryId={selectedReport.menuCategoryId}
              searchReportQuery={selectedReport.searchReportQuery}
              setIsContentOpen={setIsContentOpen}
            />
          :
            <></>
        }
      </div>

    </div>
  )
}

export default ReportCompleted
