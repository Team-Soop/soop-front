import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import AddClassSchedule from '../../components/AddClassSchedule.jsx/AddClassSchedule';

function ClassSchedulePage(props) {
  return (
    <>
      {/* <FullCalendar 
        defaultView="dayGridMonth"
        plugins={[ dayGridPlugin ]}
        enents={[

        ]}
        eventClick={(info) => {
          
        }}
      /> */}
      <button>일정 추가</button>
      <AddClassSchedule />
    </>
  );
}

export default ClassSchedulePage;