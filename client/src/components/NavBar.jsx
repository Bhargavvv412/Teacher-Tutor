import React from 'react';
import Logout from './Logout.jsx';
import '../styles/navbar.css';

export default function NavBar({ stars = 0, username, onLogout, onNavClick, currentPage }) {
  const getActiveClass = (page) => currentPage === page ? 'badge active' : 'badge';

  return (
    <div className="topbar card">
      <div className="brand">🧑‍🏫 Teacher Tutor</div>
      
      <div className="nav-buttons">
        <button className={getActiveClass('home')} onClick={() => onNavClick('home')}>Home</button>
        <button className={getActiveClass('lessons')} onClick={() => onNavClick('lessons')}>Lessons</button>
        <button className={getActiveClass('quizzes')} onClick={() => onNavClick('quizzes')}>Quizzes</button>
        <button className={getActiveClass('rewards')} onClick={() => onNavClick('rewards')}>Rewards</button>
        <button className={getActiveClass('profile')} onClick={() => onNavClick('profile')}>Profile</button>
      </div>

      <div className="top-actions">
        <span className="username">{username}</span> {/* ✅ show username */}
        <span className="badge">⭐ {stars}</span>
        <Logout onLogout={onLogout} />
      </div>
    </div>
  );
}
