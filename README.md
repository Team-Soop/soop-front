

# 📕 목차

> ## [🎗 프로젝트 소개](#-프로젝트-소개-notion)
>
> ## [🎇 팀원 소개](#-팀원-소개-1)
>
> ## [👓 역할 분담](#-역할-분담-1)
>
> ## [🎎 협업 방식](#-협업-방식-1)
>
> ## [📈 프로젝트 진행 상황 관리](#-프로젝트-진행-상황-관리-1)
>
> ## [🎭 브랜치 전략](#-브랜치-전략-1)
>
> ## [🔧 컨벤션](#-컨벤션-1)
>
> ## [⛏ 개발 도구](#-개발-도구-1)
>
> ## [📆 프로젝트 일정](#-프로젝트-일정-1)
>
> ## [📝 API 명세서 & ERD 설계도](#-api-명세서--erd-설계도-1)
>
> ## [📖 메뉴 구조도](#-메뉴-구조도-1)
> 
> ## [📟 화면 구현](#-화면-구현-1)

<br/>
<br/>

## 🎗 프로젝트 소개 [Notion](https://www.notion.so/Soop-Team-Project-ba6a9bd441064444a158e9f979965f73)

![header](https://github.com/Team-Soop/soop-front/assets/125442103/c29467e3-d8c0-4f0c-9c63-4887053313f8)

### 제목

- 커뮤니티 "SOOP"

### 목적

- koreaIt 학원의 강의실 스케줄 정보와 수강생들이 이용 할 수 있는 
자유 게시판, 점심 추천 페이지, 스터디 모임 커뮤니티등 
학원 수강생들의 편의를 위해 제작된 프로젝트 입니다.

### 팀 프로젝트

- 팀원 3명

### 제작 기간

- 2024.04.01 ~ 2024.05.17

### 주요기능

- 회원가입 및 로그인 (권한 설정)

- 유저 

    > 정보수정

    > 자유게시판 글쓰기, 수정, 삭제 

    > 스터디 페이지 글쓰기, 수정, 삭제 / 스터디 인원 글 관리

    > 점심추천 페이지 글쓰기

    > 댓글 쓰기, 수정, 삭제 / 좋아요 / bookmark

    > 게시물 신고하기

    > 자신이 쓴 게시물 관리

- 관리자

    > 스케줄 페이지 관리

    > 신고된 게시물 관리

    > 가입된 유저 관리

</br>
</br>

<p align="right" dir="auto">
    <a href="https://github.com/Team-Soop/soop-front">TOP ↑</a>
<p>

## 🎇 팀원 소개

<div align="center">
<table>
    <thead>
        <tr>
            <th align="center"><span>이정찬(팀장)</span></th>
            <th align="center"><span>김유승</span></th>
            <th align="center"><span>강진영</span></th>
        </tr>
    </thead>
    <tbody>
        <td align="center">
            <a href="https://github.com/chhann">
                <img src="https://github.com/Team-Soop/soop-front/assets/125442103/30bfba73-92cd-4e80-9078-9199d8cbe8a6" width="150" height="150" />
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/ImDoingWell">
                <img src="https://github.com/Team-Soop/soop-front/assets/125442103/9f23c794-5a75-4ce4-bd15-ab1d342f2ac3" width="150" height="150" />
            </a>
        </td>
        <td align="center">
            <a href="https://github.com/kangjy311">
                <img src="https://github.com/Team-Soop/soop-front/assets/125442103/98bad60a-7f19-45d3-86b8-cedea84bae02" width="150" height="150" />
            </a>
        </td>
    </tbody>
</table>
</div>

<p align="right" dir="auto">
    <a href="https://github.com/Team-Soop/soop-front">TOP ↑</a>
<p>

## 👓 역할 분담

<h3> 🙀팀장: 이정찬 </h3>

### 🛠 Back-End

- 유저 회원가입 및 로그인
- 유저 비밀번호 변경
- 이메일 인증
- OAuth2 회원가입 및 로그인
- Oauth2 계정 통합
- Secret Filter 및 JWT 토큰
- 메뉴추천 페이지 작성 및 조회
- BOOK MARK 추가, 삭제 
- 신고 관리
- 유저 관리, 권한 설정
- 알림 보내기


###  🖥 Front-End

- 로그인, 회원가입 페이지
- 메뉴추천 페이지 및 css
- 메뉴추천 상세페이지 
- 관리자 유저 페이지 및 css
- 관리자 신고 페이지 및 css
- 신고 css

### etc.

- 프로젝트 최종 발표

<h3> 🐺팀원: 김유승 </h3>

### 🛠 Back-End

- 스케줄 조회
- 스케줄 등록 및 수정,삭제
- 스케줄 상세 페이지
- 스터디 페이지 등록,조회 및 수정,삭제
- 스터디 상세 페이지
- 스터디 신청 및 수락,거절
- 스터디 검색 필터 및 카테고리 필터
- 알림 조회
- 유저 정보 수정
- 쓴 게시물 조회
- 필터 날짜순

###  🖥 Front-End

- 스케줄 페이지 및 css
- 스케줄 상세 페이지 및 css
- 스터디 페이지 및 css
- 스터디 상세페이지 및 css
- 회원 정보 수정
- 쓴 게시물 페이지 css
- 알림 css

<h3> 🐺팀원: 강진영 </h3>

### 🛠 Back-End

- 자유게시판 조회
- 자유게시판 작성 및 수정, 삭제
- 댓글 작성 및 수정, 삭제
- 좋아요 추가, 삭제
- 쓴 게시물 페이지 조회


###  🖥 Front-End

- 전체적인 lay-out 
- 회원가입 페이지 css
- 로그인 페이지 css
- 쓴 게시물 css
- 자유게시판 페이지 
- 글쓰기 컴포넌트 
- 버튼 컴포넌트 
- 댓글 입력창 및 조회
- 좋아요 조회

> 공동작업

- 디자인 도안 작업
- Front 명세서 작성
- API 명세서 작성
- DB 설계

<p align="right" dir="auto">
    <a href="https://github.com/Team-Soop/soop-front">TOP ↑</a>
<p>

<br/>
<br/>

## 🎎 협업 방식

1. 해당하는 업무에 대해 GitHub Issue를 생성합니다.
2. GitHub Actions에 의해 자동으로 생성된 브랜치로 전환하여 해당하는 업무를 진행합니다.
3. 작업을 완료하면 각자의 생성한 브랜치에서 코드를 push합니다.
4. PR(Pull Request) 을 오픈합니다.

-   PR(pull request)을 오픈하면, 팀장이 코드를 확인하고 승인합니다.

-   코드 리뷰 & 승인은 팀장이 일임했지만, 팀원들의 코드 스타일은 다같이 공유하며 서로 잘 이해할 수 있도록 다 같이 정리하는 시간을 가지도록 하였습니다.


5. PR이 merge되어 close 되면 해당 이슈는 자동으로 Done상태로 변경됩니다.

<p align="right" dir="auto">
    <a href="https://github.com/Team-Soop/soop-front">TOP ↑</a>
<p>

<br/>
<br/>

## 📈 프로젝트 진행 상황 관리



-   <a href="https://github.com/Team-Soop/soop-front/issues">📋 GitHub Issues(Front) </a>&
    <a href="https://github.com/Team-Soop/soop-back/issues"> GitHub Issues(Back) </a>
    -   간편한 이슈 생성을 위해 이슈 템플릿을 만들어 사용했습니다. + 팀원이 현재 어떤 작업을 진행하고 있는지를 바로 알 수 있어 의사소통 비용을 줄일 수 있었습니다.    
-   <a href="https://github.com/orgs/Team-Soop/projects/4">📁 GitHub Projects</a>
    -   칸반 보드로 프로젝트 진행 상황을 한 눈에 확인할 수 있어 일정을 관리하기 수월했습니다.

<p align="right" dir="auto">
    <a href="https://github.com/Team-Soop/soop-front">TOP ↑</a>
<p>

<br/>
<br/>

## 🎭 브랜치 전략

<h3>💡 GitHub Flow 전략</h3>

-   개발과 동시에 지속적으로 배포를 진행할 것이 아니라, 기능을 모두 개발하고 최종적으로 배포를 할 예정이었기 때문에 Git flow에 비해 흐름이 단순해짐에 따라 그 규칙도 단순한 GitHub Flow 전략이 적합하다고 생각했습니다.

-   프로젝트 기간 동안 팀원들이 같은 시간에 작업하기 때문에 잦은 충돌이 발생할 것을 우려하여 충돌의 크기를 줄이고자 GitHub Flow 전략을 채택하여 작은 단위로 이슈를 쪼개 이슈 별로 브랜치를 분기하고 main 브랜치에 지속적으로 merge 하는 방식으로 진행했습니다.

-   기본적으로 master branch에 대한 규칙만 정확하게 정립되어 있다면 나머지 가지들에 대해서는 특별한 관여를 하지 않으며 pull request기능을 사용하도록 권장하였습니다.

<p align="right" dir="auto">
    <a href="https://github.com/Team-Soop/soop-front">TOP ↑</a>
<p>

<br/>
<br/>

## 🔧 컨벤션

팀원 간의 원활한 소통과 협업을 위해 커밋 컨벤션과, 코드 컨벤션을 만들어 이를 따랐습니다. 리드미에는 간략히 작성하고, 자세한 컨벤션은 각각의 타이틀에 링크된 깃허브 위키에 적어두었습니다.

<h3>
    <a href="https://mangrove-comic-a17.notion.site/Git-Commit-Message-Convention-8e5410868b7d4bb6a9e61e976d638963">📍 커밋 컨벤션</a>
</h3>

<div>
<pre background-color="#dbdbdb">
<p>
1. 커밋 유형 지정
    - 커밋 유형은 영어 대문자로 작성하기
    - 커밋 유형
    - Feat : 새로운 기능 추가
    - Fix : 버그 수정
    - Docs : 문서 수정
    - Style : 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우
    - Refactor : 코드 리팩토링
    - Test : 테스트 코드, 리팩토링 테스트 코드 추가
    - Chore : 패키지 매니저 수정, 그 외 기타 수정 ex) .gitignore
    - Design : CSS 등 사용자 UI 디자인 변경
    - Comment : 필요한 주석 추가 및 변경
    - Rename : 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우
    - Remove : 파일을 삭제하는 작업만 수행한 경우
    - !BREAKING CHANGE : 커다란 API 변경의 경우
    - !HOTFIX : 급하게 치명적인 버그를 고쳐야 하는 경우

