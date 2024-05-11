/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useMutation, useQueryClient } from "react-query";
import { useMemo, useRef, useState } from "react";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../apis/firebase/firebaseConfig";
import ReactQuill from "react-quill";
import { lunchRequest } from "../../apis/api/lunch";
import { useQuillContent } from "../../hooks/quillContent";
import LunchMap from "./LunchMap/LunchMap";
import {
  lunchMapPlaceUrlState,
  lunchMapTitlState,
  lunchMapXState,
  lunchMapYState,
} from "../../atoms/luchMapAtom";
import { useRecoilState } from "recoil";
import { lunchCategories } from "../../constants/lunchCategroies";
import { Slide } from "react-slideshow-image";
import 'react-slideshow-image/dist/styles.css'
import { IoIosArrowDropleftCircle, IoIosArrowDroprightCircle } from "react-icons/io";
import { FiPlusCircle } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";




function LunchWrite() {
  const queryClient = useQueryClient();
  const principalData = queryClient.getQueryData("principalQuery");
  const [lunchTitle, setLunchTitle] = useState("");
  const [placeName, setPlaceName] = useRecoilState(lunchMapTitlState);
  const [placeX, setPlaceX] = useRecoilState(lunchMapXState);
  const [placeY, setPlaceY] = useRecoilState(lunchMapYState);
  const [placeUrl, setPlaceUrl] = useRecoilState(lunchMapPlaceUrlState);
  const [uploadPhotos, setUploadPhotos] = useState([]);
  const [lunchContent, lunchContentChange, lunchContentMessage] = useQuillContent("quilContent");
  const [checkCategories, setcheckCategories] = useState([]);
  const [loadPhotos, setLoadPhotos] = useState([]);
  const imgFileRef = useRef();
  const [isAddPhotos, setIsAddPhotos] = useState(false);


  const modules = useMemo(() => ({
    toolbar: {
      container: 
      [
        [{ size: ["small", false, "large", "huge"] }],
        [{ align: [] }],
        // ["bold", "italic", "underline", "strike"],
        [{ list: "ordered" }, { list: "bullet" }],
        [{ color: [] }, { background: [] }],
        [{ header: 1 }, { header: 2 }],
        [{ clean: "clean" }]
      ],
    },
  }));


  // 슬라이드쇼 
  const settings = {
    className: "slide-container",
    dots: true,
    autoplay: false,
    infinite: loadPhotos.length > 1 ? true : false,
    transitionDuration: 300,
    easing: "ease-in"
  }

  const saveLunch = useMutation({
    mutationKey: "saveLunch",
    mutationFn: lunchRequest,
    onSuccess: (response) => {
      alert("작성이 완료되었습니다.");
      window.location.replace("/lunch")
    },
    onError: (error) => {

    },
  });

  // 사진 선택하면 상태 두게에 값 넣기
  // 1. firebase 주소로 변경할 상태 setUploadPhotos
  // 2. 미리보기를 보여주기위한 상태 setLoadPhotos
  const handleFileChange = (e) => {
    const fileArray = Array.from(e.target.files);

    if (fileArray.length === 0) {
      imgFileRef.current.value = "";
      return;
    }

    setUploadPhotos(fileArray);

    const filePromiseArray = fileArray.map(
      (file) =>
        new Promise((resolve) => {
          const fileReader = new FileReader();

          fileReader.onload = (e) => {
            resolve(e.target.result);
          };

          fileReader.readAsDataURL(file);
        })
    );

    Promise.all(filePromiseArray).then((result) => {
      setLoadPhotos(() =>
        result.map((dataUrl, index) => {
          return {
            id: index + 1,
            dataUrl,
          };
        })
      );
    });
  };

  // 사진과 글 내용 post로 요청 보내기
  const handleImageUpload = () => {
    if (lunchContent === "") {
      alert("글 내용을 입력하세요");
      return;
    }
    if (!placeName || !placeX || !placeY) {
      alert("지도를 검색하여 가게를 선택해 주세요!");
      return;
    }

    const uploadPromises = [];

    uploadPhotos.forEach((file) => {
      const storageRef = ref(
        storage,
        `soop/lunch/${principalData.data.userId}/${file.name}`
      );
      const uploadTask = uploadBytesResumable(storageRef, file);

      const promise = new Promise((resolve) => {
        uploadTask.on(
          "state_changed", // uploadTask 상태가 변할때마다 snapshot 상태를 kb 백분율로 찍음
          (snapshot) => {},
          (error) => {
            console.log(error);
          },
          () => {
            // 업로드 완료시 동작하는 로직
            getDownloadURL(storageRef).then((url) => {
              resolve(url);
            });
          }
        );
      });
      uploadPromises.push(promise);
    });

    Promise.all(uploadPromises)
      .then((urls) => {
        console.log(urls);
        saveLunch.mutate({
          userId: principalData.data.userId,
          lunchTitle: lunchTitle,
          lunchContent: lunchContent,
          lunchCategories: checkCategories,
          placeName: placeName,
          placeX: placeX,
          placeY: placeY,
          placeUrl: placeUrl,
          lunchImgUrls: urls,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };


  // category가 변경될 때 실행되는 함수
  const handleCategoryChange = (categoryNumber, isChecked) => {
    // category의 boolean 상태에 따라 배열 업데이트
    if (isChecked) {
      if(checkCategories.length > 4) {
        alert("최대 5개만 선택 가능합니다")
        return false;
      } 
      setcheckCategories((prevCheckedCategory) => [
        ...prevCheckedCategory,
        categoryNumber,
      ]);
      
    } else {
      setcheckCategories((prevCheckedCategory) =>
        prevCheckedCategory.filter((category) => category !== categoryNumber)
      );
    }
  };

//   const handleCategoryChange = (categoryId, isChecked) => {

//     if (isChecked && checkCategories.length > 4) {
//       alert("최대 5개만 선택 가능합니다");
//       // 체크하려는데 최대 개수 초과한 경우
//       // 체크박스를 체크하지 않도록 이벤트를 중지시킴
//       return false;
//     }
//     // 체크 박스를 체크하거나, 해제하는 것이 가능한 경우
//     // 해당 상태를 업데이트
//     setCheckCategories((prevCheckedCategories) => {
//         if (isChecked) {
//             return [...prevCheckedCategories, categoryId];
//         } else {
//             return prevCheckedCategories.filter((id) => id !== categoryId);
//         }
//     });
//   return true;
// };

//   const handleChange = (e, categoryId) => {
//     const isChecked = e.target.checked;
//     const canChange = handleCategoryChange(categoryId, isChecked);
//     // handleCheckboxChange가 false를 반환했다면,
//     // 이벤트의 기본 동작을 막아 체크박스가 선택되지 않도록 함
//     if (!canChange) {
//         e.preventDefault();
//         e.stopPropagation();
//     }
//   };

  const onChangeTitle = (e) => {
    setLunchTitle(e.target.value);
  };

  // 사진 추가하기 input 창
  const onChangeIsPhotos = () => {
    setIsAddPhotos(!isAddPhotos) 
    setLoadPhotos(() => [])
  }

  // 사진 추가하기 button
  const onClickButton = () => {
    imgFileRef.current.click()
  }

  // 사진 취소
  const onCancelButton = () => {
    if(loadPhotos.length > 1) {
      setLoadPhotos(() => [])
    } else if(1 > loadPhotos.length && isAddPhotos === true){
      setIsAddPhotos(false)
    }
  }

  return (
    <div css={s.writeLunchLayout}>
      {/* 가게이름 */}
      <input
        placeholder="가게이름(지도를 검색해주세요)"
        css={s.restaurantNameInput}
        value={placeName}
        disabled
      />

      <div css={s.lunchAddLayout}>
        <div css={s.categoryLayout}>
          {lunchCategories.map((categroy) => {
            return (
              <div css={s.checkLayout}>
                <div css={s.checkContainer}>
                  <input
                    id={`chk${categroy.id}`}
                    css={s.checkIntput}
                    type="checkbox"
                    onChange={(e) =>
                      handleCategoryChange(categroy.id, e.target.checked)
                    }
                  />
                  <label for={`chk${categroy.id}`}></label>
                  <div css={s.checkIcon}>{categroy.label}</div>
                </div>
                <span>{categroy.value}</span>
              </div>
            );
          })}
        </div>

        {/* 지도검색, 지도 */}
        <LunchMap />


        {/* 사진 추가하기 컴프 */}
        {
          !isAddPhotos ?
          <></>
          :
          <div>
            <div css={s.selectPhotosLayout}>
            <input
              type="file"
              style={{ display: "none" }}
              onChange={handleFileChange}
              ref={imgFileRef}
              multiple={true}
              />
                <div css={s.cancelButtonLayout}>
                  <button css={s.selectPhotosCancel} onClick={() => onCancelButton()}><MdOutlineCancel/></button>
                </div>
              {
                !loadPhotos.length 
                ?
                <button css={s.selectPhotos} onClick={() => onClickButton()}><FiPlusCircle/></button>
                :
                <>
                {   
                  // 이미지 2개 이상 일 때만 슬라이드
                  loadPhotos.length > 1 
                  ?
                  <div className="slide-container">
                      <Slide {...settings} 
                          prevArrow={<div css={s.slideArrow}><IoIosArrowDropleftCircle /></div>}
                          nextArrow={<div css={s.slideArrow}><IoIosArrowDroprightCircle /></div>}
                      >
                          {loadPhotos.map((photo)=> (
                              <div key={photo.id} css={s.imgUrl(photo.dataUrl)}></div>
                          ))} 
                      </Slide>
                  </div>
                  :
                  // 이미지 1개 일때 슬라이드
                  <div className="slide-container">
                      {loadPhotos.map((photo)=> (
                        <div key={photo.id} css={s.imgUrl(photo.dataUrl)}></div>
                      ))} 
                  </div>
                }
                </>
                  
              }

            </div>
          </div>
        }




        <div css={s.qillLayout}>
          <ReactQuill
            css={s.addFeedQuill}
            modules={modules}
            value={lunchContent}
            style={{ width: "100%", height:"100%"}}
            onChange={lunchContentChange}
          />
        </div>

        <div css={s.contentMessageLayout}>
          {
          !!lunchContentMessage && 
            <div> 
              {lunchContentMessage.text}
            </div>}
        </div>

        <div css={s.addLunchFooter}>
          <button onClick={() => onChangeIsPhotos()}>사진 선택</button>
          <button onClick={() => handleImageUpload()}>작성 완료</button>
        </div>
      </div>

    </div>
  );
}

export default LunchWrite;
