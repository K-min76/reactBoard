import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// 컴포넌트 임포트
import Calc1 from './comp/calc/study01';
import Inp1 from './comp/inp/input01';
import Oup1 from './comp/inp/output01';
import Ref from './comp/inp/Ref01';
import Join from './comp/pro/Join';
import ProLogin from './comp/pro/Login';
import ProItemList from './comp/pro/ItemList';
import BoardDetail from './comp/Board/BoardDetail';
import BoardList from './comp/Board/BoardList';
import BoardForm from './comp/Board/BoardForm';
import BoardEdit from './comp/Board/BoardEdit'; // BoardEdit 임포트
import Ax1 from './comp/ax/ax01';

function App() {
  const [posts, setPosts] = useState([
    { id: 1, title: '첫 번째 글', content: '첫 번째 내용입니다.', recommend: 0, author: '홍길동' },
    { id: 2, title: '두 번째 글', content: '두 번째 내용입니다.', recommend: 0, author: '김철수' },
  ]);
  const [username, setUsername] = useState('');  // 로그인한 사용자 이름 상태 관리

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (userId) {
      setUsername(userId);
    }
  }, []); // 페이지 로드 시 로그인된 사용자 정보 확인

  const addPost = (newPost) => {
    setPosts([...posts, { id: posts.length + 1, ...newPost, recommend: 0 }]);
  };

  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  const editPost = (id, updatedPost) => {
    setPosts(posts.map(post => post.id === id ? { ...post, ...updatedPost } : post));
  };

  const recommendPost = (id) => {
    setPosts(posts.map(post => (post.id === id ? { ...post, recommend: (post.recommend || 0) + 1 } : post)));
  };

  const handleLogout = () => {
    // 로컬 스토리지에서 사용자 정보 삭제
    setUsername('');  // username 상태 초기화
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home username={username} onLogout={handleLogout} />} />  {/* Home 컴포넌트에 로그아웃 기능 전달 */}
          <Route path="/about" element={<About />} />
          <Route path="/cal1" element={<Calc1 />} />
          <Route path="/inp1" element={<Inp1 />} />
          <Route path="/oup1" element={<Oup1 />} />
          <Route path="/ref1" element={<Ref />} />
          <Route path="/join" element={<Join />} />
          <Route path="/login" element={<ProLogin setUsername={setUsername} />} />
          <Route path="/itemList" element={<ProItemList />} />
          <Route path="/boardList" element={<BoardList posts={posts} />} />
          <Route path="/boardDetail/:id" element={<BoardDetail posts={posts} onDeletePost={deletePost} onRecommendPost={recommendPost} />} />
          <Route path="/boardForm" element={<BoardForm onAddPost={addPost} />} />
          <Route path="/boardEdit/:id" element={<BoardEdit posts={posts} onEditPost={editPost} />} />
          <Route path="/ax1" element={<Ax1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function About() {
  return (
    <div style={{ border: '2px blue solid' }}>
      <Link to="/">Home으로 이동</Link>
    </div>
  );
}

function Home({ username, onLogout }) {
  console.log(username);
  return (
    <div>
      <h1>시작 Home</h1>
      {username ? (
        <>
          <h2>환영합니다, {username}님!</h2>
            <button onClick={onLogout}>로그아웃</button>
        </>
      ) : <h2>로그인 해주세요.</h2>}

      <Link to="/about">About으로 이동</Link><br />
      <Link to="/cal1">Cal1로 이동하기</Link><br />
      
      <h4>데이터 옮기기</h4>
      <Link to="/inp1">데이터 입력</Link><br />
      <Link to="/oup1">데이터 출력</Link><br />
      <Link to='/ref1'>Ref 사용하기</Link>

      <h4>Axios</h4>
      <Link to="/ax1">AXIOS 사용</Link><br />

      <h4>기능</h4>
      <Link to="/join">회원가입 창</Link><br />
      <Link to="/login">로그인</Link><br />
      <Link to="/itemList">아이템 리스트</Link><br />
      <Link to="/boardList">게시판 리스트</Link><br />
      <Link to="/boardForm">게시판 폼</Link><br />
    </div>
  );
}

export default App;
