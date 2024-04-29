/** @jsxImportSource @emotion/react */
import { useState } from "react";
import * as s from "./style";
import Modal from 'react-modal';
import { useRecoilValue } from "recoil";
import { rightSideBarState } from "../../atoms/SideMenuAtom";
import AddFeed from "../AddFeed/AddFeed";
import { MdOutlineCancel } from "react-icons/md";

function RootSideMenuRight(props) {
  const [ modal, setModal ] = useState(false);
  const rightSideMenu = useRecoilValue(rightSideBarState);
  

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
        {
          rightSideMenu === 1
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
              <button>필터</button>
              <button onClick={openModal}>글 쓰기</button>
            </div>
        {/* 글쓰기 창 */}
          </div>
          : rightSideMenu === 2 
            ?
          <>
            <div css={s.rigthButton}>
              <button>필터</button>
              <button onClick={test}>글 쓰기</button>
            </div>
          </>
            : null
          
        }

        
      </div>
    
  );
}

export default RootSideMenuRight;