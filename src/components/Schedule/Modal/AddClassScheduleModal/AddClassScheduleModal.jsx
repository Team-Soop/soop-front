/** @jsxImportSource @emotion/react */
import * as s from "./style";

import Modal from 'react-modal'

export default function AddClassScheduleModal({ isOpen, isClose, viewScheduleDate, originScheduleDate, selectTimeOption }) {
  return (
    <Modal  isOpen={isOpen} css={s.modal}>
        <div>잉잉</div>
        <button onClick={isClose}>닫기</button>
    </Modal>
  )
}
