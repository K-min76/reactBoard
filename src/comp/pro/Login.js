import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { memberLogin } from '../api/member';
import '../../App.css'; // 스타일 파일 임포트

export default function Login() {

    const navigate = useNavigate();

    const idRef = useRef('');
    const pwRef = useRef('');

    // 페이지 접속 시 로컬스토리지에서 userId 제거
    useEffect(() => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
    }, []);

    // 로그인 액션
    const loginAction = () => {
        const idValue = idRef.current.value;
        const pwValue = pwRef.current.value;

        // 데이터 포장
        let obj = new Object();
        obj.userId = idValue;
        obj.userPw = pwValue;

        memberLogin(obj)
        .then(res => {
            const data = res.data;
            if (data.code === '200' && data.data === 'Y') {
                // 로그인 성공 시 로컬 스토리지에 사용자 정보 저장
                localStorage.setItem('userId', idValue);
                console.log(idValue);
                localStorage.setItem('username', idValue); // 사용자 이름 저장
                localStorage.setItem('auto', 'random UUID JWT');
                navigate('/');  // 홈 페이지로 이동
            } else {
                // 로그인 실패 시 입력 필드 비우고, 재입력 요청
                idRef.current.value = '';
                pwRef.current.value = '';
                idRef.current.focus();
                alert('아이디를 재입력해주세요.');
            }
        });
    };

    return (
        <div className="login-container">
            <h1>로그인</h1>
            <input
                type="text"
                placeholder="아이디 입력"
                ref={idRef} />
            <br />
            <input
                type="password"
                placeholder="패스워드 입력"
                ref={pwRef} />
            <br />
            <button className="login-btn" onClick={loginAction}>로그인</button>
            <button className="signup-btn" onClick={() => navigate('/pro1')}>회원가입</button>
        </div>
    );
}
