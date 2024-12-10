import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BoardEdit({ posts, onEditPost }) {
  const { id } = useParams();  // URL에서 게시글 ID 가져오기
  const navigate = useNavigate();
  
  const post = posts.find(post => post.id === parseInt(id)); // 해당 게시글 찾기

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    }
  }, [post]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (post) {
      onEditPost(post.id, { title, content });
      navigate(`/boardDetail/${post.id}`);  // 수정 후 해당 게시글 상세 페이지로 이동
    }
  };

  if (!post) {
    return <div>해당 게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <h1>게시글 수정</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>제목</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>내용</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            required 
          />
        </div>
        <button type="submit">수정 완료</button>
      </form>
    </div>
  );
}

export default BoardEdit;
