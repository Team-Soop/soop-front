/** @jsxImportSource @emotion/react */
import { useEffect, useMemo } from "react";
import * as s from "./style";

export default function DailyClassSchedule({selectTimeOption, dailyScheduleData}) {
    
    const numRows = selectTimeOption.length;
    const numCols = 6; // 열의 개수를 6으로 변경
    const table = [];

    // useEffect(() => {
        for (let i = 0; i < numRows; i++) {
            const row = [];
            const timeValue = selectTimeOption[i].value; // 현재 시간값
            for (let j = 0; j < numCols; j++) {
                // 첫 번째 열에는 시간 레이블 삽입
                if (j === 0) {
                    row.push(selectTimeOption[i].label);
                } else {
                    // dailyScheduleData에서 해당 시간에 해당하는 데이터 찾기
                    const scheduleData = dailyScheduleData.find(classSchedule => {
                        // classScheduleStartDate를 "02:00" 형식으로 변환하여 비교
                        const startHour = new Date(classSchedule.classScheduleStartDate).getHours();
                        const startMinute = new Date(classSchedule.classScheduleStartDate).getMinutes();
                        const startValue = ("0" + startHour).slice(-2) + ":" + ("0" + startMinute).slice(-2);
                        return startValue === timeValue;
                    });
                    console.log(scheduleData)
                    if (scheduleData) {
                        // 해당 시간에 해당하는 데이터가 있을 경우 시작 시간과 종료 시간 삽입
                        let startHour = new Date(scheduleData.classScheduleStartDate).getHours();
                        let startMinute = new Date(scheduleData.classScheduleStartDate).getMinutes();
                        let startValue = ("0" + startHour).slice(-2) + ":" + ("0" + startMinute).slice(-2);

                        let endHour = new Date(scheduleData.classScheduleEndDate).getHours();
                        let endMinute = new Date(scheduleData.classScheduleEndDate).getMinutes();
                        let endValue = ("0" + endHour).slice(-2) + ":" + ("0" + endMinute).slice(-2);

                        // 시작 시간과 종료 시간을 삽입
                        if (scheduleData.classLocationId === j) {
                            row.push(endValue);
                        } else {
                            row.push("1");
                        }
                    } else {
                        // 해당 시간에 해당하는 데이터가 없을 경우 "-" 삽입
                        row.push("2");
                    }
                }
            }
            table.push(row);
        }
    // }, [dailyScheduleData])

    // 2차원 배열 출력
    return (
        <table>
            <thead>
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
                    <tr key={rowIndex}>
                        {row.map((cell, colIndex) => (
                            <td key={`${rowIndex}-${colIndex}`}>{cell}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
}