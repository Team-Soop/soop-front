import React from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

function ClassSchedulePage(props) {
  return (
    <>
      <FullCalendar 
        defaultView="dayGridMonth"
        plugins={[ dayGridPlugin ]}
        enents={[

        ]}
        eventClick={(info) => {
          
        }}
      />
    </>
  );
}

export default ClassSchedulePage;