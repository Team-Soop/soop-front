/** @jsxImportSource @emotion/react */
import * as s from "./style";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useMemo, useState } from "react";
import { useInput } from "../../hooks/useInput";
import Select from "react-select";
import { useMutation, useQueryClient } from "react-query";
import { addSchedule } from "../../apis/api/schedule";

export default function AddClassSchedule({viewScheduleDate, originScheduleDate}) {
    const [ classScheduleTitle, classScheduleTitleChange ] = useInput("");
    const [ classScheduleTeacher, classScheduleTeacherChange ] = useInput("");
    const [ classLocationId, classLocationIdChange ] = useInput("");
    const [ classScheduleStartDate, setClassScheduleStartDate ] = useState();
    const [ classScheduleEndDate, setClassScheduleEndDate ] = useState();
    const [ clickDayList ] = useState([]);
    const [ selectTimeOption ] = useState([]);

    const queryClient = useQueryClient();
    const ScheduleQueryData = queryClient.getQueryData("searchAllScheduleQuery").data

    useEffect(() => {
        console.log(viewScheduleDate)
    })

    const addScheduleMutation = useMutation({
        mutationKey: "addScheduleMutation",
        mutationFn: addSchedule,
        onSuccess: response => {
            alert("데이터 전송 완료")
            console.log(response)
        },
        onError: error => {
            alert("데이터 전송 실패")
            console.log(error)
        }
    })

    useMemo(() => {
        for(let i = 0; i < 24; i++) {
            for (let j = 0; j <= 1; j++) {
                let timeSet = {};
                timeSet.value = ('0' + i).slice(-2) + ":" + ('0' + (j * 30)).slice(-2);
                timeSet.label = ('0' + i).slice(-2) + "시" +  ('0' + (j * 30)).slice(-2) + "분";
                selectTimeOption.push(timeSet);
            };
        };
    }, [])

    const handleOnChangeStartTime = (e) => {
        console.log(e.value);
        setClassScheduleStartDate(e.value);
    }
    const handleOnChangeEndTime = (e) => {
        console.log(e.value);
        setClassScheduleEndDate(e.value);
    }
    const handleSubmitClick = () => {
        const finalDateList = [];

        for(let day of clickDayList) {
            finalDateList.push({
                classScheduleTitle: classScheduleTitle,
                classScheduleTeacher: classScheduleTeacher,
                classLocationId: classLocationId,
                classScheduleStartDate: day + "T" + classScheduleStartDate + ":00+09:00",
                classScheduleEndDate: day + "T" + classScheduleEndDate + ":00+09:00"
            })
        }
        console.log(finalDateList);
        addScheduleMutation.mutate(finalDateList);
    }

  return (
    <div>
        <div>
            <FullCalendar 
                selectable="true"
                plugins={[ dayGridPlugin, interactionPlugin ]}
                events={
                    viewScheduleDate
                }
                eventClick={(info) => {
                  
                }}
                select={(date) => {
                    if(clickDayList.indexOf(date.startStr) > -1) {
                        clickDayList.splice(clickDayList.indexOf(date.startStr), 1)
                    } else {
                        clickDayList.push(date.startStr)
                        clickDayList.sort();
                    }
                }}
            />
        </div>
        <div>
            <div> 타이틀
                <input type="text" onChange={classScheduleTitleChange} />
            </div>
            <div> 강사명
                <input type="text" onChange={classScheduleTeacherChange}/>
            </div>
            <div> 강의실
                <input type="text" onChange={classLocationIdChange}/>
            </div>
        </div>
        <div>
            <Select options={selectTimeOption} onChange={handleOnChangeStartTime} />
            <Select options={selectTimeOption} onChange={handleOnChangeEndTime} />

        </div>
        <div>
            <button onClick={handleSubmitClick}>확인</button>
        </div>
    </div>
  )
}
