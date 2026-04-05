import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ theme, setTheme, isLoggedIn, setIsLoggedIn }) {
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleAuth = () => {
    if (isLoggedIn) {
      localStorage.removeItem("role");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">Finance Dashboard</div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/transactions">Transactions</Link>
        <Link to="/insights">Insights</Link>
      </div>

      <div style={{ display: "flex", gap: "10px" }}>
        <button onClick={toggleTheme}>
          {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
        </button>

        <button onClick={handleAuth}>
          {isLoggedIn ? "Logout" : "Login"}
        </button>
      </div>
    </nav>
  );
}