/** @jsxImportSource @emotion/react */
import * as s from "./style";

import { useEffect, useState } from 'react'
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom'
import { deleteStudyGroup, searchRecruitment, searchStudyBoard, searchWaitingMember } from '../../apis/api/study';
import SaveStduyGroup from "../../components/Study/SaveStudyGroup/SaveStduyGroup";
import WaitingParticleModal from "../../components/Study/Modal/WaitngParticleModal/WaitingParticleModal";
import MemberListModal from "../../components/Study/Modal/MemberListModal/MemberListModal";
import ApplyStudyModal from "../../components/Study/Modal/ApplyStudyModal/ApplyStudyModal";
import DOMPurify from "dompurify";
import userImg from "../../assets/images/userProfileNone.png";
import { BsExclamationCircle } from "react-icons/bs";

export default function StudyGroupDetailPage() {
    const [ studyContent, setStudyContent ] = useState();
    const [ waitingMember, setWaitingMember ] = useState();
    const [ recruitmentMember, setRecruitmentMember] = useState();
    const [ isWrite, setIsWrite ] = useState(false)
    const [ isOpenWaitingModal, setIsOpenWaitingModal ] = useState(false);
    const [ isOpenMemberListModal, setIsOpenMemberListModal] = useState(false);
    const [ isOpenApplyStudyModal, setIsOpenApplyStudyModal] = useState(false);
    const [ isManager, setIsManager ] = useState(false)
    const [ isUserInMember, setIsUserInMember ] = useState(false)
    const sanitizer = DOMPurify.sanitize;
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
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

    const searchWaitingMemberQuery = useQuery("searchWaitingMemberQuery", () => searchWaitingMember(param.id),
        {
         onSuccess: response => {
            console.log(response.data)
            setWaitingMember(response.data)
         }
        }
    )

    const searchRecruitmentQuery = useQuery("searchRecruitmentQuery", () => searchRecruitment(param.id),
        {
            onSuccess: response => {
                setRecruitmentMember(response.data)
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

    const closeWrite = () => {
        setIsWrite(false)
    }
    
    const openWaitingModal = () => {
        setIsOpenWaitingModal(!isOpenWaitingModal)
    }

    const openMemberListModal = () => {
        setIsOpenMemberListModal(!isOpenMemberListModal)
    }

    console.log(waitingMember)
    console.log(isOpenApplyStudyModal)

    const openApplyStudyModal = () => {
        for(let member of waitingMember) {
            if(principalData.data.userId === member.userId){
                alert("이미 스터디 가입을 신청한 사용자입니다.")
                return;
            }
        }   
        setIsOpenApplyStudyModal(!isOpenApplyStudyModal)
    }   

    const isReportOpen = (feedId) => {
        if(window.confirm("이 게시물을 신고 하시겠습니까?")){
          navigate(`/report/2/${feedId}`)
        }
        return;
      }

    useEffect(() => {
        let checkInMember = false
        
        
        if(!!recruitmentMember) {
            for(let member of recruitmentMember) {
                if (principalData.data.userId === member.userId) {
                    checkInMember = true
                }
            }
        }

        setIsUserInMember(checkInMember)

    }, [recruitmentMember, studyContent])

    useEffect(() => {
        if(principalData.data.userId === studyContent?.managerUserId){
            setIsManager(true)
        }
    }, [studyContent])

    return (
        <>
        {studyContent
            ? <div css={s.layout}>
                {
                    isManager &&
                    <div css={s.addButton}>
                        <button onClick={() => setIsWrite(true)}>수정</button>
                        <button onClick={deleteStudyButton}>삭제</button>
                    </div>
                }
                <div>
                    <div css={s.contentLayout}>
                        <div css={s.userInfo}>
                            <img src={
                                !!studyContent.profileImgUrl
                                ? studyContent.profileImgUrl
                                : userImg
                            } alt="" />
                            <div>{studyContent.nickName}</div>
                        </div>
                    </div>
                    <div css={s.contentLayout}>
                        <div css={s.header}>
                            <div css={s.title}>{studyContent.studyTitle}</div>
                            <div css={s.titleInBox}>
                                <div onClick={() => isReportOpen(studyContent.studyId)}><BsExclamationCircle /></div>
                                <div>{studyContent.contentCreateDate}</div>
                            </div>
                        </div>
                    </div>
                    <div css={s.contentLayout}>
                        <div css={s.option}>
                            <div css={s.period}>
                                {studyContent.studyMemberLimited === studyContent.memberCount || studyContent.timeCount > 0
                                    ? <div css={s.complete}> 모집완료 </div>	
                                    : (0 > studyContent.timeCount && studyContent.timeCount > -1440 
                                        ? <div css={s.recruiting}>
                                        <div>모집 중</div>
                                        <div>{Math.round(studyContent.timeCount / (60))} Hour</div>
                                        </div>
                                        : <div css={s.recruiting}>
                                        <div>모집 중</div>
                                        <div>D{Math.round(studyContent.timeCount / (60 * 24))} Day</div>
                                        </div>
                                    )
                                }
                            </div>
                            <div css={s.skills}>
                                <div>스킬</div>
                                    <div css={s.skillList}>
                                    {searchStudyCategories?.data.map((category, index) => {
                                        return(
                                            studyContent.studySkills.includes(category.studyCategoryId) && 
                                            <div key={index}>{category.studyCategoryName}</div>
                                        )
                                    })}
                                    </div>
                            </div>
                            <div css={s.memberCount}>
                                <div>모집 인원 </div>
                                <div>{studyContent.memberCount}/{studyContent.studyMemberLimited}</div>
                            </div>
                        </div>
                    </div>
                    <div css={s.contentLayout}>
                        <div css={s.content}>
                            <div dangerouslySetInnerHTML={{__html: sanitizer(studyContent.studyContent)}}></div>
                            <div css={s.memberLayout}>
                                {
                                    principalData.data.userId === studyContent.managerUserId &&
                                    <button onClick={openWaitingModal}>신청 현황</button>
                                }
                                { 
                                    (isManager || isUserInMember) && <button onClick={openMemberListModal}>인원 목록</button>
                                }
                                {
                                    (!isManager && !isUserInMember && studyContent.timeCount < 0) && <button onClick={openApplyStudyModal}>가입 신청</button>
                                }
                                
                            </div>
                        </div>
                    </div>
                </div>
                <SaveStduyGroup isOpen={isWrite} isClose={closeWrite} setState={1} studyId={studyContent.studyId} title={studyContent.studyTitle}  content={studyContent.studyContent}  memberLimited={studyContent.studyMemberLimited} periodEnd={studyContent.studyPeriodEnd} skills={studyContent.studySkills} memberCount={studyContent.memberCount} />
                <WaitingParticleModal isOpen={isOpenWaitingModal} isClose={openWaitingModal} waitingMember={waitingMember}/>
                <MemberListModal isOpen={isOpenMemberListModal} isClose={openMemberListModal} recruitmentMember={recruitmentMember} isManager={isManager}/>
                <ApplyStudyModal isOpen={isOpenApplyStudyModal} isClose={openApplyStudyModal} studyContent={studyContent} waitingMember={waitingMember}/>
            </div>
            : null}
        </>
    )
}
