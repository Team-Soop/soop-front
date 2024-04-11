import { useEffect, useState } from "react";
import { feedListGet } from "../../apis/api/feed";
import { useQueryClient } from "react-query";
import AddFeed from "../../components/AddFeed/AddFeed";


function FeedPage(props) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  const [ feedList, setFeedList ] = useState([]);


  useEffect(() => {
    const getFeedList = async () => {
      try {
        const response = await feedListGet();
        setFeedList(response);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }
    getFeedList();
  }, [])


  // <p></p> 태그 없이 본문만 출력
  const removeHTMLTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  // console.log(removeHTMLTags(newFeedContent));
  
  return (
    
    // 게시글 (피드)
    <div>
      <ul>
          <li>
            <div>
              <img src="" alt="" />
              <div>유저네임</div>
            </div>
              <div >
                <div>test text</div>
                <div>test img</div>
              </div>
            <div>
              <div>좋아요</div>
              <div>댓글</div>
              <div>신고하기</div>
            </div>
          </li>
      </ul>

      {/* 우측 하단 버튼 */}
      <div>
        <button>필터</button>
        <button>글 쓰기</button>
      </div>

      {/* 글쓰기 창 */}
      <div>
        <AddFeed />        
      </div>
     
    </div>
  );
}

export default FeedPage;