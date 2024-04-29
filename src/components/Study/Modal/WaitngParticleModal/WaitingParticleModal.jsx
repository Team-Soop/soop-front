/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Modal from 'react-modal'
import React from 'react'

export default function WaitingParticleModal({isOpen, isClose}) {


  return (
    <>
      <Modal isOpen={isOpen}
      css={s.modalLayout}>
        <div css={s.header}>
            <div>신청자 목록</div>
            <button onClick={isClose}>닫기</button>
        </div>
        <div>
            <div css={s.memeberBox}>
                <li css={s.memberList}>잉
                    <div>
                        <button>승낙</button>
                        <button>거절</button>
                    </div>
                </li>
                <div>유저 정보</div>
            </div>
            <div css={s.memeberBox}>
                <li css={s.memberList}>잉
                    <div>
                        <button>승낙</button>
                        <button>거절</button>
                    </div>
                </li>
                <div>유저 정보</div>
            </div>
        </div>
        
      </Modal>
    </>
  )
}
