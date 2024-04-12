/** @jsxImportSource @emotion/react */
import { useEffect } from "react";
import * as s from "./style";

export default function DailyClassSchedule({originScheduleData, selectTimeOption, selectDay}) {
    useEffect(() => {
        console.log(originScheduleData)
        console.log(selectDay)
    })

  return (
    <div>
        <div>
            헤더
        </div>
        <div>
            클래스
        </div>
        <div>
            데이터
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
            <tbody css={s.tbody}>
                {
                    selectTimeOption.map(
                        time => {
                            const rowSpans = [1, 1, 1, 1, 1];

                            originScheduleData.forEach(data => {
                                console.log(new Date(data.classScheduleStartDate).getHours())
                                console.log(new Date(data.classScheduleStartDate).getMinutes())
                            })
                            return (
                                <tr>
                                    <td>{time.label}</td>
                                    <td rowSpan={rowSpans[0]}>1</td>
                                    <td rowSpan={rowSpans[1]}>1</td>
                                    <td rowSpan={rowSpans[2]}>1</td>
                                    <td rowSpan={rowSpans[3]}>1</td>
                                    <td rowSpan={rowSpans[4]}>1</td>
                                </tr>
                            )
                        }
                    )
                }
            </tbody>

            
        </table>
    </div>
  )
}
