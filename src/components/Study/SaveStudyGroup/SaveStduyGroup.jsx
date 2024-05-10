/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from "react";
import * as s from "./style";
import ReactQuill from 'react-quill'
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useMutation, useQueryClient } from "react-query";
import { saveStudyGroup, updateStudyGroup } from "../../../apis/api/study";
import Modal from "react-modal"

export default function SaveStduyGroup({ isOpen, isClose, setState, studyId, title, content, memberLimited, periodEnd, skills, memberCount }) {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const [ memberCountList, setMemberCountList ] = useState([])
    const [ nowMemberCount, setNowMemberCount ] = useState(0);
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

    useEffect(() => {
        let memberCount = [];
        for(let i = nowMemberCount; i < 6; i++) {
            memberCount.push(i)
        }
        setMemberCountList(memberCount)
    }, [nowMemberCount])

    useEffect(() => {
        if(searchStudyCategories?.data) {
            if(setState === 1) {
                let changeSkills = searchStudyCategories.data
                console.log(changeSkills)
                for(let i = 1; i < searchStudyCategories.data.length + 1; i++) {
                    if(skills.includes(i)) {
                        changeSkills[i-1].checkState = true;
                        console.log(i)
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
            console.log(response)
        },
        onError: error => {
            console.log(error)
        }
    })

    const updateStudyGroupMutation = useMutation({
        mutationKey: "updateStudyGroupMutation",
        mutationFn: updateStudyGroup,
        onSuccess: response => {

        },
        onError: error => {

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
    <Modal isOpen={isOpen}>
        <h2>스터디 모집 게시글 작성</h2>
        <div>
            <input type="text" placeholder="제목" onChange={(e) => setStudyTitle(e.target.value)} value={studyTitle || ""}/>
            <ReactQuill 
                modules={modules} 
                value={studyContent}
                onChange={setStudyContent}
            />
        </div>
        <div> {/* 옵션 박스 */}
            <div>
                <div>언어, 프레임워크</div>
                <div>
                    {studySkills.map((checkbox, index) => {
                        return(
                            <div key={index} css={s.checkBoxList}>
                                <input type="checkBox" checked={checkbox.checkState} key={checkbox.studyCategoryId} onChange={() => {checkedOnChange(index)}}/>
                                <div>{checkbox.studyCategoryName}</div>
                            </div>
                        )})
                    }
                </div>
            </div>
            <div>
                <div>인원 수 설정</div>
                <ul onClick={() => setMemberListView(!MemberListView)}> {memberLimitedCount}
                {MemberListView && memberCountList.map((count) => {
                    return(
                        <li key={count} onClick={() => {setMemberLimitedCount(count)}}>{count}</li>
                    )
                })}
                </ul>
            </div>
            <div>
                <div>모집 마감 기간 설정</div>
                    <ReactDatePicker
                        dateFormat='yyyy-MM-dd hh:mm'
                        selected={endDate}
                        showTimeInput
                        onChange={(date) => {setEndDate(date)}}
                    />
            </div>
            <div>
                <button onClick={isClose}>취소</button>
                <button onClick={saveClickButton}>작성</button>
            </div>
        </div>
    </Modal>
  )
}