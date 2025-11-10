import React from 'react';

export default function Logout({ onLogout }) {
  const handleLogout = () => {
    localStorage.removeItem('token'); // optional, no auto-login
    if (onLogout) onLogout();
  };

  return (
    <button className="badge" onClick={handleLogout}>
      Logout
    </button>
  );
}
