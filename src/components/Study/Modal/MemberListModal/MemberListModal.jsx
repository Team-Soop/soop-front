/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Modal from 'react-modal'

export default function MemberListModal({isOpen, isClose}) {
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
                        <button>추방</button>
                    </div>
                </li>
                <div>유저 정보</div>
            </div>
            <div css={s.memeberBox}>
                <li css={s.memberList}>잉
                    <div>
                        <button>추방</button>
                    </div>
                </li>
                <div>유저 정보</div>
            </div>
        </div>
      </Modal>
    </>
  )
}
