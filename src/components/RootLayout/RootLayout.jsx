/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useRecoilState } from "recoil";


function RootLayout({ children }) {
    // const [ show, setShow ] = useRecoilState(menuState);

    const handleBackgroundClick = (e) => {
        
    }

    return (
        <>
            <div css={s.background}></div>
            <div css={s.layout} onClick={handleBackgroundClick}>
                {children}
            </div>
        </>
    );
}

export default RootLayout;