🧾 2. 제목과 본문을 빈행으로 분리 - 커밋 유형 이후 제목과 본문은 한글로 작성하여 내용이 잘 전달될 수 있도록 할 것 - 본문에는 변경한 내용과 이유 설명 (어떻게보다는 무엇 & 왜를 설명)

#️⃣ 3. 제목 첫 글자는 대문자로, 끝에는 . 금지

↩️ 4. 제목은 영문 기준 50자 이내로 할 것

⏺️ 5. 자신의 코드가 직관적으로 바로 파악할 수 있다고 생각하지 말자

👆 6. 여러가지 항목이 있다면 글머리 기호를 통해 가독성 높이기

</p>
</pre>
</div>

<h3>
<a href="https://mangrove-comic-a17.notion.site/Code-Convention-ed0bf7dc4b974f17acae503ba05efc24?pvs=74">📍 코드 컨벤션</a>
</h3>
<div>
<pre>
<p>
🛼 문자열을 처리할 때는 쌍따옴표를 사용하도록 합니다.

🐫 문장이 종료될 때는 세미콜론을 붙여줍니다.

💄 함수명, 변수명은 카멜케이스로 작성합니다.

🐫 가독성을 위해 한 줄에 하나의 문장만 작성합니다.

❓ 주석은 설명하려는 구문에 맞춰 들여쓰기 합니다.

