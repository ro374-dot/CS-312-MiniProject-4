import React from 'react';

export default function PostList({ posts, user, onDelete }) {
  return (
    <div className="mt-4">
      <h2>Recent Blog Posts</h2>
      {posts.length === 0 ? <p>No posts available.</p> : null}
      {posts.map(post => (
        <div className="card mb-3 shadow-sm" key={post.id}>
          <div className="card-body">
            <h3 className="card-title">{post.title}</h3>
            <p className="card-text">{post.content}</p>
            <small className="text-muted">Author: {post.author}</small>
            {user && user.user_id === post.author && (
              <div className="mt-2">
                <button className="btn btn-sm btn-outline-danger" onClick={() => onDelete(post.id)}>Delete</button>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}