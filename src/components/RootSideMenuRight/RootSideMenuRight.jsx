/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRecoilState, useSetRecoilState } from "recoil";
import { rightSideBarState } from "../../atoms/SideMenuAtom";
import AddFeed from "../AddFeed/AddFeed";
import { MdOutlineCancel } from "react-icons/md";
import { HiOutlinePencilSquare } from "react-icons/hi2";
import { RiMenu5Fill } from "react-icons/ri";
import LunchWrite from "../LunchWrite/LunchWrite";
import SaveStduyGroup from "../Study/SaveStudyGroup/SaveStduyGroup";
import { contentSortState } from "../../atoms/contentSortAtom";

function RootSideMenuRight(props) {
  const [modal, setModal] = useState(false);
  const [isFeedWrite, setIsFeedWrite] = useState(false);
  const [isStudyWrite, setIsStudyWrite] = useState(false);
  const [isLunchWrite, setIsLunchWrite] = useState(false);
  const [isOpenSortMenu, setIsOpenSortMenu] = useState(false)
  const [rightSideBar, setRightSideBar] = useRecoilState(rightSideBarState);
  const [sortState, setSortState] = useRecoilState(contentSortState)

  useEffect(() => {
    switch (rightSideBar) {
      case 1:
        setIsFeedWrite(true);
        setIsStudyWrite(false);
        setIsLunchWrite(false);
        setSortState(0);
        break;
      case 2:
        setIsFeedWrite(false);
        setIsStudyWrite(true);
        setIsLunchWrite(false);
        setSortState(0);
        break;
      case 3:
        setIsFeedWrite(false);
        setIsStudyWrite(false);
        setIsLunchWrite(true);
        setSortState(0);
        break;
      default:
        setIsFeedWrite(false);
        setIsStudyWrite(false);
        setIsLunchWrite(false);
        setSortState(0);
    }
  }, [rightSideBar]);

  // 모달
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const openSortMenu = () => {
    setIsOpenSortMenu(!isOpenSortMenu)
  };

  const clickSortButton = (state) => {
    setSortState(state)
    setIsOpenSortMenu(!isOpenSortMenu)
  }

  useEffect(() => {
    console.log(sortState)
  }, [sortState])

  return (

    <div>
      {/* 피드페이지 글쓰기 */}
      {isFeedWrite ? (
        <div>
          <Modal isOpen={modal} onRequestClose={closeModal} css={s.feedModal}>
            <AddFeed />
            <button css={s.modalCancel} onClick={closeModal}>
              <MdOutlineCancel />
            </button>
          </Modal>
          {/* 우측 하단 버튼 */}
          <div css={s.rigthButton}>
            {/* 필터 */}
            <button onClick={openSortMenu}>
              <RiMenu5Fill />
            </button>
            {/* 글쓰기 */}
            <button onClick={openModal}>
              <HiOutlinePencilSquare />
            </button>
              {
                isOpenSortMenu && 
                <div css={s.sortMenu}>
                  <div css={s.sortButton} onClick={() => clickSortButton(1)}>최신순</div>
                  <div css={s.sortButton} onClick={() => clickSortButton(2)}>오래된순</div>
                </div>
              }
          </div>
        </div>
      ) : (
        <></>
      )}

      {/* 스터디페이지 글쓰기 */}
      {isStudyWrite ? (
        <div>
          <div css={s.rigthButton}>
            <button onClick={openSortMenu}><RiMenu5Fill /></button>
            <button onClick={openModal}><HiOutlinePencilSquare /></button>
          {
            isOpenSortMenu && 
            <div css={s.sortMenu}>
              <div css={s.sortButton} onClick={() => clickSortButton(1)}>최신순</div>
              <div css={s.sortButton} onClick={() => clickSortButton(2)}>오래된순</div>
            </div>
          }
          </div>
          <SaveStduyGroup isOpen={modal} isClose={closeModal} setState={0} />
        </div>
      ) : (
        <></>
      )}

      {/* 런치 페이지 글쓰기 */}
      {isLunchWrite ? (
        <div>
          <Modal isOpen={modal} onRequestClose={closeModal} css={s.feedModal}>
            <LunchWrite />
            <button css={s.modalCancel} onClick={closeModal}>
              <MdOutlineCancel />
            </button>
          </Modal>
          <div css={s.rigthButton}>
            {/* 필터 */}
            <button>
              <RiMenu5Fill onClick={openSortMenu}/>
            </button>
            {/* 글쓰기 */}
            <button onClick={openModal}>
              <HiOutlinePencilSquare />
            </button>
            {
              isOpenSortMenu && 
              <div css={s.sortMenu}>
                <div css={s.sortButton} onClick={() => clickSortButton(1)}>최신순</div>
                <div css={s.sortButton} onClick={() => clickSortButton(2)}>오래된순</div>
              </div>
            }
          </div>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
}

export default RootSideMenuRight;
