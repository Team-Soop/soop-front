/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from "react";
import * as s from "./style";
import ReactQuill from 'react-quill'
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQueryClient } from "react-query";
import { saveStudyGroup, updateStudyGroup } from "../../../apis/api/study";
import Modal from "react-modal"
import { FaCaretDown, FaCaretUp } from "react-icons/fa";

export default function SaveStduyGroup({ isOpen, isClose, setState, studyId, title, content, memberLimited, periodEnd, skills, memberCount }) {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const [ memberCountList, setMemberCountList ] = useState([])
    const [ nowMemberCount, setNowMemberCount ] = useState(1);
    const [ studyTitle, setStudyTitle ] = useState("")
    const [ studyContent, setStudyContent] = useState("")
    const [ endDate, setEndDate ] = useState(new Date)
    const [ MemberListView, setMemberListView ] = useState(false);
    const [ memberLimitedCount, setMemberLimitedCount] = useState("최대 멤버 제한")
    const [ studySkills, setStudySkills ] = useState([])

    const searchStudyCategories = queryClient.getQueryData("searchStudyCategories");

    useEffect(() => {
        if(setState === 1) {
            setStudyTitle(title)
            setStudyContent(content)
            setMemberLimitedCount(memberLimited)
            setEndDate(periodEnd)
            setNowMemberCount(memberCount)
        }
    }, [])

    const testCountList = [1, 2, 3, 4, 5, 6]

    useEffect(() => {
        let memberCount = [];
        for(let i = nowMemberCount; i < 7; i++) {
            memberCount.push(i)
        }
        setMemberCountList(memberCount)
    }, [nowMemberCount])

    useEffect(() => {
        if(searchStudyCategories?.data) {
            if(setState === 1) {
                let changeSkills = searchStudyCategories.data
                for(let i = 1; i < searchStudyCategories.data.length + 1; i++) {
                    if(skills.includes(i)) {
                        changeSkills[i-1].checkState = true;
                    }
                }
                setStudySkills(changeSkills)
            } else {
                setStudySkills(searchStudyCategories.data)
            }   
        }
    }, [searchStudyCategories])
    

    const saveStudyGroupMutation = useMutation({
        mutationKey: "saveStudyGroupMutation",
        mutationFn: saveStudyGroup,
        onSuccess: response => {
            window.location.reload()
        },
        onError: error => {
            console.log(error)
        }
    })

    const updateStudyGroupMutation = useMutation({
        mutationKey: "updateStudyGroupMutation",
        mutationFn: updateStudyGroup,
        onSuccess: response => {
            window.location.reload()
        },
        onError: error => {
            console.log(error)
        }
    })

    const modules = useMemo(
        () => ({
          toolbar: {
            container: [
              // ["image"],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ align: [] }],
              ['bold', 'italic', 'underline', 'strike'],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{color: [], },{ background: [] },],
            ],
          }
        }),
      );

    const checkedOnChange = (index) => {
        let changeSkills = [...studySkills]
        changeSkills[index].checkState = !studySkills[index].checkState
        setStudySkills(changeSkills)
    }


    const saveClickButton = () => {
        let studyPost = {
            managerUserId: principalData.data.userId,
            studyTitle: studyTitle,
            studyContent: studyContent,
            studySkills: studySkills.filter(skill => skill.checkState === true),
            studyMemberLimited: memberLimitedCount,
            studyPeriodEnd: endDate,
        }

        if (setState === 1) {
            console.log(studyPost)
            updateStudyGroupMutation.mutate({id: studyId, data: studyPost})
        } else {
            console.log(studyPost)
            saveStudyGroupMutation.mutate(studyPost)
        }

    }

  return (
    <Modal isOpen={isOpen}
        css={s.modal}>
        <div css={s.modalLayout}>
            <div css={s.header}>
                <h1 css={s.modalName}>스터디 모집</h1>
                <button onClick={isClose}>취소</button>
            </div>
            <div css={s.title}>
                <input type="text" placeholder="제목" spellCheck="false" onChange={(e) => setStudyTitle(e.target.value)} value={studyTitle || ""}/>
            </div>
            <div> {/* 옵션 박스 */}
                <div css={s.skills}>
                    <div>언어, 프레임워크</div>
                    <div css={s.skillBox}>
                        {studySkills.map((checkbox, index) => {
                            return(
                                <div key={index} css={s.checkBoxList}>
                                    <input type="checkBox" checked={checkbox.checkState} key={checkbox.studyCategoryId} id={index} onChange={() => {checkedOnChange(index)}}/>
                                    <label for={index}>{checkbox.studyCategoryName}</label>
                                </div>
                            )})
                        }
                    </div>
                </div>
                <div css={s.memberLimeted}>
                    <div>최대 인원 수</div>
                    <div onClick={() => setMemberListView(!MemberListView)}> {memberLimitedCount}
                        { MemberListView && 
                            <div css={s.numList}>
                                {memberCountList.map((count) => {
                                    return(
                                        <a key={count} onClick={(e) => {setMemberLimitedCount(count)}}>{count}</a>
                                    )
                                })}
                            </div>
                        }
                    </div>
                    {
                        !MemberListView 
                        ? <FaCaretDown onClick={() => setMemberListView(!MemberListView)}/>
                        : <FaCaretUp onClick={() => setMemberListView(!MemberListView)}/>
                    }
                </div>
                <div css={s.endTime}>
                    <div>모집 마감일</div>
                        <ReactDatePicker
                            dateFormat='yyyy-MM-dd hh:mm'
                            selected={endDate}
                            showTimeInput
                            onChange={(date) => {setEndDate(date)}}
                        />
                </div>
            <ReactQuill 
                css={s.quill}
                modules={modules}
                value={studyContent}
                onChange={setStudyContent}
            />
                
                <div css={s.applyButton}>
                    
                    <button onClick={saveClickButton}>작성</button>
                </div>
            </div>
        </div>
    </Modal>
  )
}