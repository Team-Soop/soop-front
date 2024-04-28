/** @jsxImportSource @emotion/react */
import * as s from "./style";

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom'
import { deleteStudyGroup, searchStudyBoard } from '../../apis/api/study';
import SaveStduyGroup from "../../components/Study/SaveStudyGroup/SaveStduyGroup";
import WaitingParticleModal from "../../components/Study/Modal/WaitngParticleModal/WaitingParticleModal";
import MemberListModal from "../../components/Study/Modal/MemberListModal/MemberListModal";

export default function StudyGroupDetailPage() {
    const [ studyContent, setStudyContent ] = useState();
    const [ waitingMember, setWaitingMember ] = useState();
    const [ periodMember, setPeriodMember] = useState();
    const [ isWrite, setIsWrite ] = useState(false)
    const [ isOpenWaitingModal, setIsOpenWaitingModal ] = useState(false);
    const [ isOpenMemberListModal, setIsOpenMemberListModal] = useState(false);
    const queryClient = useQueryClient();
    const searchStudyCategories = queryClient.getQueryData("searchStudyCategories");
    const param = useParams();

    const searchStudyGroup = useQuery("searchStudyGroup", () => searchStudyBoard(param.id), 
        {
            retry: 0,
            refetchOnWindowFocus: false,
            onSuccess: response => {
                setStudyContent(response.data)
            }
        }
    )

    const deleteStudyGroupMutation = useMutation({
        mutationKey: "deleteStudyGroup",
        mutationFn: deleteStudyGroup,
        onSuccess: response => {
        },
        onError: error => {
        }
    })
    
    const deleteStudyButton = () => {
        if(window.confirm("삭제하시겠습니까?") === true) {
            deleteStudyGroupMutation.mutate(studyContent.studyId)
        } else { return; }
    }
    
    const openWaitingModal = () => {
        setIsOpenWaitingModal(!isOpenWaitingModal)
    }

    const openMemberListModal = () => {
        setIsOpenMemberListModal(!isOpenMemberListModal)
    }

    return (
        <>
        {studyContent
            ? <div css={s.layout}>
                <button onClick={() => setIsWrite(true)}>수정</button>
                <button onClick={deleteStudyButton}>삭제</button>
                <div css={s.contentBox}>
                    <div css={s.header}>
                        <div>제목: {studyContent.studyTitle}</div>
                        <div>신고 아이콘</div>
                    </div>
                    <div>작성자 - {studyContent.nickName}</div>
                    <div>
                        <div css={s.period}>
                            {studyContent.studyMemberLimited === studyContent.memberCount || studyContent.timeCount > 0
								? <div> 모집완료 </div>	
								: (0 > studyContent.timeCount && studyContent.timeCount > -1440 
									? <>
									<div>모집 중</div>
									<div>{Math.round(studyContent.timeCount / (60))} Hour</div>
									</>
									: <>
									<div>모집 중</div>
									<div>D{Math.round(studyContent.timeCount / (60 * 24))} Day</div>
									</>
                                )
                            }
                        </div>
                        <div>스킬
                        </div>
                        <div css={s.skills}>
                            {searchStudyCategories?.data.map((category, index) => {
								return(
                                    studyContent.studySkills.includes(category.studyCategoryId) && 
                                    <div key={index}>{category.studyCategoryName}</div>
								)
                            })}
                        </div>
                        
                        <div>인원: {studyContent.memberCount}/{studyContent.studyMemberLimited}</div>
                    </div>
                    <div>
                        {studyContent.studyContent}
                    </div>
                    <div css={s.memberLayout}>
                        <button onClick={openWaitingModal}>신청 현황</button>
                        <button onClick={openMemberListModal}>인원 목록</button>
                        <button>가입 신청</button>
                    </div>
                </div>
                { isWrite && <SaveStduyGroup
                    setState={1}
                    studyId={studyContent.studyId}
                    title={studyContent.studyTitle} 
                    content={studyContent.studyContent} 
                    memberLimited={studyContent.studyMemberLimited}
                    periodEnd={studyContent.studyPeriodEnd}
                    skills={studyContent.studySkills}
                    memberCount={studyContent.memberCount}
                    setIsWrite={setIsWrite}
                /> }
                <WaitingParticleModal isOpen={isOpenWaitingModal} isClose={openWaitingModal}/>
                <MemberListModal isOpen={isOpenMemberListModal} isClose={openMemberListModal}/>
            </div>
            : null}
        </>
    )
}
