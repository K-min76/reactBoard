import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function BoardDetail({ posts, onDeletePost, onEditPost, onRecommendPost }) {
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

  const handleEdit = () => {
    const newTitle = prompt('새 제목을 입력하세요', post.title);
    const newContent = prompt('새 내용을 입력하세요', post.content);

    if (newTitle && newContent) {
      onEditPost(post.id, { title: newTitle, content: newContent });
      setPost({ ...post, title: newTitle, content: newContent });
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
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>추천 수: {post.recommend || 0}</p>
      <button onClick={handleDelete}>삭제</button>
      <button onClick={handleEdit}>수정</button>
      <button onClick={handleRecommend}>추천</button>
      <button onClick={() => navigate('/boardList')}>목록으로</button>
    </div>
  );
}

export default BoardDetail;
