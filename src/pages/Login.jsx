import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login({ setRole, setIsLoggedIn }) {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    // 🔴 validation
    if (!form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
      (u) =>
        u.email === form.email &&
        u.password === form.password
    );

    if (!user) {
      alert("Invalid email or password");
      return;
    }

    
    setRole(user.role);
    localStorage.setItem("role", user.role);

    setIsLoggedIn(true);

    
    navigate("/dashboard");
  };

  return (
    <div className="auth-container">
      <div className="glass-card auth-card">
        <h2 className="accent-text">Login</h2>

        
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        {/* LOGIN BUTTON */}
        <button onClick={handleLogin}>Login</button>

        {/* SWITCH TO REGISTER */}
        <p
          style={{ cursor: "pointer", marginTop: "10px" }}
          onClick={() => navigate("/register")}
        >
          Create account
        </p>
      </div>
    </div>
  );
}