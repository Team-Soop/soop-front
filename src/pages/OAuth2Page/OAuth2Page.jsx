import { Link, useSearchParams } from 'react-router-dom';

function OAuth2Page(props) {
    const [ searchParams ] = useSearchParams();
    const name = searchParams.get("name");
    const provider = searchParams.get("provider");


  return (
    <div>
      <h1>계정 통합</h1>
      <Link to={`/auth/oauth2/merge?name=${name}&provider=${provider}`}>계정 통합하기</Link>
      <h1>회원가입</h1>
      <Link to={`/auth/oauth2/signup?name=${name}&provider=${provider}`}>회원가입하기</Link>
    </div>
  );
}

export default OAuth2Page;