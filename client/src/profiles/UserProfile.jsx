import React, { useEffect, useState } from "react";
import "../styles/navbar.css";

export default function UserProfile() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
    }
  }, []);

  if (!username) {
    return <div className="user-profile">Loading...</div>;
  }

  return (
    <div className="user-profile">
      Hello, <strong>{username}</strong>
    </div>
  );
}