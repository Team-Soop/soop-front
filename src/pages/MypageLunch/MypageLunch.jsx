/** @jsxImportSource @emotion/react */
import * as s from "./style";
import MyLunchList from "../../components/MyPageComp/MyLunchList/MyLunchList";

function MypageLunch() {
    return (
        <div css={s.layout}>
            <MyLunchList />
        </div>
    );
}

export default MypageLunch;
