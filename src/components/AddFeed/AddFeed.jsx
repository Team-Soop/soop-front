import { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../apis/firebase/firebaseConfig";
import { feedListGet, feedRequest } from "../../apis/api/feed";
import { QueryClient, useMutation, useQueryClient } from "react-query";


function AddFeed(props) {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  const [ uploadPhotos, setUploadPhotos ] = useState([]);
  const [ newFeedContent, setNewFeedContent ] = useState("");
  const [ contentImg, setContentImg ] = useState([]);
  const [ loadPhotos, setLoadPhotos ] = useState([]);
  const imgFileRef = useRef();

  const saveFeed = useMutation({
    mutationKey: "saveFeed",
    mutationFn: feedRequest,
    onSuccess: response => {
      alert("작성이 완료되었습니다.");
      window.location.replace("/feed")
    },
    onError: error => {
      console.log(error);
      alert("게시글을 작성해주세요.");
    }
  })

    // console.log(getFeedList);

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

    // 미리보기
    const filePromiseArray = fileArray.map(
      (file) =>
        new Promise(
          (resolve) => {
            const fileReader = new FileReader();

            fileReader.onload = (e) => {
              resolve(e.target.result);
            }

            fileReader.readAsDataURL(file);
          }
        )
    );

    Promise.all(filePromiseArray).then(
      (result) => {
        setLoadPhotos(() => result.map(
          (dataUrl, index) => {
            return {
              id: index + 1,
              dataUrl
            }
          }
        ));
      }
    );

  }

  const handleImageUpload = () => {
    const uploadPromises = [];
    uploadPhotos.forEach((file) => {
      const storageRef = ref(storage, `soop/feed/${principalData.data.userId}/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      const promise = new Promise(
        (resolve) => {
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
      saveFeed.mutate({
        userId: principalData.data.userId,
        feedContent: newFeedContent,
        feedImgUrls: urls
      })
    })
    .catch(error => {
      console.log(error);
    })
  }


  return (
    <div>
      <div>
        <div>
          <img src="" alt="" />
          <div>{principalData?.data.username}</div>
        </div>
        <div >
          <div>
            미리보기
            {
              loadPhotos.map(
                photo =>
                  <div key={photo.id}>
                    <img src={photo.dataUrl} alt="" />
                  </div>
              )
            }
          </div>
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
          <button onClick={() => {handleImageUpload()}}>작성 완료</button>
          <button onClick={handleCancelFeed}>취소</button>
          {/* 취소누르면 add창 없어지게 하기 */}
        </div>
      </div>
    </div>
  );
}

export default AddFeed;
