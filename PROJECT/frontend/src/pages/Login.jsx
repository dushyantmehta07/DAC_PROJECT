import { useState } from "react";
import api from "../api/api";

function Login({ onLogin }) {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  }

  function handleSubmit(e) {
    e.preventDefault();

    api.post("/auth/login", form)
      .then(res => {
        alert("✅ Login successful");
        onLogin(res.data);
      })
      .catch(() => alert("❌ Invalid credentials"));
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>🔐 Login</h2>

      <form onSubmit={handleSubmit}>
        <input name="email" placeholder="Email" onChange={handleChange} /><br/>
        <input name="password" type="password" placeholder="Password" onChange={handleChange} /><br/>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
