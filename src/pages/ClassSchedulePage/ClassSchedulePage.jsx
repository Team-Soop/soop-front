/** @jsxImportSource @emotion/react */
import * as s from "./style";

import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import { useEffect, useMemo, useState } from 'react';
import { useQuery } from "react-query";
import { searchAllSchedule } from "../../apis/api/schedule";
import AddClassSchedule from '../../components/AddClassSchedule/AddClassSchedule';
import DailyClassSchedule from "../../components/DailyClassSchedule/DailyClassSchedule";

function ClassSchedulePage() {
  const [ originScheduleDate, setOriginScheduleData ] = useState([]);
  const [ viewScheduleDate, setViewScheduleData ] = useState([]);
  const [ selectDay, setSelectDay ] = useState("")
  const [ dailyScheduleData, setDailyScheduleData ] = useState([])
  const [ selectTimeOption ] = useState([]);

  // timeOption 설정 (i = Hour, j = Minute)
  useMemo(() => {
      for(let i = 0; i <= 23; i++) {
          for (let j = 0; j <= 1; j++) {
              let timeSet = {};
              timeSet.value = ('0' + i).slice(-2) + ":" + ('0' + (j * 30)).slice(-2);
              timeSet.label = ('0' + i).slice(-2) + "시 " +  ('0' + (j * 30)).slice(-2) + "분";
              selectTimeOption.push(timeSet);
          };
      };
  }, [])

  // DB에 저장된 ScheduleDate 전체 조회
  const searchAllScheduleQuery = useQuery("searchAllScheduleQuery", searchAllSchedule, 
    {

      retry: 0,
      refetchOnWindowFocus: false,
      onSuccess: response => {
        setOriginScheduleData(response.data);
        setViewScheduleData(() => response.data.map(response => {
              return {
                  id: response.classScheduleId,
                  title: response.classScheduleTitle,
                  start: response.classScheduleStartDate,
                  end: response.classScheduleEndDate,
                  color: response.classLocationColor,
                  display: "block"
              }
          }));
      }, 
      onError: error => {
        
      }
    })

    // 캘린더 내에서 날짜 select시 선택한 날짜 데이터 저장
    useEffect(() => {
        setDailyScheduleData(originScheduleDate.filter(originScheduleDate => originScheduleDate.classScheduleStartDate.substring(0, 10) == selectDay))
    }, [selectDay])

    useEffect(() => {
        console.log(dailyScheduleData)
    }, [dailyScheduleData])

  return (
    <div css={s.layout}>
      <div css={s.calendar}>
        {
          !searchAllScheduleQuery.isLoading 
          ? <FullCalendar
          locale={"ko"}
          initialView="dayGridMonth"
          selectable="true"
          plugins={[ dayGridPlugin, interactionPlugin ]}
          events={
            viewScheduleDate
          //  [{
          //     id: 999,
          //     title: "test",
          //     start: "2024-04-26T07:30:00+09:00",
          //     end: "2024-04-26T09:30:00+09:00",
          //     color: "#fd7575",
          //     display: "block",
          //     date: "2024-04-26"
          //   }
          }
          eventClick={(date) => {
            console.log(date)
            console.log(date.event._def.ui.backgroundColor)
            setSelectDay(date.event.startStr.substring(0, 10))
          }}
          select={(date) => {
            console.log(date)
            setSelectDay(date.startStr)
          }}
        />
        : <FullCalendar 
              locale={"ko"}
              initialView="dayGridMonth"
              selectable="true"
              plugins={[ dayGridPlugin, interactionPlugin ]}
        />
        } 
      </div>
      <button>일정 추가</button>
      {
        !searchAllScheduleQuery.isLoading && <AddClassSchedule viewScheduleDate={viewScheduleDate} originScheduleDate={originScheduleDate} selectTimeOption={selectTimeOption}/>
      }
        <DailyClassSchedule selectTimeOption={selectTimeOption} dailyScheduleData={dailyScheduleData}/>
    </div>
  );
}

export default ClassSchedulePage;