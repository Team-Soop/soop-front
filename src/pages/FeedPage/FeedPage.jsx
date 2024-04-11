import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../apis/firebase/firebaseConfig";
import { feedRequest } from "../../apis/api/feed";
import { QueryClient, useMutation, useQueryClient } from "react-query";


function FeedPage(props) {
  const [ uploadPhotos, setUploadPhotos ] = useState([]);
  const [ newFeedContent, setNewFeedContent ] = useState("");
  const imgFileRef = useRef();
  const [ contentImg, setContentImg ] = useState([]);
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  const isMountRef = useRef(false);
  const [ feedList, setFeedList ] = useState();

  const saveFeed = useMutation({
    mutationKey: "saveFeed",
    mutationFn: feedRequest,
    onSuccess: response => {
      alert("작성이 완료되었습니다.");
      // window.location.replace("/feed")
      // saveFeedList(principalData.data.userId, newFeedContent, contentImg);
    },
    onError: error => {
      console.log(error);
      alert("게시글을 작성해주세요.");
    }
  })

  // useEffect(() => {
  //   if(isMountRef.current) {
  //     saveFeed.mutate({
  //       userId: principalData.data.userId,
  //       feedContent: newFeedContent,
  //       feedImgUrls: contentImg
  //     })
  //     window.location.replace("/feed")
  //   } else {
  //     isMountRef.current = true;
  //   }
  // }, [contentImg])

  const handleSubmitFeed = () => {
    if(contentImg.length > 0) {
      handleImageUpload();
    }
  }

  const saveFeedList = (userId, content, imgUrls) => {
    const newFeed = {
      userId: userId,
      content: content,
      imgUrls: imgUrls
    };
    setFeedList(feedListState => [...feedListState, newFeed]);
  }

  const handleCancelFeed = () => {
      if (!newFeedContent) return;
      setNewFeedContent("");
  }

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

  const handleFileChange = (e) => {
    const fileArray = Array.from(e.target.files);

    if(fileArray.length === 0) {
      imgFileRef.current.value = "";
      return;
    }

    setUploadPhotos(fileArray);
  }
  
  const handleImageUpload = () => {
    const uploadPromises = [];
    uploadPhotos.forEach((file) => {
      const storageRef = ref(storage, `soop/feed/${principalData.data.userId}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      const promise = new Promise((resolve) => {
        uploadTask.on(
          "state_changed",
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {     
            getDownloadURL(storageRef)
            .then(url => {
              resolve(url);
            })
          }
        );
      })
      uploadPromises.push(promise);
    })

    Promise.all(uploadPromises)
    .then((urls) => {
      console.log(urls);
      setContentImg(urls)
      // saveFeedList(principalData.data.userId, newFeedContent, urls);
      saveFeed.mutate({
        userId: principalData.data.userId,
        feedContent: newFeedContent,
        feedImgUrls: urls
      })
      handleSubmitFeed();
    })
    .catch(error => {
      console.log(error);
    })
  }

  const removeHTMLTags = (html) => {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || "";
  };
  console.log(removeHTMLTags(newFeedContent));

  return (
    
    // 게시글 (피드)
    <div>
      <ul>
          <li>
            <div>
              <img src="" alt="" />
              <span>유저네임</span>
            </div>
            <div>
              <div>{(removeHTMLTags(newFeedContent))}</div>
              {contentImg.map((url, index) => (
                <img key={index} src={url} alt={`Image ${index}`} />
              ))}
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
        <div>
          <img src="" alt="" />
          <div>{principalData?.data.username}</div>
        </div>
        <div >
          <ReactQuill 
            modules={modules} 
            value={newFeedContent} 
            onChange={setNewFeedContent}
            style={{width: "400px"}}
          />
          <input 
            type="file" 
            style={{display: "none"}} 
            onChange={handleFileChange} 
            ref={imgFileRef} 
            multiple={true} 
          />
          <button onClick={() => imgFileRef.current.click()}>사진 선택</button>
          <button onClick={() => {
            handleImageUpload();
            // handleSubmitFeed();
          }}>작성 완료</button>
          <button onClick={handleCancelFeed}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;