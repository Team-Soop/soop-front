/** @jsxImportSource @emotion/react */
import * as s from "./style";
import { useRecoilState } from "recoil";
import logo from "../../assets/images/soopLogo.png";


function RootLayout({ children }) {

    return (
        <>  <div css={s.background}></div>
            <div>
                <img css={s.logo} src={logo} alt="" />
                {children}
            </div>
        </>
    );
}

export default RootLayout;