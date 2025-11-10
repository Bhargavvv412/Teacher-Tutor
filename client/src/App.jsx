import React, { useState, useEffect } from "react";
import axios from "axios";
import Dashboard from "./Dashboard.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

export default function App() {
  const [authPage, setAuthPage] = useState(null);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setAuthPage("login");
      return;
    }

    // ✅ Verify token with backend
    axios
      .get("http://localhost:5050/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUsername(res.data.username);
        setAuthPage("dashboard");
      })
      .catch(() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setAuthPage("login");
      });
  }, []);

  if (authPage === null) return <div>Loading...</div>;

  if (authPage === "login")
    return (
      <Login
        onSuccess={() => setAuthPage("dashboard")}
        onSwitchToSignup={() => setAuthPage("signup")}
      />
    );

  if (authPage === "signup")
    return (
      <Signup
        onSuccess={() => setAuthPage("dashboard")}
        onSwitchToLogin={() => setAuthPage("login")}
      />
    );

  return (
    <Dashboard
      username={username}
      onLogout={() => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        setAuthPage("login");
      }}
    />
  );
}
