import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    email: "",
    password: "",
    role: "viewer",
  });

  const navigate = useNavigate();

  const handleRegister = () => {
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    users.push(form);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registered successfully!");

    
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <div className="glass-card auth-card">
        <h2 className="accent-text">Register</h2>

        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <select
          value={form.role}
          onChange={(e) =>
            setForm({ ...form, role: e.target.value })
          }
        >
          <option value="viewer">Viewer</option>
          <option value="admin">Admin</option>
        </select>

        <button onClick={handleRegister}>Register</button>

        <p
          onClick={() => navigate("/login")}
          style={{ cursor: "pointer" }}
        >
          Already have an account? Login
        </p>
      </div>
    </div>
  );
}