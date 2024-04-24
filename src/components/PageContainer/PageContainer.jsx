/** @jsxImportSource @emotion/react */
import * as s from "./style";


function PageContainer({ children }) {
    return (
        <div css={s.container} id="PageContainer">
            {children}
        </div>
    );
}

export default PageContainer;