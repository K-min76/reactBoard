import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function BoardList({ posts }) {
  const [searchOption, setSearchOption] = useState('title');
  const [searchTerm, setSearchTerm] = useState('');

  // 게시글 목록 필터링
  const filteredPosts = posts.filter(post => {
    if (searchOption === 'author') {
      return post.author && post.author.includes(searchTerm);
    } else if (searchOption === 'title') {
      return post.title && post.title.includes(searchTerm);
    }
    return true;
  });

  return (
    <div className="board-container">
      <h1 className="board-title">게시글 목록</h1>

      <div className="search-container">
        <label>
          <input
            type="radio"
            value="author"
            checked={searchOption === 'author'}
            onChange={() => setSearchOption('author')}
          />
          작성자
        </label>
        <label>
          <input
            type="radio"
            value="title"
            checked={searchOption === 'title'}
            onChange={() => setSearchOption('title')}
          />
          제목+키워드
        </label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="검색어를 입력하세요"
        />
      </div>

      <table className="board-list">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {filteredPosts.map((post, index) => (
            <tr key={post.id}>
              <td data-label="번호">{index + 1}</td>
              <td data-label="제목">
                <Link to={`/boardDetail/${post.id}`}>{post.title}</Link>
              </td>
              <td data-label="작성자">{post.author}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Link to="/boardForm">
        <button className="board-form-btn">게시글 작성</button>
      </Link>
    </div>
  );
}

export default BoardList;