🔠 연산자 사이에는 공백을 추가하여 가독성을 높입니다.

🔢 콤마 다음에 값이 올 경우 공백을 추가하여 가독성을 높입니다.

💬 생성자 함수명의 맨 앞글자는 대문자로 합니다.

🔚 var는 절대 사용하지 않는다. (const를 let 보다 위에 선언한다)

👆 const와 let은 사용 시점에 선언 및 할당을 한다. (함수는 변수 선언문 다음에 오도록한다.)

✏️ 외부 모듈과 내부 모듈을 구분하여 사용한다.

🧮 배열과 객체는 반드시 리터럴로 선언한다. (new 사용 X)

📠 배열 복사 시 반복문을 사용하지 않는다.

😎 배열의 시작 괄호 안에 요소가 줄 바꿈으로 시작되었다면 끝 괄호 이전에도 일관된 줄 바꿈 해야한다. (일관되게 모두 줄 바꿈을 해주어야 한다.)

🧶 객체의 프로퍼티가 1개인 경우에만 한 줄 정의를 허용하며, 2개 이상일 경우에는 개행을 강제한다. (객체 리터럴 정의 시 콜론 앞은 공백을 허용하지 않음 콜론 뒤는 항상 공백을 강제)

🧂 메서드 문법 사용 시 메서드 사이에 개행을 추가한다.

