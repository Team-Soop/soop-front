/** @jsxImportSource @emotion/react */
import * as s from "./style";
import Modal from 'react-modal'
import React, { useEffect } from 'react'
import { useMutation, useQueryClient } from "react-query";
import { admissionWatingMember, refuseWatingMember } from "../../../../apis/api/study";
import userImg from "../../../../assets/images/userProfileNone.png";

export default function WaitingParticleModal({isOpen, isClose, waitingMember}) {
  const queryClient = useQueryClient();

  const admissionMemberMutation = useMutation({
    mutationKey: "admissionMemberMutation",
    mutationFn: admissionWatingMember,
    onSuccess: response => {
      queryClient.invalidateQueries(["searchWaitingMemberQuery"])
    },
    onError: error => {

    }
  })

  const refuseMemberMutation = useMutation({
    mutationKey: "refuseMemberMutation",
    mutationFn: refuseWatingMember,
    onSuccess: response => {
      queryClient.invalidateQueries(["searchWaitingMemberQuery"])
    },
    onError: error => {

    }
  })

  const admissionMemberButton = (memberInfo) => {
    let member = {
      waitingId: memberInfo.waitingId,
      userId: memberInfo.userId,
      studyId: memberInfo.studyId
    }
    
    admissionMemberMutation.mutate(member)
  }

  const refuseMemberButton = (waitingId) => {
    refuseMemberMutation.mutate(waitingId)
  }


  return (
    <>
      <Modal isOpen={isOpen}
      css={s.modal}>
        <div css={s.modalLayout}>
          <div css={s.header}>
              <div css={s.modalName}>신청자 목록</div>
              <button onClick={isClose}>닫기</button>
          </div>
          <div>
            {
              waitingMember?.map((member) => {
                return(
                <div css={s.memeberBox} key={member.waitingId}>
                  <div css={s.memberList}>
                      <div css={s.memberInfo}>
                        <img src=
                        {
                          !!member.profileImgUrl
                          ? member.profileImgUrl
                          : userImg
                        } alt="" />
                        <div>{member.nickname}</div>
                      </div>
                      <div>
                        <button onClick={() => admissionMemberButton(member)}>승낙</button>
                        <button onClick={() => refuseMemberButton(member.waitingId)}>거절</button>
                      </div>
                    </div>
                  <div>{member.createDate}</div>
              </div>
              )
              })
            }
          </div>
        </div>
      </Modal>
    </>
  )
}
