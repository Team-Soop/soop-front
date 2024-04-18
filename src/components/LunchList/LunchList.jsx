/** @jsxImportSource @emotion/react */
import * as s from "./style";
import DOMPurify from "dompurify";
import { useQuery } from "react-query";

function LunchList({profileImgUrl, nickName, placeName, categroies, title, imgUrls, content}) {

  const sanitizer = DOMPurify.sanitize;


  return (
    <div css={s.Layout}>

      <div>
        카테고리: {categroies}
      </div>

      <div>
        프로필이미지: {profileImgUrl}
      </div>

      <div>
        닉네임: {nickName}
      </div>

      <div>
        가게이름: {placeName}
      </div>

      <div>
        글 제목: {title}
      </div>

      <div>
        {
          !!imgUrls ? 
          imgUrls.map((imgUrl, idx) => 
            <img css={s.imgLayOut} 
              key={idx} 
              src={imgUrl}
            />
          )
          :
          <p>사진없음</p>
        }
      </div>

      <div>
        글 내용:<div dangerouslySetInnerHTML={{__html: sanitizer(content)}}></div>
      </div>


    </div>
  );
}

export default LunchList;