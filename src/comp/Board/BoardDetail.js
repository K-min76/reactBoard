import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BoardDetail({ posts, onDeletePost, onRecommendPost }) {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundPost = posts.find(post => post.id === parseInt(id));
    if (foundPost) {
      setPost(foundPost);
    } else {
      navigate('/boardList');
    }
  }, [id, posts, navigate]);

  const handleDelete = () => {
    if (post) {
      onDeletePost(post.id);
      navigate('/boardList');
    }
  };

  const handleRecommend = () => {
    if (post) {
      onRecommendPost(post.id);
      setPost({ ...post, recommend: (post.recommend || 0) + 1 });
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-detail-container">
      <h1>{post.title}</h1>
      <p><strong>작성자:</strong> {post.author}</p>
      <p>{post.content}</p>
      <p><strong>추천 수:</strong> {post.recommend || 0}</p>

      <div className="post-actions">
        <button onClick={handleDelete} className="btn-delete">삭제</button>
        <button onClick={() => navigate(`/boardEdit/${post.id}`)} className="btn-edit">수정</button>
        <button onClick={handleRecommend} className="btn-recommend">추천</button>
        <button onClick={() => navigate('/boardList')} className="btn-back">목록으로</button>
      </div>
    </div>
  );
}

export default BoardDetail;
