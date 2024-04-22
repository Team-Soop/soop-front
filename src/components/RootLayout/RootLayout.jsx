/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useRecoilState } from "recoil";


function RootLayout({ children }) {

    return (
        <>
            <div css={s.background}></div>
            <div>
                {children}
            </div>
        </>
    );
}

export default RootLayout;