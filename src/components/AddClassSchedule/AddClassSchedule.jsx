/** @jsxImportSource @emotion/react */
import * as s from "./style";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useRef, useState } from "react";
import { useInput } from "../../hooks/useInput";
import Select from "react-select";
import { useMutation } from "react-query";
import { addSchedule, deleteSchedule, updateSchedule } from "../../apis/api/schedule";

export default function AddClassSchedule({ viewScheduleDate, originScheduleDate, selectTimeOption }) {
    const [ clickDayList ] = useState([]);
    const [ classScheduleId, setClassScheduleId ] = useState(0);
    const [ classScheduleTitle, classScheduleTitleChange, unusedTitle, setClassScheduleTitle ] = useInput("");
    const [ classScheduleTeacher, classScheduleTeacherChange, unusedTeacher, setClassScheduleTeacher ] = useInput("");
    const [ classLocationId, classLocationIdChange, unusedLocationId, setClassLocationId ] = useInput("");
    const [ startDateOption, setStartDateOption ] = useState({})
    const [ endDateOption, setEndDateOption] = useState({});
    const [ updateDay, setUpdateDay ] = useState("");
    const scheduleRef = useRef(0);
    
    useEffect(() => {
        console.log(updateDay);
    }, [updateDay])

    const addScheduleMutation = useMutation({
        mutationKey: "addScheduleMutation",
        mutationFn: addSchedule,
        onSuccess: response => {
            alert("데이터 추가 완료")
            window.location.replace("/schedule")
        },
        onError: error => {
        }
    });

    const updateScheduleMutation = useMutation({
        mutationKey: "updateScheduleMutation",
        mutationFn: updateSchedule,
        onSuccess: response => {
            alert("데이터 수정 완료")
            window.location.replace("/schedule")
        },
        onError: error => {

        }
    })

    const deleteScheduleMutation = useMutation({
        mutationKey: "deleteScheduleMutation",
        mutationFn: deleteSchedule,
        onSuccess: response => {
            alert("데이터 삭제 완료")
            window.location.replace("/schedule")
        },
        onError: error => {

        }
    })

    // 데이터 추가를 위한 캘린더 select 날짜 List 저장 (다중 선택 가능)
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
        setStartDateOption({
            value: e.value,
            label: e.label
        })
    }
    const handleOnChangeEndTime = (e) => {
        setEndDateOption({
            value: e.value,
            label: e.label
        })
    }
   

    const handleSubmitClick = () => {
        const addDateList = [];

        for(let day of clickDayList) {
            addDateList.push({
                classScheduleTitle: classScheduleTitle,
                classScheduleTeacher: classScheduleTeacher,
                classLocationId: classLocationId,
                classScheduleStartDate: day + "T" + startDateOption.value + ":00+09:00",
                classScheduleEndDate: day + "T" + endDateOption.value + ":00+09:00"
            })
        }
        console.log(addDateList);
        addScheduleMutation.mutate(addDateList);
    }

    const handleUpdateClick = () => {
        const updateDate = {
            classScheduleId: classScheduleId,
            classScheduleTitle: classScheduleTitle,
            classScheduleTeacher: classScheduleTeacher,
            classLocationId: classLocationId,
            classScheduleStartDate: updateDay + "T" + startDateOption.value + ":00+09:00",
            classScheduleEndDate: updateDay + "T" + endDateOption.value + ":00+09:00"
        }
        updateScheduleMutation.mutate(updateDate)
    }

    const handleDeleteClick = () => {
        console.log(parseInt(classScheduleId))
        deleteScheduleMutation.mutate(parseInt(classScheduleId))
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
                        }
                    }
                    setUpdateDay(info.event.startStr.substring(0, 10))
                    
                    setStartDateOption({
                        label: ("0" + info.event.start.getHours()).slice(-2) + "시 " + ("0" + info.event.start.getMinutes()).slice(-2) + "분",
                        value: ("0" + info.event.start.getHours()).slice(-2) + ":" + ("0" + info.event.start.getMinutes()).slice(-2)
                    })
                    setEndDateOption({
                        label: ("0" + info.event.end.getHours()).slice(-2) + "시 " + ("0" + info.event.end.getMinutes()).slice(-2) + "분",
                        value: ("0" + info.event.end.getHours()).slice(-2) + ":" + ("0" + info.event.end.getMinutes()).slice(-2)
                    })
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
            <button onClick={handleUpdateClick}>업데이트</button>
        </div>
        <div>
            <button onClick={handleDeleteClick}>삭제</button>
        </div>
    </div>
  )
}
