/** @jsxImportSource @emotion/react */
import * as s from "./style";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useMemo, useState } from "react";
import { useInput } from "../../hooks/useInput";
import Select from "react-select";
import { useMutation } from "react-query";
import { addSchedule } from "../../apis/api/schedule";

export default function AddClassSchedule() {
    const [ classTitle, classTitleChange ] = useInput("");
    const [ classTeacherName, classTeacherNameChange ] = useInput("");
    const [ classLocationId, classLocationIdChange ] = useInput("");
    const [ classStartDate, setClassStartDate ] = useState();
    const [ classEndDate, setClassEndDate ] = useState();
    const [ clickDayList ] = useState([]);
    const [ selectTimeOption ] = useState([]);

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
        setClassStartDate(e.value);
    }
    const handleOnChangeEndTime = (e) => {
        console.log(e.value);
        setClassEndDate(e.value);
    }
    const handleSubmitClick = () => {
        const finalDateList = [];

        for(let day of clickDayList) {
            finalDateList.push({
                classTitle: classTitle,
                classTeacherName: classTeacherName,
                classLocationId: classLocationId,
                classStartDate: day + "T" + classStartDate + ":00+09:00",
                classEndDate: day + "T" + classEndDate + ":00+09:00"
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
                // enents={[
        
                // ]}
                // eventClick={(info) => {
                  
                // }}
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
                <input type="text" onChange={classTitleChange} />
            </div>
            <div> 강사명
                <input type="text" onChange={classTeacherNameChange}/>
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
