/** @jsxImportSource @emotion/react */
import Modal from "react-modal";
import * as s from "./style";

import React, { useEffect } from 'react'
import { useInput } from "../../../../hooks/useInput";
import { useMutation, useQueryClient } from "react-query";
import { applyPeriod } from "../../../../apis/api/study";

export default function ApplyStudyModal({ isOpen, isClose, studyContent, waitingMember }) {
  const [ applyMessage, onChangeMessage ] = useInput("")
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");

  useEffect(() => {
    console.log(applyMessage)
  }, [applyMessage])

  const applyPeriodMutation = useMutation({
    mutationKey: "applyPeriodMutation",
    mutationFn: applyPeriod,
    onSuccess: response => {
      alert("신청 완료")
      window.location.reload();
    },
    onError: error => {

    }
  })

  const applyPeriodButton = () => {
    let checkedApply = false;
    let applyData = {
      studyId: studyContent.studyId,
      userId: principalData.data.userId,
      applyMessage: applyMessage
    }

    for(let member of waitingMember) {
        if(principalData.data.userId === member.userId){
            checkedApply = true
        }
    }

    if(checkedApply) {
        alert("이미 스터디 가입을 신청한 사용자입니다.")
    } else {
      applyPeriodMutation.mutate(applyData)
    }
}

  
  return (
    <>
      <Modal isOpen={isOpen}
      css={s.modalLayout}>
        <div>
            <div>스터디 가입 신청</div>
            <div css={s.header}>
              <div>스터디 제목</div>
              
            </div>
            <div>
              <label>가입 신청 메시지</label>
              <input type="text" value={applyMessage} onChange={onChangeMessage}/>
            </div>
            <div>
              <button onClick={isClose}>취소</button>
              <button onClick={applyPeriodButton}>신청</button>
            </div>
        </div>
        </Modal>
    </>
  )
}


