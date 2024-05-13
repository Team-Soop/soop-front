/** @jsxImportSource @emotion/react */
import { useMutation, useQueryClient } from "react-query";
import * as s from "./style";
import Modal from 'react-modal'
import { resignMember } from "../../../../apis/api/study";
import userImg from "../../../../assets/images/userProfileNone.png";

export default function MemberListModal({isOpen, isClose, recruitmentMember, isManager}) {
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
      css={s.modal}>
        <div css={s.modalLayout}>
          <div css={s.header}>
              <div css={s.modalName}>스터디 인원 현황</div>
              <button onClick={isClose}>닫기</button>
          </div>
          <div>
                {recruitmentMember?.map((member) => {
                  return(
                      <div css={s.memeberBox} key={member.recruitmentId}>
                        <div css={s.memberList}>
                          <div css={s.memberInfo}>
                            <img src=
                            {
                              !!member.profileImgUrl
                              ? member.profileImgUrl
                              : userImg
                            } alt="" />
                            <div css={s.nameBox}>
                              <div>{member.nickname}</div>
                              <div>{member.createDate}</div>
                            </div>
                          </div>
                          <div>
                          {
                            isManager && <button onClick={() => resignMemberButton(member.recruitmentId)}>추방</button>
                          }
                          </div>
                        </div>
                        
                      </div>
                  )})}
          </div>
        </div>
      </Modal>
    </>
  )
}