🌭 화살표 함수의 파라미터가 하나이면 괄호를 생략한다.

🍳 변수 등을 조합해서 문자열을 생성하는 경우 템플릿 문자열을 이용한다.

🧇 변수 등을 조합해서 문자열을 생성하는 경우 템플릿 문자열을 이용한다.

🥞 wildcard import는 사용하지 않는다. (import문으로부터 직접 export하지 않는다.)

🥖 한 줄짜리 블록일 경우라도 {}를 생략하지 않으며 명확히 줄 바꿈 하여 사용한다.

🥯 switch-case 사용 시 첫 번째 case문을 제외하고 case문 사용 이전에 개행한다.

🥐 삼중 등호 연산자인 ===, !==만 사용한다.

🚐 반복문 사용은 일반화된 순회 메서드 사용을 권장한다.

🚑 람다함수 안에서 밖에 있는 변수를 사용하지 말라

🚚 코드 블럭 주석 처리를 위해서는 한 줄 주석을 사용한다. 여러 줄 주석을 작성할 때는 \*의 들여쓰기를 맞춘다. 주석의 첫 줄과 마지막 줄은 비워둠

💫 시작 괄호 바로 다음과 끝 괄호 바로 이전에 공백이 있으면 안 된다.

</p>
</pre>
</div>

<p align="right" dir="auto">
    <a href="https://github.com/Team-Soop/soop-front">TOP ↑</a>
<p>

<br/>
<br/>


## ⛏ 개발 도구

### 1. Back-End

<p>
<img src="https://img.shields.io/badge/Java-007396?style=for-the-badge&logo=Java&logoColor=white"/>
<img src="https://img.shields.io/badge/SpringBoot-6DB33F?style=for-the-badge&logo=SpringBoot&logoColor=white"/>
<img src="https://img.shields.io/badge/Amazon Aws-232F3E?style=for-the-badge&logo=Amazon Aws&logoColor=white"/>
<img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=Firebase&logoColor=white"/>
</p>

### 2. Front-End

<p>
<img src="https://img.shields.io/badge/JAVASCRIPT-F7DF1E?style=for-the-badge&logo=JAVASCRIPT&logoColor=black"/>
<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=HTMl5&logoColor=white"/>
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=CSS3&logoColor=white"/>
</p>

### 3. Database

<img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=MySQL&logoColor=white"/>

### 4. SCM & Deployment

<p>
<img src="https://img.shields.io/badge/Git-181717?style=for-the-badge&logo=Git&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=Docker&logoColor=white">
</p>

### 5. Library

-   ### Back-end

