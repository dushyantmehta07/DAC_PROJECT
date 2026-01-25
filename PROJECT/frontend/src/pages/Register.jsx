import { useState } from "react";
import api from "../api/api";

function Register() {
  const [form, setForm] = useState({
    name: "",
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

    api.post("/auth/register", form)
      .then(() => {
        alert("✅ Registration successful");
        setForm({ name: "", email: "", password: "" });
      })
      .catch(err => {
        console.error(err);
        alert("❌ Registration failed");
      });
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>📝 Register</h2>

      <form onSubmit={handleSubmit}>

        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit">
          Register
        </button>

      </form>
    </div>
  );
}

export default Register;
