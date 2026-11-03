import React, { useState } from 'react';

export default function BlogPostForm({ user, onAddPost }) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    fetch('http://localhost:8000/blogs', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, author: user.user_id })
    })
      .then(res => res.json())
      .then(newPost => {
        onAddPost(newPost);
        setTitle('');
        setContent('');
      })
      .catch(err => console.error('Error creating post:', err));
  };

  return (
    <div className="card p-4 mb-4 shadow-sm">
      <h4>Create a New Post</h4>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Content</label>
          <textarea className="form-control" rows="3" value={content} onChange={(e) => setContent(e.target.value)} required></textarea>
        </div>
        <button type="submit" className="btn btn-primary">Publish Post</button>
      </form>
    </div>
  );
}