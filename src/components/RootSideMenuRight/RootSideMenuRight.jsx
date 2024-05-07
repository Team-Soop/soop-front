/** @jsxImportSource @emotion/react */
import { useEffect, useState } from "react";
import * as s from "./style";
import Modal from 'react-modal';
import { useRecoilState } from "recoil";
import { rightSideBarState } from "../../atoms/SideMenuAtom";
import AddFeed from "../AddFeed/AddFeed";
import { MdOutlineCancel } from "react-icons/md";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiMenu5Fill } from "react-icons/ri";




function RootSideMenuRight(props) {
  const [ modal, setModal ] = useState(false);

  const [ isFeedWrite, setIsFeedWrite ] = useState(false);
  const [ isStudyWrite, setIsStudyWrite ] = useState(false);
  const [ isLunchWrite, setIsLunchWrite ] = useState(false);
  const [ rightSideBar, setRightSideBar] = useRecoilState(rightSideBarState);
  

  useEffect(() => {
    console.log(rightSideBar)
    switch(rightSideBar) {
      case 1:
        setIsFeedWrite(() => true)
        setIsStudyWrite(() => false)
        setIsLunchWrite(() => false)
        break;
      case 2:
        setIsStudyWrite(() => true)
        setIsFeedWrite(() => false)
        setIsLunchWrite(() => false)
      case 3:
        setIsLunchWrite(() => true)
        setIsFeedWrite(() => false)
        setIsStudyWrite(() => false)
      default:
        console.log(rightSideBar);

    }

  },[rightSideBar])

  // 모달
  const openModal = () => {
    setModal(true);
  }
  const closeModal = () => {
    setModal(false);
  }

  const test = () => {
    alert("뿌뿌")
  }



  return (
    
      <div>
        {/* 피드페이지 글쓰기 */}
        {
          isFeedWrite
          ?
          <div>
            <Modal 
              isOpen={modal} 
              onRequestClose={closeModal} 
              css={s.feedModal}
            >
              <AddFeed />
              <button css={s.modalCancel} onClick={closeModal}><MdOutlineCancel /></button>
            </Modal>
            {/* 우측 하단 버튼 */}
            <div css={s.rigthButton}>
              {/* 필터 */}
              <button>
                <RiMenu5Fill/>
              </button>
              {/* 글쓰기 */}
              <button onClick={openModal}>
                <HiOutlinePencilSquare/>
              </button>
            </div>
          </div>
          :
          <></>
        }

        {/* 스터디페이지 글쓰기 */}
        {
          isStudyWrite
          ?
          <div>
            <div css={s.rigthButton}>
              <button>필터</button>
              <button onClick={test}>글 쓰기</button>
            </div>
          </div>
          :
          <></>
        }

        {/* 런치 페이지 글쓰기 */}
        {
          isLunchWrite
          ?
          <div>
            <div css={s.rigthButton}>
              <button>필터</button>
              <button onClick={test}>글 쓰기</button>
            </div>
          </div>
          :
          <></>
        }


        
      </div>
    
  );
}

export default RootSideMenuRight;