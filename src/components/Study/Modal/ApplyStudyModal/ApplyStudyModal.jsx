/** @jsxImportSource @emotion/react */
import Modal from "react-modal";
import * as s from "./style";

import React, { useEffect } from 'react'
import { useInput } from "../../../../hooks/useInput";

export default function ApplyStudyModal({ isOpen, isClose, studyId, studyName, waitingMemeberList }) {
  const [ applyMessage, onChangeMessage ] = useInput("")

  useEffect(() => {
    console.log(applyMessage)
  }, [applyMessage])


  
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
              <button>신청</button>
            </div>
        </div>
        </Modal>
    </>
  )
}