<p>
<img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON Web Tokens&logoColor=white"/><img src="https://img.shields.io/badge/MyBatis-271e1f?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAYAAADgdz34AAAACXBIWXMAAAsTAAALEwEAmpwYAAABuElEQVR4nO3US4hPcRQH8H9RI+Wx8FohkVfkUdQkC5FXxs6WhZSysSBCTWyRZpryWDHZi7LxSGRBKUtKMmGiRB6ZIvPRqbP4u917/zP/maXv6t77u+f7Ped8z/k1GiMANuI29mJuY7yBM/7F2bGQLcR2TMR8rMVsHMJd/MSftirBKgwrx03Mwv1839BuBdHnAfzCezzH1yR9gjv53IdH+IR3uIWudkXn4G0Sf8GQapxuV2QLvmENJqRXXTiGG0k+lAmsrCLpRTc2Y2rJ+YqKuGhVYFmrLPubSh1ODx7jepSOzoq4+E8mNg+TyxKMH1fnCNahP1pUiNuKF2n2ASzBDxwuE7moNQ5iJqZVVLQYr7G+7HA6XrYQuIxd+I2HOIUdafyUaA/WFSttFlmEjzUCx7G/5rynzuiOVI9snpYED2R77tUI7C4jjrKOYjAn6Fx+25bP13ACM3L2qxDxHc3Em3A1l6iID7iAPblo0ZYH6nGkmPl544dncQuXtWcfvo+RfBALWl1ol3L0RotXWF5JXhBamstW5kkRkcyV2J0RkReEJmFnehTGvsHnvLZjuU7GKI+a+D8aBfwFL0hrRFV1ciwAAAAASUVORK5CYII=&logoColor=white">
<img src="https://img.shields.io/badge/Lombok-ca0124?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEeElEQVR4nO2aW4hVVRjHP01HzZJGJcpuU6l00Uqzgl4sCrqgDz5IZZjZQxlEaKBJWVA9pEEG3QkqESrtAqWhY+WDQZBpF2ys1DLz0s3spqU2Nr/42GvR19eZaVpzBtaZs39wmLPP3vs/a+219ndbS6SkpKSkpKSk1gEOA14H/gBukXoDmMHfvCf1BHAU8L15AHOlngAeNJ3/Augv9QIwAjhoHsAkqSeAl03nV0tPAjgDuBt4E9gItAAXm/NnAW2h8/r3HOkJAKcElxY7Z1lmrnvE/L5cegLAJGAflTkE3GCu3WnOfQyMlFoGmBw6GWkFloTfTwcGmWsHVHhAvwDjpRYBTnMj/2lH7zQwtJ1Zshc4U2oNYIXr/OBOhL77jQHUjkc+AHpLrQCMcu/52Z2870Vz33bgN3N8tdQKwP2m4Uv/x30nAdvCfa8C9xidt6RWoAhfIxPduaOBdcAmf87kAZcBhwPHGNeps6FBcgcYZzr/M9DPnZ/mjNzzQFMHel+aa0+U3AEWmAYvrnB+mOtUdI865a8HRodZol5kivMkx0nOAL2Are1Nf3PdIOCpdiLD9mjNPisELu1o+le4/oIw8n924gF8KLkDrDQNfiMYLv3b9z/uawJuDpng2mBE1VD+aPRulBrw/W2hsTqi35nGj0rQ09kR+QkYKDkDLDINft98/wrok6C32GgslJyhmMK2imOt/KwEPfUCB8L9OqtGSM4AL5kOf+YM4ZEJevOMRrPkDDDeNLbNjf78BL2BwG6jMUFyhSKD+8g0dr35/quGsgmas41GS9ZZIIXrivwO7DHHdyToaVHkW6MxWXIFODWMcuRdl8oOSNCcaTQ+yXb0gb4hYLGuzkZz1yVo9gd2GY1rJFeA+1yMriMeWa05QRct/2a1L5Kx1T9kGvuOM3xNCZrDXAnsKskRYLhzUS0uo0uK14EXjMbbKTOo2wEGhypOZI8zgs2JU3+i0dCZNUZyA+gHrDEN3e8ehhrBoQm6jW4x5CHJDaCPFjZNI3XKL3P+f2xi8URrAZHPtQ4oOQE0AK/wT+4EnjPH0xK1b3NTP68VIAq/vNx1/olw7njgMWB6ovYVwX1G7pKcoEhIVrnOP1mNsrS+Ls7lNWcV8VGEuBtc51eFabqxK++prg26SpHqNUouUCxI2IRGmQ+8Zo7PTdQ+D/jB6HytK0GSAxQW+XYX4WmF56Zw/vyQ9i5KCVGBqcFbRL5JqRN256akNW7UdXQurIK2prePOu1tWZS4KPz7bDcyMbY/tgr6lwBbnLYWTE6oTg+6bujWuca1hve9oQrl8aUVVn2ezmJlh6Liandhxg0IY7ug2Vt3e4WFDb/Ko//rWskFim1qNqafm1i31/f7IuABYAf/Rh/EM8AQyQngWdPIe0NCYj9HmDC4MdT8dUPTlcCtwMMhZY11+0odX5KNlfcAc+ge1HMs1IclOQMMcSWsVNrCXj7d3Hh5tiWsSgAnh50ZO8MKrP3EjUkHwvHWELLq9tbHQxY3ISX/LykpKSkpKZHu5C8+ETRdu+5D6AAAAABJRU5ErkJggg==&logoColor=white">
</p>

