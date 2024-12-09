import './App.css';
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import Calc1 from './comp/calc/study01';

import Inp1 from './comp/inp/input01';
import Oup1 from './comp/inp/output01';
import Ref from './comp/inp/Ref01';

import ProJoin from './comp/pro/Join';
import ProLogin from './comp/pro/Login';
import ProItemList from './comp/pro/ItemList';
import BoardDetail from './comp/Board/BoardDetail'; // BoardDetail 임포트
import BoardList from './comp/Board/BoardList'; // BoardList 임포트
import BoardForm from './comp/Board/BoardForm';
import React, { useState } from 'react'; // useState를 가져옵니다.

import Ax1 from './comp/ax/ax01';

function App() {
  // 게시글 상태 관리
  const [posts, setPosts] = useState([
    { id: 1, title: '첫 번째 글', content: '첫 번째 내용입니다.', recommend: 0, author: '홍길동' },
    { id: 2, title: '두 번째 글', content: '두 번째 내용입니다.', recommend: 0, author: '김철수' },
    // 더 많은 게시글 추가
  ]);

  // 새로운 게시글 추가 함수
  const addPost = (newPost) => {
    setPosts([...posts, { id: posts.length + 1, ...newPost, recommend: 0 }]);
  };

  // 게시글 삭제 함수
  const deletePost = (id) => {
    setPosts(posts.filter(post => post.id !== id));
  };

  // 게시글 수정 함수
  const editPost = (id, updatedPost) => {
    setPosts(posts.map(post => (post.id === id ? { ...post, ...updatedPost } : post)));
  };

  // 추천 기능 함수
  const recommendPost = (id) => {
    setPosts(posts.map(post => (post.id === id ? { ...post, recommend: (post.recommend || 0) + 1 } : post)));
  };

  return (
    <div className="App">
      <BrowserRouter>
        <About />
        <Routes>
          <Route path={"/"} element={<Home />} />
          <Route path={"/about"} element={<About />} />
          <Route path={"/cal1"} element={<Calc1 />} />

          <Route path={"/inp1"} element={<Inp1 />} />
          <Route path={"/oup1"} element={<Oup1 />} />
          <Route path={"/ref1"} element={<Ref />} />

          <Route path={"/pro1"} element={<ProJoin />} />
          <Route path={"/login"} element={<ProLogin />} />
          <Route path={"/itemList"} element={<ProItemList />} />
          <Route path="/boardList" element={<BoardList posts={posts} />} />
          <Route path="/boardDetail/:id" element={<BoardDetail posts={posts} onDeletePost={deletePost} onEditPost={editPost} onRecommendPost={recommendPost} />} />
          <Route path="/boardForm" element={<BoardForm onAddPost={addPost} />} />

          <Route path={"/ax1"} element={<Ax1 />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

function About() {
  return (
    <div style={{border: '2px blue solid'}}>
      <Link to="/">Home으로 이동</Link>
    </div>
  )
}

function Home() {
  return(
    <div>
      <h1>Start Home</h1>
      <Link to="/about">About으로 이동</Link><br/>
      <Link to="/cal1">Cal1로 이동하기</Link><br/>

      <h4>데이터 옮기기</h4>
      <Link to="/inp1">데이터 입력</Link><br/>
      <Link to="/oup1">데이터 출력</Link><br/>
      <Link to='/ref1'>Ref 사용하기</Link>

      <h4>Axios</h4>
      <Link to="/ax1">AXIOS 사용</Link><br/>

      <h4>기능</h4>
      <Link to="/pro1">회원가입 창</Link><br/>
      <Link to="/login">로그인</Link><br />
      <Link to="/itemList">아이템 리스트</Link> <br/>

      <Link to="/boardList">게시판 리스트</Link> <br/>
      <Link to="/boardForm">게시판 폼</Link> <br/>
    </div>
  )
}

export default App;
