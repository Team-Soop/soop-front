/** @jsxImportSource @emotion/react */
import * as s from "./style";


function PageContainer({ children }) {
    return (
        <div css={s.container}>
            {children}
        </div>
    );
}

export default PageContainer;