-   ### Front-end
<p>
<img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=Axios&logoColor=white"/>
<img src="https://img.shields.io/badge/React Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white"/>
<img src="https://img.shields.io/badge/React Router-CA4245?style=for-the-badge&logo=React Router&logoColor=white"/>
<img src="https://img.shields.io/badge/Emotion-cb0096?style=for-the-badge&logo=react&logoColor=white">
</p>

### ⛓️ pom.xml(Back-end)

| 라이브러리                          | 용도                                  |
| ----------------------------------- | ------------------------------------- |
| lombok                              | 어노테이션(@)으로 코드 자동 생성      |
| spring-boot-starter-security        | spring security 적용                  |
| spring-boot-starter-validation      | 입력 값 검증                          |
| spring-boot-starter-web             | Spring Web 프로젝트에 필수 라이브러리 |
| spring-boot-starter-test            | 프로젝트 작동을 테스트하는 역할       |
| mybatis-spring-boot-starter         | 백엔드에서 MyBatis 문법 적용          |
| spring-boot-devtools                | 빠른 재시작                           |
| mysql-connector-java                | DB인 MySQL과 연결                     |
| jjwt-api / jjwt-impl / jjwt-jackson | JWT(JSON Web Token) 활용              |
| spring-boot-starter-oauth2-client   | Oauth2 인증                           |
| spring-boot-starter-aop             | spring aop 적용                       |
| spring-boot-starter-thymeleaf       | 동적인 화면 생성의 역할               |

### ⛓️ node_modules(Front-end)

| 모듈 이름                                                                   | 용도                                       |
| --------------------------------------------------------------------------- | ------------------------------------------ |
| emotion/react, emotion/styled                                               | 리액트 내 css 적용                         |
| portone/browser-sdk                                                         | QR 코드로 결제 기능 구현                   |
| testing-library/jest-dom, testing-library/react, testing-library/user-event | 리액트 dom 테스트                          |
| axios                                                                       | 서버로 요청을 보내 통신                    |
| firebase                                                                    | 저장된 이미지를 업로드                     |
| react-dom, react-router-dom                                                 | 주소 요청 발생 시 각 페이지로 이동         |
| react-icons                                                                 | 리액트 아이콘을 불러와 사용                |
| react-query                                                                 | 서버 데이터 동기화(fetching, caching) 지원 |
| react-select                                                                | select 요소를 쉽게 사용                    |
| react-modal                                                                 | 모달 창 쉽게 사용                     |
| react, react-scripts                                                        | 리액트 라이브러리 적용                     |
| recharts                                                                    | 가져온 데이터를 차트로 시각화하는 역할     |
| recoil                                                                      | 전역 상태 관리                             |
| styled-reset                                                                | 초기 CSS 스타일 재설정                     |
| react-quill                                                                 | 글작성 모달 및 커스텀 가능                 |
| react-slideshow-image                                                       | 슬라이드 커스텀 가능                      |

<p align="right" dir="auto">
    <a href="https://github.com/Team-Soop/soop-front">TOP ↑</a>
<p>

<br/>
<br/>

## 📆 프로젝트 일정

