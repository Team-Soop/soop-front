/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { searchUserAlarmList } from "../../apis/api/alarm";
import * as s from "./style";

import { useQuery, useQueryClient } from "react-query";
import DOMPurify from "dompurify";


export default function UserAlarm() {
    const sanitizer = DOMPurify.sanitize;
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const [ userAlarmList, setUserAlarmList ] = useState([])

    const searchUserAlarmQuery = useQuery("searchUserAlarmQuery", () => searchUserAlarmList(principalData.data.userId), {
        onSuccess: response => {
            setUserAlarmList(response.data)
            console.log(response.data)
        },
        onError: error => {
            console.log(error)
        }
    })


  return (
    <div css={s.layout}>
        <div>알림</div>
        {
            !!userAlarmList &&
            userAlarmList.map((alarm) => {
                return (
                    <div css={s.alarmCard}>
                        <div css={s.cardDetail}>
                            <div css={s.toUser}>
                                <img src={alarm.fromUserProfileImgUrl} alt="" />
                                {alarm.fromUserNickname}
                                
                            </div>
                            <div css={s.content} dangerouslySetInnerHTML={{__html: sanitizer(alarm.alarmContent)}}></div>
                        </div>
                        <div css={s.closeButton}>
                            <button>x</button>
                        </div>
                    </div>
                )
            })
        }
    </div>
  )
}