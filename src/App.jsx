import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Transactions from "./pages/Transactions";
import Insights from "./pages/Insights";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  const [theme, setTheme] = useState("dark");
  const [role, setRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true); // 🔥 IMPORTANT


  useEffect(() => {
    const savedRole = localStorage.getItem("role");

    if (savedRole) {
      setRole(savedRole);
      setIsLoggedIn(true);
    }

    setLoading(false);
  }, []);

  // 🔒 Protected Route
  const ProtectedRoute = ({ children }) => {
    if (!isLoggedIn) {
      return <Navigate to="/login" />;
    }
    return children;
  };

  if (loading) {
    return null; 
  }

  return (
    <div className={`app ${theme}`}>
      <BrowserRouter>
        <Navbar
          theme={theme}
          setTheme={setTheme}
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
        />

        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="/transactions"
            element={
              <ProtectedRoute>
                <Transactions role={role} />
              </ProtectedRoute>
            }
          />

          <Route
            path="/insights"
            element={
              <ProtectedRoute>
                <Insights />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={
              <Login
                setRole={setRole}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />

          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;