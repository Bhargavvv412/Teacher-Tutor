import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [form, setForm] = useState({ username: "", password: "" });

  const token = localStorage.getItem("token");

  useEffect(() => {
    axios
      .get("http://localhost:5050/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setUser(res.data);
        setForm({ username: res.data.username, password: "" });
      })
      .catch((err) => console.error(err));
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:5050/auth/me", form, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        alert("Profile updated!");
        setUser(res.data.user);
      })
      .catch((err) => console.error(err));
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>Profile</h2>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          placeholder="New Password"
        />
        <button type="submit">Update Profile</button>
      </form>
    </div>
  );
};

export default Profile;
