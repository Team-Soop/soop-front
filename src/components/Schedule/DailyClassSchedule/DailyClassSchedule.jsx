/** @jsxImportSource @emotion/react */
import * as s from "./style";

export default function DailyClassSchedule({ selectTimeOption, dailyScheduleData }) {
    const numCols = 6;
    const numRows = selectTimeOption.length;
    const table = [];

    for (let i = 0; i < numRows; i++) {
        const row = [];
        for (let j = 0; j < numCols; j++) {
            if (j === 0) {
                row.push(<div>{selectTimeOption[i].label}</div>)
            } else {
                row.push(<div>-</div>)
            }
        }
        table.push(row);
    }

    for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
            for (let scheduleData of dailyScheduleData) {
                let startHour = new Date(scheduleData.classScheduleStartDate).getHours();
                let startMinute = new Date(scheduleData.classScheduleStartDate).getMinutes();
                let startValue = ("0" + startHour).slice(-2) + ":" + ("0" + startMinute).slice(-2);

                let endHour = new Date(scheduleData.classScheduleEndDate).getHours();
                let endMinute = new Date(scheduleData.classScheduleEndDate).getMinutes();
                let endValue = ("0" + endHour).slice(-2) + ":" + ("0" + endMinute).slice(-2);
                console.log(selectTimeOption[i].value)
                console.log(startValue)
                console.log(endValue)
                if (scheduleData.classLocationId === j) {
                    let count = 0;
                    if (startValue <= selectTimeOption[i].value && selectTimeOption[i].value < endValue) {
                        table[i][j] = {
                            id: 0,
                            rowSpan: 1,
                            elements: 
                            <div style={{ backgroundColor: scheduleData.classLocationColor }}>
                                <div>{scheduleData.classScheduleTitle}</div>
                                <div>{scheduleData.classScheduleTeacher}</div>
                            </div>
                        }
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
                                {cell.elements}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}