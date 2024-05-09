/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../apis/firebase/firebaseConfig";
import { feedRequest } from "../../apis/api/feed";
import { useMutation, useQueryClient } from "react-query";
import userImgNone from "../../assets/images/userProfileNone.png"
import 'react-slideshow-image/dist/styles.css'
import { Slide } from "react-slideshow-image";
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";

function AddFeed() {
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
          // [{ list: 'ordered' }, { list: 'bullet' }],
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

  // 슬라이드쇼 
  const settings = {
    className: "slide-container",
    dots: true,
    autoplay: false,
    infinite: false,
    transitionDuration: 300,
    easing: "ease-in"
  }

  return (
    <div css={s.addFeedLayout}>

      <div css={s.addFeedHeader}>
        <div css={s.addFeedProfileImg}>
          <img 
            css={s.addFeedImg}
            src={
              !!principalData.data.profileImgUrl
              ?
              principalData.data.profileImgUrl
              :
              userImgNone
            } alt="" />
        </div>
        <div css={s.addFeedNickname}>{principalData.data.nickname}</div>
      </div>

      <div css={s.addFeedContents}>
        <div css={s.addFeedImgPrievew}>
          {
            <div className="slide-container">
              <Slide {...settings} 
                prevArrow={<div css={s.slideArrow}><IoIosArrowDropleftCircle /></div>}
                nextArrow={<div css={s.slideArrow}><IoIosArrowDroprightCircle /></div>}
                >
                {loadPhotos.map(photo =>
                    <div key={photo.id} >
                      <img src={photo.dataUrl} css={s.feedImg} alt="" />
                    </div>
                )}
              </Slide>
            </div>
          }
        </div>
        <input 
            type="file" 
            style={{display: "none"}} 
            onChange={handleFileChange} 
            ref={imgFileRef} 
            multiple={true} 
          />
        <div>
          <ReactQuill 
            css={s.addFeedQuill}
            modules={modules} 
            value={newFeedContent} 
            onChange={setNewFeedContent}
          />
          
        </div>

        <div css={s.addFeedFooter}>
          <button onClick={() => imgFileRef.current.click()}>사진 선택</button>
          {/* <button onClick={handleCancelFeed}>글 지우기</button> */}
          <button onClick={() => {handleImageUpload()}}>작성 완료</button>
        </div>
      </div>
    </div>
  );
}

export default AddFeed;
