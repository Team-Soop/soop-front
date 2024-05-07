/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import { deleteAlarm, searchUserAlarmList } from "../../apis/api/alarm";
import * as s from "./style";

import { useMutation, useQuery, useQueryClient } from "react-query";
import DOMPurify from "dompurify";
import { IoIosCloseCircleOutline } from "react-icons/io";


export default function UserAlarm() {
    const sanitizer = DOMPurify.sanitize;
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const [ userAlarmList, setUserAlarmList ] = useState([])

    const searchUserAlarmQuery = useQuery("searchUserAlarmQuery", () => searchUserAlarmList(principalData.data.userId), {
        onSuccess: response => {
            setUserAlarmList(response.data)
        },
        onError: error => {
            console.log(error)
        }
    })

    const deleteUserAlarmMutation = useMutation("deleteUserAlarmMutation", deleteAlarm, {
        onSuccess: response => {
            queryClient.invalidateQueries("searchUserAlarmQuery")
        },
        onError: error => {

        }
    })

    const deleteUserAlarm = (alarmId) => {
        deleteUserAlarmMutation.mutate(alarmId)
    }


  return (
    <div css={s.layout}>
        <div>알림</div>
        <div css={s.container}>
            {
                !!userAlarmList &&
                userAlarmList.map((alarm, index) => {
                    return (
                        <div css={s.alarmCard} key={index}>
                            <div css={s.cardDetail}>
                                <div css={s.toUser}>
                                    <img src={alarm.fromUserProfileImgUrl} alt="" />
                                    {alarm.fromUserNickname}

                                </div>
                                <div css={s.content} dangerouslySetInnerHTML={{__html: sanitizer(alarm.alarmContent)}}></div>
                            </div>
                                <button css={s.closeButton} onClick={() => deleteUserAlarm(alarm.alarmId)}><IoIosCloseCircleOutline /></button>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}