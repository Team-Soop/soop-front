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
import Modal from "react-modal"

export default function AddClassSchedule({ isOpen, isClose, viewScheduleDate, originScheduleDate, selectTimeOption, selectTimeEndOption }) {
    const [ clickDayList, setClickDayList ] = useState([]);
    const [ classScheduleId, setClassScheduleId ] = useState();
    const [ classScheduleTitle, classScheduleTitleChange, unusedTitle, setClassScheduleTitle ] = useInput("");
    const [ classScheduleTeacher, classScheduleTeacherChange, unusedTeacher, setClassScheduleTeacher ] = useInput("");
    const [ classLocationId, classLocationIdChange, unusedLocationId, setClassLocationId ] = useInput("");
    const [ startDateOption, setStartDateOption ] = useState({})
    const [ endDateOption, setEndDateOption] = useState({});
    const [ updateDay, setUpdateDay ] = useState("");
    const [ addState, setAddState ] = useState(1)
    
    
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
        let selectDayList = [...clickDayList];

        if(selectDayList.indexOf(date.startStr) > -1) {
            selectDayList.splice(selectDayList.indexOf(date.startStr), 1)
            console.log(clickDayList)
        } else {
            selectDayList.push(date.startStr)
            selectDayList.sort();
            console.log(clickDayList)
        }

        setClickDayList(selectDayList)
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
        deleteScheduleMutation.mutate(parseInt(classScheduleId))
    }

    const handleAddState = (e) => {
        console.log(e.target.value)
        setAddState(e.target.value)

        if(e.target.value == 1) {
            setClickDayList([])
            setClassScheduleId(0)
            setClassScheduleTitle("")
            setClassScheduleTeacher("")
            setClassLocationId("")
            setStartDateOption({})
            setEndDateOption({})
            setUpdateDay("")
        }
    }

  return (
    <>
        <Modal isOpen={isOpen} css={s.background}>
        <div css={s.modal}>
            <div css={s.layout}>
                <div css={s.contentLayout}>
                    <div css={s.header}>
                        <div css={s.radioBox}>
                            <input type="radio" name="addState" id="radio-1" value={1} onChange={handleAddState} checked={addState == 1}/>
                            <label for="radio-1">일정 추가</label>
                            <input type="radio" name="addState" id="radio-2" value={2} onChange={handleAddState} checked={addState == 2}/>
                            <label for="radio-2">일정 수정/삭제</label>
                        </div>
                        <div css={s.buttonBox}>
                            {
                            addState == 1
                            ?

                                    <button onClick={handleSubmitClick}>확인</button>
                            :
                            <>
                                    <button onClick={handleUpdateClick}>업데이트</button>                    
                                    <button onClick={handleDeleteClick}>삭제</button>
                            </>
                            }   
                            <button onClick={isClose}>닫기</button>
                        </div>
                    </div>
                    <div css={s.inputBox}>
                        <label>강의명</label>
                        <input type="text" onChange={classScheduleTitleChange} value={classScheduleTitle} />
                        <label>강사</label>
                        <input type="text" onChange={classScheduleTeacherChange} value={classScheduleTeacher}/>
                        <label>강의실</label>
                        <input type="text" onChange={classLocationIdChange} value={classLocationId}/>

                    </div>
                    <div css={s.selectBox}>
                        <div>
                            <label>시작</label>
                            <Select options={selectTimeOption} onChange={handleOnChangeStartTime} value={startDateOption}/>
                        </div>
                        <div>
                            <label>종료</label>
                            <Select options={selectTimeEndOption} onChange={handleOnChangeEndTime} value={endDateOption}/>
                        </div>
                    </div>
                    <div css={s.calender}>
                        <FullCalendar 
                            locale={"ko"}
                            selectable="true"
                            displayEventTime={false}
                            plugins={[ dayGridPlugin, interactionPlugin ]}
                            events={
                                addState == 1 
                                ? clickDayList.map((day2) => {
                                    return({
                                    start: day2,
                                    overlap: false,
                                    display: 'background',
                                    backgroundColor: "#93ddff"
                                }
                                    )
                                })
                                : viewScheduleDate
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
                            selectMirror={true}
                            
                        />
                    </div>
                    

                </div>
            </div>
        </div>
        </Modal>
    </>
  )
}
