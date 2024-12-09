import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BoardForm({ onAddPost }) {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title && author && content) {
      const newPost = {
        title,
        author,
        content,
      };
      onAddPost(newPost);
      navigate('/boardList');
    } else {
      alert('모든 항목을 입력해주세요.');
    }
  };

  return (
    <div className="form-container">
      <h1 className="form-title">게시글 작성</h1>

      <form onSubmit={handleSubmit}>
        <div className="form-item">
          <label htmlFor="title">제목</label>
          <input
            type="text"
            id="title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="게시글 제목을 입력하세요"
          />
        </div>

        <div className="form-item">
          <label htmlFor="author">작성자</label>
          <input
            type="text"
            id="author"
            name="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            placeholder="작성자 이름을 입력하세요"
          />
        </div>

        <div className="form-item">
          <label htmlFor="content">내용</label>
          <textarea
            id="content"
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            placeholder="게시글 내용을 작성하세요"
          />
        </div>

        <div className="form-item-btn">
          <button type="submit" className="submit-btn">게시글 작성</button>
        </div>
      </form>
    </div>
  );
}

export default BoardForm;
