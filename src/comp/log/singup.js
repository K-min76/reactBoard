import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
  const [아이디, 확인아이디] = useState('');
  const [비밀번호, 확인비밀번호] = useState('');
  const [이메일주소, 확인이메일] = useState('');
  const [성별, 확인성별] = useState('');
  const [hobby, setHobby] = useState([]);
  const navigate = useNavigate();

  const hobbyList = [
    { name: '독서' },
    { name: '악기연주' },
    { name: '프라모델 조립' },
    { name: '자기' },
    { name: '여행' },
  ];

  const handleHobbyChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setHobby((prevHobbies) => [...prevHobbies, value]);
    } else {
      setHobby((prevHobbies) => prevHobbies.filter((h) => h !== value));
    }
  };

  const handleSignup = () => {
    const userInfo = {
      아이디,
      비밀번호,
      이메일주소,
      성별,
      취미: hobby,
    };

    navigate('/login', { state: userInfo }); // 로그인 페이지로 이동하면서 회원 정보 전달
  };

  return (
    <div>
      <h1>회원가입</h1>
      <input
        type="text"
        placeholder="아이디"
        value={아이디}
        onChange={(e) => 확인아이디(e.target.value)}
      />
      <input
        type="password"
        placeholder="비밀번호"
        value={비밀번호}
        onChange={(e) => 확인비밀번호(e.target.value)}
      />
      <input
        type="text"
        placeholder="이메일주소"
        value={이메일주소}
        onChange={(e) => 확인이메일(e.target.value)}
      />

      <h4>성별</h4>
      <label>
        <input
          type="radio"
          name="성별"
          value="남"
          checked={성별 === '남'}
          onChange={(e) => 확인성별(e.target.value)}
        />
        남
      </label>
      <label>
        <input
          type="radio"
          name="성별"
          value="여"
          checked={성별 === '여'}
          onChange={(e) => 확인성별(e.target.value)}
        />
        여
      </label>

      <h1>취미 선택</h1>
      {hobbyList.map((item, index) => (
        <label key={index}>
          <input
            type="checkbox"
            value={item.name}
            checked={hobby.includes(item.name)}
            onChange={handleHobbyChange}
          />
          {item.name}
        </label>
      ))}

      <button onClick={handleSignup}>회원가입</button>
    </div>
  );
}
