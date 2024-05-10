/** @jsxImportSource @emotion/react */
import * as s from "./style";

import Modal from "react-modal"

export default function DailyClassSchedule({ isOpen, isClose, selectDay, selectTimeOption, dailyScheduleData }) {
    // 테이블의 열과 행 수를 정의합니다.
    const numCols = 6;
    const numRows = selectTimeOption.length;
    // JSX 요소를 저장할 빈 테이블 배열을 초기화합니다.
    const table = [];

    // Table 기본값 구성 (6x47 크기)
    for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < numCols; j++) {
            if (j === 0) { // 첫번째 행 timeOption 지정 (HH시 MM분 ~ HH시 MM분)
                row.push({elements: <div>{selectTimeOption[i].label}</div>})
            } else { // body 데이터 기본값 "-" 설정
                row.push({elements: <div></div>})
            }
        }
        table.push(row);
    }

    // for (let i = 0; i < numRows; i++) {
    //     for (let j = 0; j < numCols; j++) {
    //         for (let scheduleData of dailyScheduleData) {
    //             // scheduleData Start/End Date의 시간/분 추출
    //             let startDate = new Date(scheduleData.classScheduleStartDate)
    //             let startHour = new Date(scheduleData.classScheduleStartDate).getHours();
    //             let startMinute = new Date(scheduleData.classScheduleStartDate).getMinutes();
    //             let startValue = ("0" + startHour).slice(-2) + ":" + ("0" + startMinute).slice(-2);

    //             let endDate = new Date(scheduleData.classScheduleEndDate)
    //             let endHour = new Date(scheduleData.classScheduleEndDate).getHours();
    //             let endMinute = new Date(scheduleData.classScheduleEndDate).getMinutes();
    //             let endValue = ("0" + endHour).slice(-2) + ":" + ("0" + endMinute).slice(-2);

    //             // console.log(scheduleData.classScheduleStartDate)
    //             // console.log(scheduleData.classScheduleStartDate)
                

    //             // scheduleData 강의실 일치하는 행 찾기
    //             if (scheduleData.classLocationId === j) {
    //                 let count = 0;
    //                 // 시작시간 ~ 종료시간 이내 행에 schedule 데이터 저장
    //                 if (startValue <= selectTimeOption[i].value && selectTimeOption[i].value < endValue) {
    //                     let span = 0;
                        
    //                     while(startDate < endDate) {
    //                         span += 1;
    //                         startDate.setMinutes(startDate.getMinutes() + 30);
    //                     }
                        
    //                     table[i][j] = {
    //                         id: count,
    //                         rowSpan: span,
    //                         elements: 
    //                         <div style={{ backgroundColor: scheduleData.classLocationColor }}>
    //                             <div>{scheduleData.classScheduleTitle}</div>
    //                             <div>{scheduleData.classScheduleTeacher}</div>
    //                         </div>
    //                     }

    //                     count += 1;
    //                 }
    //             }
    //         }
    //     }
    //     console.log(table)
    // }

    for(let scheduleData of dailyScheduleData) {

        // 강의 시작 time의 element만 출력하기 위한 count 변수 -> id: count = 0번만 table에 출력 (j 반복마다 1씩 증가)
        let count = 0;

        let startDate = new Date(scheduleData.classScheduleStartDate)
        let startHour = new Date(scheduleData.classScheduleStartDate).getHours();
        let startMinute = new Date(scheduleData.classScheduleStartDate).getMinutes();
        let startValue = ("0" + startHour).slice(-2) + ":" + ("0" + startMinute).slice(-2);

        let endDate = new Date(scheduleData.classScheduleEndDate)
        let endHour = new Date(scheduleData.classScheduleEndDate).getHours();
        let endMinute = new Date(scheduleData.classScheduleEndDate).getMinutes();
        let endValue = ("0" + endHour).slice(-2) + ":" + ("0" + endMinute).slice(-2);

        for(let i = 0; i < numRows; i++) {
            for(let j = 0; j < numCols; j++) {
                // scheduleData 강의실 일치하는 열 찾기
                if (scheduleData.classLocationId === j) {
                    // 시작시간 ~ 종료시간 이내 행에 schedule 데이터 저장
                    if (startValue <= selectTimeOption[i].value && selectTimeOption[i].value < endValue) {
                        let span = 0;
                        // 30분 단위의 스케줄 갯수 체크 -> Span 설정
                        while(startDate < endDate) {
                            span += 1;
                            startDate.setMinutes(startDate.getMinutes() + 30);
                        }
                        
                        table[i][j] = {
                            id: count,
                            rowSpan: span,
                            elements: 
                            <div style={{ backgroundColor: scheduleData.classLocationColor }}>
                                <div css={s.scheduleTitle}>{scheduleData.classScheduleTitle}</div>
                                <div css={s.scheduleTeacher}>{scheduleData.classScheduleTeacher}</div>
                            </div>
                        }

                    count += 1;
                    }
                }
            }
        }
    }

    return (
        <>
        <Modal isOpen={isOpen} css={s.background}>
            <div css={s.layout}>
                <div css={s.header}>
                    <div css={s.todayTitle}>{selectDay}</div>
                    <button onClick={isClose}>닫기</button>
                </div>
                <table css={s.table}>
                    <thead css={s.thead}>
                        <tr>
                            <th>시간</th>
                            <th>A 강의실</th>
                            <th>B 강의실</th>
                            <th>C 강의실</th>
                            <th>D 강의실</th>
                            <th>E 강의실</th>
                        </tr>
                    </thead>
                    <tbody>
                        {table.map((row, rowIndex) => (
                            <tr key={rowIndex} css={s.bodyLayout}>
                                {row.map((cell, colIndex) => {
                                    return(
                                    cell.id > 0 
                                    ?
                                    null
                                    : 
                                    <td key={`${rowIndex}-${colIndex}`} css={s.tableData} rowSpan={cell.rowSpan}>
                                    {cell.elements}
                                    </td>
                                )})}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Modal>
        </>
    );
}