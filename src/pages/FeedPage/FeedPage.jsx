import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../apis/firebase/firebaseConfig";
import { feedRequest } from "../../apis/api/feed";
import { QueryClient, useMutation, useQueryClient } from "react-query";


function FeedPage(props) {
  const [ feeds, setFeeds ] = useState([]);
  const [ newFeed, setNewFeed ] = useState("");
  const [ uploadPhotos, setUploadPhotos ] = useState([]);
  const uploadFilesId = useRef(0);
  const imgFileRef = useRef();

  const addtest = useMutation({
    mutationKey: "addtest",
    mutationFn: feedRequest,
    onSuccess: response => {
      console.log("ㅇㅇ")
      console.log(contentImg)
      console.log(principalData.data.userId)
       console.log(newFeedContent) 
    },
    onError: error => {
      console.log("ㄴㄴ")
      console.log(contentImg)
      console.log(principalData.data.userId)
      console.log(newFeedContent)
    }
  })

  const handleSubmitFeed = () => {
    addtest.mutate({
      userId: principalData.data.userId,
      feedContent: newFeedContent,
      feedImgUrls: contentImg
    })
    console.log(contentImg);
    // feedRequest({
      // userId: principalData.data.username,
      // feedContent: newFeedContent,
      // feedImgUrls: contentImg
    // }).then(response => {
    //   console.log(response)
    // })
      const updateFeeds = [...feeds, { content: newFeed }];
      setFeeds(updateFeeds);
      setNewFeed("");
  }

  const handleCancelFeed = () => {
      if (!newFeed) return;
      setNewFeed("");
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

  console.log(newFeed);

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
        console.log(e.target.result);
      }
      fileReader.readAsDataURL(file.originFile);
      console.log(file.originFile);
    }))    

    Promise.all(promises)
    .then(result => {
      console.log(result);
    })

  }
  
  const handleImageUpload = () => {
    // const file = uploadPhotos[0];
    uploadPhotos.forEach((file) => {
      console.log(uploadPhotos);
      console.log(file.name);
      const storageRef = ref(storage, `soop/test/${file.name}`);
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
              console.log(url);
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
      uploadTask.on(
        "state_changed",
        (snapshot) => {},
        (error) => {
          console.log(error);
        },
        () => {     
          getDownloadURL(storageRef)
          .then(urls => {
            console.log(urls);
          })
        }
      );

    })
  }

  console.log(contentImg);

  return (
    <div>
      <ul>
        <li>
          <div>
            <img src="" alt="" />
            <span>사용자 이름</span>
          </div>
          <div>
            <div>test</div>
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
            value={newFeed} 
            onChange={setNewFeed}
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