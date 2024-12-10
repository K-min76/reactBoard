import { useState, useEffect, useRef } from 'react';
import { memberIdCheck, areaList, memberRegist } from '../api/member'; // api 호출 함수
import { useNavigate } from 'react-router-dom'; // 페이지 이동을 위한 useNavigate

function Join() {
  const [아이디, 변경아이디] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('M');
  const [birth, setBirth] = useState('');
  const [area, setArea] = useState('');
  const [idChk, setIdChk] = useState(''); // 중복 체크된 아이디 저장
  const [areas, setAreas] = useState([]);
  const [idMessage, setIdMessage] = useState('');
  const idRef = useRef();
  const navigate = useNavigate(); // 페이지 이동

  useEffect(() => {
    startList();
  }, []);

  // 지역 리스트 불러오기
  function startList() {
    areaList()
      .then((res) => {
        setAreas(res.data.data);
        setArea(res.data.data[0].idx);
      })
      .catch((err) => console.error(err));
  }

  // 회원가입 실행 함수
  async function joinAction() {
    // 아이디 중복 체크가 안된 경우
    if (아이디.trim().length === 0 || 아이디 !== idChk) {
      alert('아이디 중복 체크를 먼저 해주세요.');
      return;
    }

    // 필수 정보 입력 여부 확인
    if (!password || !name || !email || !birth || !area) {
      alert('모든 필수 정보를 입력해주세요.');
      return;
    }

    const obj = {
      userId: 아이디,
      userPw: password,
      userName: name,
      email: email,
      birth: birth,
      gender: gender,
      areaIdx: area,
    };

    try {
      const response = await memberRegist(obj); // 회원가입 API 호출
      if (response.status === 200 || response.status === 201) {
        alert('회원가입이 완료되었습니다.');
        navigate('/'); // 홈으로 이동
      } else {
        alert('회원가입 중 문제가 발생했습니다. 다시 시도해주세요.');
      }
    } catch (err) {
      console.error('회원가입 실패: ', err);
      alert('회원가입에 실패했습니다. 관리자에게 문의하세요.');
    }
  }

  return (
    <div className="join-container">
      <h2>회원가입</h2>

      {/* 아이디 입력 */}
      <input
        type="text"
        placeholder="아이디 입력"
        ref={idRef}
        value={아이디}
        onChange={(e) => 변경아이디(e.target.value)}
      />
      <input
        type="button"
        value="중복 체크"
        onClick={() => {
          const obj = { id: 아이디 };
          memberIdCheck(obj)
            .then((res) => {
              setIdChk(아이디);
              setIdMessage('사용 가능합니다.');
              idRef.current.disabled = true;
            })
            .catch((err) => {
              setIdMessage('중복된 아이디입니다.');
              console.error(err);
            });
        }}
      />
      <div id="id-message">{idMessage}</div>

      {/* 비밀번호 입력 */}
      <input
        type="password"
        placeholder="비밀번호 입력"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      
      {/* 이름 입력 */}
      <input
        type="text"
        placeholder="이름 입력"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      
      {/* 이메일 입력 */}
      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* 성별 선택 */}
      <div className="radio-group">
        <div>
          <input
            type="radio"
            name="gender"
            value="M"
            checked={gender === 'M'}
            onChange={(e) => setGender(e.target.value)}
          />
          남자
        </div>
        <div>
          <input
            type="radio"
            name="gender"
            value="F"
            onChange={(e) => setGender(e.target.value)}
          />
          여자
        </div>
      </div>

      {/* 생년월일 입력 */}
      <input
        type="date"
        value={birth}
        onChange={(e) => setBirth(e.target.value)}
      />

      {/* 지역 선택 */}
      <div className="area-select">
        <select onChange={(e) => setArea(e.target.value)} value={area}>
          {areas.map((item, index) => (
            <option key={index} value={item.idx}>
              {item.areaName}
            </option>
          ))}
        </select>
      </div>

      {/* 회원가입 버튼 */}
      <input type="button" value="회원가입" onClick={joinAction} />
    </div>
  );
}

export default Join;
