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
       css={s.modal}>
        <div css={s.modalLayout}>
          <div css={s.modalName}>스터디 가입 신청</div>
          <div css={s.header}>
            <div>스터디 -</div>
            <div>{studyContent.studyTitle}</div>
          </div>
          <div css={s.message}>
            <label>가입 신청 메시지</label>
            <textarea spellCheck="false" value={applyMessage} onChange={onChangeMessage}/>
          </div>
          <div css={s.applyButtons}>
            <button onClick={applyPeriodButton}>신청</button>
            <button onClick={isClose}>취소</button>
          </div>
        </div>
        </Modal>
    </>
  )
}


