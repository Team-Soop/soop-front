/** @jsxImportSource @emotion/react */
import * as s from "./style";

import { useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AddClassSchedule from '../../components/AddClassSchedule/AddClassSchedule';

function ClassSchedulePage(props) {
  const [ params, setParams ] = useState(0)
  const [ scheduleList, setScheduleList ] = useState([
    {
      title: "abc",
      start: "2024-04-02",
      end: "2024-04-05"
    },
    {
      title: "bbb",
      start: "2024-04-06T18:00:00+09:00",
      end: "2024-04-06T20:00:00+09:00"
    }
  ]);



  return (
    <>
      <div css={s.calendar}>
        <FullCalendar
          locale={"ko"}
          initialView="dayGridMonth"
          plugins={[ dayGridPlugin ]}
          events={
            scheduleList
          }
          eventClick={(info) => {
            console.log(info)
          }}
        />
      </div>
      <button>일정 추가</button>
      <AddClassSchedule />
    </>
  );
}

export default ClassSchedulePage;