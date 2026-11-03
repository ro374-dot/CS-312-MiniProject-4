import React, { useState } from 'react';

export default function Signin({ setUser, setCurrentView }) {
  const [user_id, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSignin = (e) => {
    e.preventDefault();
    fetch('http://localhost:8000/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id, password })
    })
      .then(res => res.json())
      .then(data => {
        if (data.error) {
          setError(data.error);
        } else {
          setUser(data.user);
          setCurrentView('home');
        }
      })
      .catch(() => setError('Server error during signin'));
  };

  return (
    <div className="col-md-6 offset-md-3">
      <h3>Sign In</h3>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSignin}>
        <div className="mb-3">
          <label className="form-label">User ID</label>
          <input type="text" className="form-control" value={user_id} onChange={e => setUserId(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className="btn btn-success">Sign In</button>
      </form>
    </div>
  );
}