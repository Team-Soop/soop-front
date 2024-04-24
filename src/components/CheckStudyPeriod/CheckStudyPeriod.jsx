import React from 'react'

export default function CheckStudyPeriod({timeCount, studyMemberLimited, membercount}) {
    if(timeCount > 0 || studyMemberLimited === membercount) {
        return (
            <div>모집 완료</div>
          )
    } else if (-1 < timeCount < 0) {
        return (
            <>
                <div>모집 중</div>
                <div>H-{timeCount / (60)}</div>
            </>
        )
    } return (
        <>
            <div>모집 중</div>
            <div>D-{timeCount / (24 * 60)}</div>
        </>
    )
}
