import React from 'react';

export default function Navbar({ user, setCurrentView, setUser }) {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <a className="navbar-brand" href="#home" onClick={() => setCurrentView('home')}>BlogApp</a>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <button className="btn btn-link nav-link" onClick={() => setCurrentView('home')}>Home</button>
          </li>
          {user ? (
            <>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={() => setCurrentView('profile')}>My Profile</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-danger btn-sm mt-1 ms-2" onClick={() => { setUser(null); setCurrentView('home'); }}>Sign Out</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={() => setCurrentView('signin')}>Sign In</button>
              </li>
              <li className="nav-item">
                <button className="btn btn-link nav-link" onClick={() => setCurrentView('signup')}>Sign Up</button>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}