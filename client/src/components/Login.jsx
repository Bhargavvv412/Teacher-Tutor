import React, { useState } from "react";
import axios from "axios";
import "../styles/auth.css";

export default function Login({ onSuccess, onSwitchToSignup }) {
  const [form, setForm] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5050/auth/login",
        { username: form.username, password: form.password },
        { withCredentials: true }
      );

      const { token, user } = res.data;
      
      localStorage.setItem("token", token);
      localStorage.setItem("username", user.username);

      setMessage("✅ Login successful, welcome " + user.username);
      onSuccess?.(user.username);
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Server error");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Login</h2>
        <form className="auth-form" onSubmit={handleLogin}>
          <input
            className="auth-input"
            type="text"
            name="username"
            value={form.username}
            onChange={handleChange}
            placeholder="Username"
            required
          />
          <input
            className="auth-input"
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Password"
            required
          />
          <button className="auth-button" type="submit">
            Login
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-footer">
          Don’t have an account?{" "}
          <button
            type="button"
            className="auth-switch-btn"
            onClick={onSwitchToSignup}
          >
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
}