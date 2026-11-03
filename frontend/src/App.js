import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import PostList from './components/PostList';
import BlogPostForm from './components/BlogPostForm';
import Signin from './components/Signin';
import Signup from './components/Signup';
import MyProfile from './components/MyProfile';
import './App.css';

function App() {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [currentView, setCurrentView] = useState('home');

  useEffect(() => {
    fetch('http://localhost:8000/blogs')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error('Error fetching posts:', err));
  }, []);

  const handleAddPost = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  const handleDeletePost = (id) => {
    fetch(`http://localhost:8000/blogs/${id}`, { method: 'DELETE' })
      .then(() => setPosts(posts.filter(p => p.id !== id)))
      .catch(err => console.error('Error deleting post:', err));
  };

  return (
    <div className="App">
      <Navbar user={user} setCurrentView={setCurrentView} setUser={setUser} />
      <div className="container mt-4">
        {currentView === 'home' && (
          <>
            {user && <BlogPostForm user={user} onAddPost={handleAddPost} />}
            <PostList posts={posts} user={user} onDelete={handleDeletePost} />
          </>
        )}
        {currentView === 'signin' && <Signin setUser={setUser} setCurrentView={setCurrentView} />}
        {currentView === 'signup' && <Signup setCurrentView={setCurrentView} />}
        {currentView === 'profile' && <MyProfile user={user} posts={posts} />}
      </div>
    </div>
  );
}

export default App;