![스크린샷 2024-05-07 오전 11 43 01](https://github.com/Team-Soop/soop-front/assets/125442103/77ea9119-edb6-4e0a-8114-e7565f67bb40)
![스크린샷 2024-05-07 오전 11 43 05](https://github.com/Team-Soop/soop-front/assets/125442103/67ce9bb3-a7fb-4a1a-a8ff-f26c5a0580eb)

<p align="right" dir="auto">
    <a href="https://github.com/Team-Soop/soop-front">TOP ↑</a>
<p>

<br/>
<br/>




## 📝 API 명세서 & ERD 설계도

### - API 명세서

https://www.notion.so/API-7880fc2a9cdc496da839793e14437be3


### - ERD 설계도

![ERD 다이어그램](https://github.com/Team-Soop/soop-front/assets/125442103/5a49020c-52c2-4cf1-a322-6ce49190d600)

<p align="right" dir="auto">
    <a href="https://github.com/Team-Soop/soop-front">TOP ↑</a>
<p>

<br/>
<br/>

## 📖 메뉴 구조도

### - 사용자 메뉴 구조도

![사용자 메뉴 구조도](https://github.com/Team-Soop/soop-front/assets/125442103/6b37c498-7761-4d27-8b7a-326144a4491e)

<p align="right" dir="auto">
    <a href="https://github.com/Team-Soop/soop-front">TOP ↑</a>
<p>

<br/>
<br/>

## 📟 화면 구현

### 🧨계정 화면

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-back/assets/125442103/9449f60f-dddc-484c-ba85-44ee6a3e4088" align="center" width="100%"/>
    <b>로그인 화면</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/ca2de214-4834-48ff-b8dc-d66b8db76076" align="center" width="100%"/>
    <b>로그아웃 화면</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/1ea0b7a5-562e-4413-b9e1-c33aed001927" align="center" width="100%"/>
    <b>회원가입 화면</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/ca2de214-4834-48ff-b8dc-d66b8db76076" align="center" width="100%"/>
    <b>로그아웃 화면</b>
</div>
<br/>
<br/>

### 🎞게시물 화면

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/a33e1040-8491-4a72-82ef-a436a35d4d76" align="center" width="100%"/>
    <b>자유게시판 작성 화면</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/d7241798-43c6-4b4c-a856-8f9db8b495da" align="center" width="100%"/>
    <b>댓글 작성</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/5ab5b933-9291-4d15-a01f-79bfb7dc9c67" align="center" width="100%"/>
    <b>댓글 수정</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/456b01a2-cb44-4db3-a6c8-69101b52ba06" align="center" width="100%"/>
    <b>댓글 삭제</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/4aba636c-3fce-48ae-b303-1f2e4cafafcf" align="center" width="100%"/>
    <b>스케줄 조회</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/73b096ae-8e5f-43c2-911c-5acc2336cfc3" align="center" width="100%"/>
    <b>스케줄 등록</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/d7c870e4-c535-44d1-a0a7-fa73095bbf76" align="center" width="100%"/>
    <b>스케줄 수정</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/aed58577-0cd4-46c2-a50f-1e8cfea1785e" align="center" width="100%"/>
    <b>스케줄 삭제</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/de4f7273-6354-4fc7-8498-4d6192d6c060" align="center" width="100%"/>
    <b>스터디 카테고리 조회</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/f1837bde-6a43-42f7-b125-129776e9600a" align="center" width="100%"/>
    <b>스터디 작성</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/fc3d0b9f-c5d2-4cdf-806e-02a2e096c158" align="center" width="100%"/>
    <b>스터디 수정</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/673154d8-006c-49df-80c7-1a63f52cbb55" align="center" width="100%"/>
    <b>스터디 삭제</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/f17a1e43-6566-4352-9a66-e716be852635" align="center" width="100%"/>
    <b>스터디 신청 관리</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/f1141fd9-4c2e-4dca-bca8-05ccd373bb51" align="center" width="100%"/>
    <b>필터 순서</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/34488403-1df2-4088-9719-c11178ac231c" align="center" width="100%"/>
    <b>좋아요</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/28b780e5-88af-431e-a24e-40836a5a297e" align="center" width="100%"/>
    <b>즐겨찾기</b>
</div>
<br/>
<br/>

### 🏸관리자 화면

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/45947d0b-ed38-4642-9b33-4db547647dfb" align="center" width="100%"/>
    <b>유저 조회</b>
</div>
<br/>

<div align="center" dir="auto">
    <img src="https://github.com/Team-Soop/soop-front/assets/125442103/d8fd0ab1-b1c2-4ddc-b95a-73e82106f640" align="center" width="100%"/>
    <b>유저 권한 변경</b>
</div>
<br/>

<p align="right" dir="auto">
    <a href="https://github.com/Team-Soop/soop-front">TOP ↑</a>
<p>
