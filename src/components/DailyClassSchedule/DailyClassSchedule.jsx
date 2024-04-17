/** @jsxImportSource @emotion/react */
import * as s from "./style";

export default function DailyClassSchedule({ selectTimeOption, dailyScheduleData }) {
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
                row.push(<div>{selectTimeOption[i].label}</div>)
            } else { // body 데이터 기본값 "-" 설정
                row.push(<div>-</div>)
            }
        }
        table.push(row);
    }

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            for (let scheduleData of dailyScheduleData) {
                // scheduleData Start/End Date의 시간/분 추출
                let startHour = new Date(scheduleData.classScheduleStartDate).getHours();
                let startMinute = new Date(scheduleData.classScheduleStartDate).getMinutes();
                let startValue = ("0" + startHour).slice(-2) + ":" + ("0" + startMinute).slice(-2);

                let endHour = new Date(scheduleData.classScheduleEndDate).getHours();
                let endMinute = new Date(scheduleData.classScheduleEndDate).getMinutes();
                let endValue = ("0" + endHour).slice(-2) + ":" + ("0" + endMinute).slice(-2);

                // scheduleData 강의실 일치하는 행 찾기
                if (scheduleData.classLocationId === j) {
                    // 시작시간 ~ 종료시간 이내 행에 schedule 데이터 저장
                    if (startValue <= selectTimeOption[i].value && selectTimeOption[i].value < endValue) {
                        table[i][j] = (
                            <div style={{ backgroundColor: scheduleData.classLocationColor }}>
                                <div>{scheduleData.classScheduleTitle}</div>
                                <div>{scheduleData.classScheduleTeacher}</div>
                            </div>
                        )
                    }
                }
            }
        }
    }

    return (
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
                        {row.map((cell, colIndex) => (
                            <td key={`${rowIndex}-${colIndex}`} css={s.tableData}>
                                {cell}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}