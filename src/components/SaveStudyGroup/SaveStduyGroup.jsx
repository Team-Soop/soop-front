/** @jsxImportSource @emotion/react */
import { useEffect, useMemo, useState } from "react";
import * as s from "./style";
import ReactQuill from 'react-quill'
import ReactDatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useInput } from "../../hooks/useInput";
import { useQueryClient } from "react-query";


export default function SaveStduyGroup() {
    const queryClient = useQueryClient();
    const principalData = queryClient.getQueryData("principalQuery");
    const memberCountList = [1, 2, 3, 4, 5, 6];
    const [ studyTitle, titleOnChange ] = useInput("")
    const [ studyContent, setStudyContent] = useState("")
    const [ endDate, setEndDate ] = useState(new Date)
    const [ MemberListView, setMemberListView ] = useState(false);
    const [ memberLimitedCount, setMemberLimitedCount] = useState("최대 멤버 제한")
    const [ studySkils, setStudySkils ] = useState([])

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

    useEffect(() => {
        console.log(studyContent)
    }, [studyContent])

    const [checkboxListTest] = useState([
        {
            id: 1,
            name: 'Java',
            state: false
        },
        {
            id: 2,
            name: 'JavaScript',
            state: true
        },
        {
            id: 3,
            name: 'React',
            state: false
        }
    ])


    const saveClickButton = () => {
        // let studyPost = {
        //     managerUserId: ,
        //     studyTitle: ,
        //     studyContent: ,
        //     studySkils: ,
        //     studyMemberLimited: ,
        //     studyPeriodEnd: ,
        // }
        console.log(principalData.data.userId)
        console.log(studyTitle)
        console.log(studyContent)
        console.log(studySkils)
        console.log(memberLimitedCount)
        console.log(endDate)
    }



  return (
    <>
        <h2>스터디 모집 게시글 작성</h2>
        <div>
            <input type="text" placeholder="제목" onChange={titleOnChange}/>
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
                    {checkboxListTest.map((checkbox, index) => {
                        return(
                            <div key={index} css={s.checkBoxList}>
                                <input type="checkBox" checked={checkbox.state} key={checkbox.id}/>
                                <div>{checkbox.name}</div>
                            </div>
                        )
                    })}
                </div>
            </div>
            <div>
                <div>인원 수 설정</div>
                <ul onClick={() => setMemberListView(!MemberListView)}> {memberLimitedCount}
                {MemberListView && memberCountList.map((count) => {
                    return(
                        <li onClick={() => {setMemberLimitedCount(count)}}>{count}</li>
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
                <button>취소</button>
                <button onClick={saveClickButton}>작성</button>
            </div>
        </div>
    </>
  )
}