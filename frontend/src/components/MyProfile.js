import React from 'react';

export default function MyProfile({ user, posts }) {
  if (!user) return <p>Please sign in to view your profile.</p>;

  const userPosts = posts.filter(p => p.author === user.user_id);

  return (
    <div>
      <h2>My Profile</h2>
      <div className="card p-3 mb-4">
        <p><strong>Name:</strong> {user.name}</p>
        <p><strong>User ID:</strong> {user.user_id}</p>
      </div>
      <h4>Posts Created By You ({userPosts.length})</h4>
      {userPosts.map(post => (
        <div className="card mb-2" key={post.id}>
          <div className="card-body">
            <h5>{post.title}</h5>
            <p>{post.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
}