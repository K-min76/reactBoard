import { useLocation } from 'react-router-dom';

export default function Login() {
  const location = useLocation();
  const userInfo = location.state; // 회원가입 페이지에서 전달된 정보

  return (
    <div>
      <h1>로그인</h1>
      {userInfo ? (
        <div>
          <p>아이디: {userInfo.아이디}</p>
          <p>이메일주소: {userInfo.이메일주소}</p>
          <p>성별: {userInfo.성별}</p>
          <p>취미: {userInfo.취미.join(', ')}</p>
        </div>
      ) : (
        <p>회원가입 정보를 입력하세요.</p>
      )}
      <input type="text" placeholder="아이디 입력" />
      <input type="password" placeholder="비밀번호 입력" />
      <button>로그인</button>
    </div>
  );
}
