/** @jsxImportSource @emotion/react */
import * as s from "./style";

export default function DailyClassSchedule({selectTimeOption, dailyScheduleData}) {

  return (
    <div>
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
                            return (
                                <>
                                    {
                                        dailyScheduleData.map(
                                            data => {
                                                    let startHour = new Date(data.classScheduleStartDate).getHours();
                                                    let startMinute = new Date(data.classScheduleStartDate).getMinutes();
                                                    let startValue = ("0" + startHour).slice(-2) + ":" + ("0" + startMinute).slice(-2)

                                                return (
                                                    <tr css={s.tableLayout}>
                                                    <td>{time.label}</td>
                                                    {
                                                        time.value === startValue && data.classLocationId == 1
                                                        ? <td rowSpan={3}>{data.classScheduleTitle}<br/>{data.classScheduleTeacher}<br/>{data.classLocationName}</td>
                                                        : <td></td>
                                                    }
                                                    {
                                                        time.value === startValue && data.classLocationId == 2
                                                        ? <td>{data.classScheduleTitle}<br/>{data.classScheduleTeacher}<br/>{data.classLocationName}</td>
                                                        : <td></td>
                                                    }
                                                    {
                                                        time.value === startValue && data.classLocationId == 3
                                                        ? <td colSpan={3}>{data.classScheduleTitle}<br/>{data.classScheduleTeacher}<br/>{data.classLocationName}</td>
                                                        : <td></td>
                                                    }
                                                    {
                                                        time.value === startValue && data.classLocationId == 4
                                                        ? <td>{data.classScheduleTitle}<br/>{data.classScheduleTeacher}<br/>{data.classLocationName}</td>
                                                        : <td></td>
                                                    }
                                                    {
                                                        time.value === startValue && data.classLocationId == 5
                                                        ? <td>{data.classScheduleTitle}<br/>{data.classScheduleTeacher}<br/>{data.classLocationName}</td>
                                                        : <td></td>
                                                    }
                                                    </tr>
                                                )
                                            }
                                        )
                                    }
                                </>
                            )
                        }
                    )
                }
            </tbody>
        </table>
    </div>
  )
}
