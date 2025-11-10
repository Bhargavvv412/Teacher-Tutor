import React, { useState } from "react";
import axios from "axios";
import "../styles/auth.css";

export default function Signup({ onSuccess, onSwitchToLogin }) {
  const [form, setForm] = useState({
    username: "",
    password: "",
    mobile: "",
    standard: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5050/auth/signup",
        form,
        { withCredentials: true }
      );

      setMessage("✅ Signup successful, welcome " + res.data.user.username);
      onSuccess?.(res.data.user);
    } catch (err) {
      setMessage(err.response?.data?.error || "❌ Server error");
    }
  };

  const standards = [
    "1st", "2nd", "3rd", "4th", "5th",
    "6th", "7th", "8th", "9th", "10th"
  ];

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2 className="auth-title">Sign Up</h2>
        <form className="auth-form" onSubmit={handleSignup}>
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
          <input
            className="auth-input"
            type="text"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            placeholder="Mobile Number"
            required
          />

          <select
            className="auth-input"
            name="standard"
            value={form.standard}
            onChange={handleChange}
            required
          >
            <option value="">Select Standard</option>
            {standards.map((std, idx) => (
              <option key={idx} value={std}>
                {std}
              </option>
            ))}
          </select>

          <button className="auth-button" type="submit">
            Sign Up
          </button>
        </form>

        {message && <p className="auth-message">{message}</p>}

        <p className="auth-footer">
          Already have an account?{" "}
          <button
            type="button"
            className="auth-switch-btn"
            onClick={onSwitchToLogin}
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}
