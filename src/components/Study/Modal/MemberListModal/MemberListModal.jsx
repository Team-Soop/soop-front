/** @jsxImportSource @emotion/react */
import { useMutation, useQueryClient } from "react-query";
import * as s from "./style";
import Modal from 'react-modal'
import { resignMember } from "../../../../apis/api/study";

export default function MemberListModal({isOpen, isClose, recruitmentMember}) {
  const queryClient = useQueryClient();
  
  const resignMemberMutation = useMutation({
    mutationKey: "resignMemberMutation",
    mutationFn: resignMember,
    onSuccess: response => {
      queryClient.invalidateQueries(["searchRecruitmentQuery"])
    }
  })

  const resignMemberButton = (recruitmentId) => {
    resignMemberMutation.mutate(recruitmentId)
  }

  return (
    <>
      <Modal isOpen={isOpen}
      css={s.modalLayout}>
        <div css={s.header}>
            <div>스터디 인원 현황</div>
            <button onClick={isClose}>닫기</button>
        </div>
        <div>
              {
                recruitmentMember?.map((member) => {
                  return(
                    <>
                    <div css={s.memeberBox} key={member.recruitmentId}>
                      <li css={s.memberList}>{member.nickname}
                        <div>
                            <button onClick={() => resignMemberButton(member.recruitmentId)}>추방</button>
                        </div>
                      </li>
                      <div>{member.createDate}</div>
                  </div>
                  </>  
                  )
                })
              }
        </div>
      </Modal>
    </>
  )
}
