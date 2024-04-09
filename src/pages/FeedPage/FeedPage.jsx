import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../apis/firebase/firebaseConfig";
import { feedRequest } from "../../apis/api/feed";
import { QueryClient, useMutation, useQueryClient } from "react-query";


function FeedPage(props) {
  const [ uploadPhotos, setUploadPhotos ] = useState([]);
  const [ newFeedContent, setNewFeedContent ] = useState("");
  const uploadFilesId = useRef(0);
  const imgFileRef = useRef();
  const [ contentImg, setContentImg ] = useState([]);
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");

  const saveFeed = useMutation({
    mutationKey: "saveFeed",
    mutationFn: feedRequest,
    onSuccess: response => {
      alert("작성이 완료되었습니다.");
    },
    onError: error => {
      console.log(error);
      alert("게시글을 작성해주세요.");
    }
  })

  const handleSubmitFeed = () => {
    saveFeed.mutate({
      userId: principalData.data.userId,
      feedContent: newFeedContent,
      feedImgUrls: contentImg
    })
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

  console.log(newFeedContent);

  const handleFileChange = (e) => {
    console.log(e.target.files);
    const fileArray = Array.from(e.target.files);

    if(fileArray.length === 0) {
      imgFileRef.current.value = "";
      return;
    }

    setUploadPhotos(fileArray);
    
    let promises = [];
    
    const uploadFiles = fileArray.map(file => {
      return {
        id: uploadFilesId.current += 1,
        originFile: file,
        url: ""
      }
    })

    promises = uploadFiles.map(file => new Promise((resolve) => {
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        resolve(e.target.result);
      }
      fileReader.readAsDataURL(file.originFile);
    }))    

    Promise.all(promises)
    .then(result => {
      
    })

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
    })
  }

  return (
    <div>
      <ul>
        <li>
          <div>
            <img src={contentImg} alt="" />
            <span>사용자 이름</span>
          </div>
          <div>
            <div>test</div>
            <div>img</div>
          </div>
          <div>
            <div>좋아요</div>
            <div>댓글</div>
            <div>신고하기</div>
          </div>
        </li>
      </ul>

      <div>
        <button>필터</button>
        <button>글 쓰기</button>
      </div>

      <div>
        <div>
          <img src="" alt="" />
          <div>사용자 이름</div>
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
            handleSubmitFeed();
            handleImageUpload();
          }}>작성 완료</button>
          <button onClick={handleCancelFeed}>취소</button>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;