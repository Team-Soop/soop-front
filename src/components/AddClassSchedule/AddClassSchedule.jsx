/** @jsxImportSource @emotion/react */
import * as s from "./style";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useMemo, useRef, useState } from "react";
import { useInput } from "../../hooks/useInput";
import Select from "react-select";
import { useMutation, useQueryClient } from "react-query";
import { addSchedule, updateSchedule } from "../../apis/api/schedule";
import { set } from "firebase/database";

export default function AddClassSchedule({ viewScheduleDate, originScheduleDate }) {
    const [ classScheduleId, setClassScheduleId ] = useState(0);
    const [ classScheduleTitle, classScheduleTitleChange, unusedTitle, setClassScheduleTitle ] = useInput("");
    const [ classScheduleTeacher, classScheduleTeacherChange, unusedTeacher, setClassScheduleTeacher ] = useInput("");
    const [ classLocationId, classLocationIdChange, unusedLocationId, setClassLocationId ] = useInput("");
    const [ classScheduleStartDate, setClassScheduleStartDate ] = useState("");
    const [ classScheduleEndDate, setClassScheduleEndDate ] = useState("");
    const [ selectTimeOption ] = useState([]);
    const [ startDateOption, setStartDateOption ] = useState({})
    const [ endDateOption, setEndDateOption] = useState({});
    const [ clickDayList ] = useState([]);
    const [ updateDay, setUpdateDay ] = useState("");
    const scheduleRef = useRef(0);

    useEffect(() => {
        console.log(startDateOption.lable);
        console.log(originScheduleDate);
    }, [])

    useMemo(() => {
        for(let i = 0; i < 24; i++) {
            for (let j = 0; j <= 1; j++) {
                let timeSet = {};
                timeSet.value = ('0' + i).slice(-2) + ":" + ('0' + (j * 30)).slice(-2);
                timeSet.label = ('0' + i).slice(-2) + "시 " +  ('0' + (j * 30)).slice(-2) + "분";
                selectTimeOption.push(timeSet);
            };
        };
    }, [])
    
    const addScheduleMutation = useMutation({
        mutationKey: "addScheduleMutation",
        mutationFn: addSchedule,
        onSuccess: response => {
        },
        onError: error => {
        }
    });

    const updateScheduleMutation = useMutation({
        mutationKey: "updateScheduleMutation",
        mutationFn: updateSchedule,
        onSuccess: response => {

        },
        onError: error => {

        }
    })

    const selectDayList = (date) => {
        if(clickDayList.indexOf(date.startStr) > -1) {
            clickDayList.splice(clickDayList.indexOf(date.startStr), 1)
            console.log(clickDayList)
        } else {
            clickDayList.push(date.startStr)
            clickDayList.sort();
            console.log(clickDayList)
        }
    }

    const handleOnChangeStartTime = (e) => {
        console.log(e.value);
        setClassScheduleStartDate(e.value);
    }
    const handleOnChangeEndTime = (e) => {
        console.log(e.label);
        setClassScheduleEndDate(e.value);
    }
   

    const handleSubmitClick = () => {
        const addDateList = [];

        for(let day of clickDayList) {
            addDateList.push({
                classScheduleTitle: classScheduleTitle,
                classScheduleTeacher: classScheduleTeacher,
                classLocationId: classLocationId,
                classScheduleStartDate: day + "T" + classScheduleStartDate + ":00+09:00",
                classScheduleEndDate: day + "T" + classScheduleEndDate + ":00+09:00"
            })
        }
        console.log(addDateList);
        addScheduleMutation.mutate(addDateList);
    }

    const handleUpdateClick = (ScheduleId) => {
        const updateDate = {
            classScheduleId: classScheduleId,
            classScheduleTitle: classScheduleTitle,
            classScheduleTeacher: classScheduleTeacher,
            classLocationId: classLocationId,
            classScheduleStartDate: updateDay + "T" + startDateOption.value + ":00+09:00",
            classScheduleEndDate: updateDay + "T" + endDateOption.value + ":00+09:00"
        }

        console.log(updateDate)

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
                    console.log(info)
                    for(let scheduleDate of originScheduleDate) {
                        if (scheduleDate.classScheduleId == info.event.id) {
                            setClassScheduleId(scheduleDate.classScheduleId)
                            setClassScheduleTitle(scheduleDate.classScheduleTitle)
                            setClassScheduleTeacher(scheduleDate.classScheduleTeacher)
                            setClassLocationId(scheduleDate.classLocationId)
                            // setStartDateOption()
                            // setEndDateOption()
                            console.log(scheduleDate)
                        }
                    }
                    setUpdateDay(info.event.start.getFullYear() + "-" + ("0" + info.event.start.getMonth()).slice(-2) + "-" + ("0" + info.event.start.getDay()).slice(-2))
                    setStartDateOption({
                        label: ("0" + info.event.start.getHours()).slice(-2) + "시 " + ("0" + info.event.start.getMinutes()).slice(-2) + "분",
                        value: ("0" + info.event.start.getHours()).slice(-2) + ":" + ("0" + info.event.start.getMinutes()).slice(-2)
                    })
                    setClassScheduleStartDate(startDateOption.value)
                    setEndDateOption({
                        label: ("0" + info.event.end.getHours()).slice(-2) + "시 " + ("0" + info.event.end.getMinutes()).slice(-2) + "분",
                        value: ("0" + info.event.end.getHours()).slice(-2) + ":" + ("0" + info.event.end.getMinutes()).slice(-2)
                    })
                    setClassScheduleEndDate(endDateOption.value)
                    console.log()
                }}
                select={(date) => {
                    selectDayList(date)
                }}
            />
        </div>
        <div>
            <div> 타이틀
                <input type="text" onChange={classScheduleTitleChange} value={classScheduleTitle} />
            </div>
            <div> 강사명
                <input type="text" onChange={classScheduleTeacherChange} value={classScheduleTeacher}/>
            </div>
            <div> 강의실
                <input type="text" onChange={classLocationIdChange} value={classLocationId}/>
            </div>
        </div>
        <div>
            <Select options={selectTimeOption} onChange={handleOnChangeStartTime} value={startDateOption}/>
            <Select options={selectTimeOption} onChange={handleOnChangeEndTime} value={endDateOption}/>

        </div>
        <div>
            <button onClick={handleSubmitClick}>확인</button>
        </div>
        <div>
            <button onClick={handleUpdateClick}>업데이트 버튼</button>
        </div>
    </div>
  )
}
