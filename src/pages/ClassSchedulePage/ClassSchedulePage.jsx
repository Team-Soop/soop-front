/** @jsxImportSource @emotion/react */
import * as s from "./style";

import { useEffect, useState } from 'react';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { useMutation, useQuery, useQueryClient } from "react-query";
import AddClassSchedule from '../../components/AddClassSchedule/AddClassSchedule';
import { searchAllSchedule } from "../../apis/api/schedule";

function ClassSchedulePage(props) {
  const [ params, setParams ] = useState("");
  const [ scheduleList, setScheduleList ] = useState([]);
  const [ originScheduleDate, setOriginScheduleData ] = useState([]);
  const [ viewScheduleDate, setViewScheduleData ] = useState([]);

  // const searchAllScheduleMutation = useMutation({
  //     mutationKey: "searchAllScheduleMutation",
  //     mutationFn: searchAllSchedule,
  //     onSuccess: response => {
  //       setOriginScheduleData(response.data);
  //       setViewScheduleData(() => response.data.map(response => {
  //             return {
  //                 id: response.classScheduleId,
  //                 title: response.classScheduleTitle,
  //                 start: response.classScheduleStartDate,
  //                 end: response.classScheduleEndDate,
  //                 color: response.classLocationColor,
  //                 display: "block"
  //             }
  //         }));
  //     },
  //     onError: error => {
  //         console.log(error);
  //     }
  // })

  // useEffect(() => {
  //     searchAllScheduleMutation.mutate();
  // }, [])

  const searchAllScheduleQuery = useQuery("searchAllScheduleQuery", searchAllSchedule, 
    {
      retry: 0,
      refetchOnWindowFocus: true,
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

    // useEffect(() => {
    //   console.log(viewScheduleDate)
    // })

  return (
    <>
      <div css={s.calendar}>
        {
          searchAllScheduleQuery.isLoading 
          ? <FullCalendar 
              locale={"ko"}
              initialView="dayGridMonth"
              plugins={[ dayGridPlugin ]}
            />
          : <FullCalendar
            locale={"ko"}
            initialView="dayGridMonth"
            plugins={[ dayGridPlugin ]}
            events={
              // viewScheduleDate
             [{
                id: 999,
                title: "test",
                start: "2024-04-26T07:30:00+09:00",
                end: "2024-04-26T09:30:00+09:00",
                color: "#fd7575",
                display: "block",
                date: "2024-04-26"
              },
              {
                id: 2,
                title: "abc",
                start: "2024-04-02",
                end: "2024-04-05",
                color: "#5f5ffa"
              },
              {
                id: 3,
                title: "abc",
                start: "2024-04-06",
                end: "2024-04-06",
                color: "#44b844"
              },
              {
                id: 4,
                title: "abc",
                start: "2024-04-08",
                end: "2024-04-08",
                color: "#ff996a"
              },
              {
                id: "5",
                title: "abc",
                start: "2024-04-10",
                end: "2024-04-10",
                color: "#bd46bd",
              },
            ]
              
            }
            eventClick={(info) => {
              console.log(info);
              console.log(info.event.start.getDay());

            }}
          />
        }
      </div>
      <button>일정 추가</button>
      {
        !searchAllScheduleQuery.isLoading && <AddClassSchedule viewScheduleDate={viewScheduleDate} originScheduleDate={originScheduleDate}/>
      }
    </>
  );
}

export default ClassSchedulePage;