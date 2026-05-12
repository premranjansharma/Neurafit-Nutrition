import React, { useState,useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const API = "http://localhost:5000/api";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",

    
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
if (userInfo?.token) {
  navigate("/profile");
}
}, [navigate]);
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async () => {
  setError("");

  if (!form.email || !form.password) {
    setError("Email aur password required hai");
    return;
  }

  try {
    setLoading(true);

   const res = await fetch(`${API}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
      return;
    }

    // ✅ Save user data
  localStorage.setItem("userInfo", JSON.stringify(data));
  localStorage.setItem("token", data.token);   // 🔥 YE LINE ADD KARO
    // 🔥 FINAL FIX
    navigate("/profile");

  } catch (err) {
    setError("Server se connect nahi ho pa raha");
  } finally {
    setLoading(false);
  }
};

  return (
    <>
      <style>{`
        .login-page {
          min-height: 100vh;
          background: linear-gradient(160deg, #62a563 0%, #012210 60%, #032706 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Segoe UI', sans-serif;
        }

        .login-card {
          background: #0d0d0b;
          border: 1px solid rgba(0,255,136,0.25);
          border-radius: 18px;
          padding: 40px;
          width: 100%;
          max-width: 400px;
        }

        .login-title {
          font-size: 24px;
          font-weight: 900;
          text-align: center;
          background: linear-gradient(135deg, #fff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-transform: uppercase;
          letter-spacing: 3px;
          margin-bottom: 8px;
        }

        .login-sub {
          text-align: center;
          font-size: 11px;
          color: rgba(255,255,255,0.3);
          margin-bottom: 20px;
        }

        .login-label {
          font-size: 11px;
          color: rgba(10, 110, 64, 0.6);
          margin-bottom: 6px;
          display: block;
          text-transform: uppercase;
        }

        .login-input {
          width: 94%;
          padding: 12px;
          margin-bottom: 15px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(0,255,136,0.2);
          border-radius: 8px;
          color: white;
        }

        .login-input:focus {
          outline: none;
          border-color: #056e3d;
          
        
        }

        .login-btn {
    
          width: 99%;
          padding: 14px;
          background: linear-gradient(135deg, #277752, #00cc6a);
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          margin: 1%;
          
        }

        .login-btn:disabled {
          opacity: 0.6;
        }

        .login-error {
          color: #ff6b6b;
          font-size: 12px;
          margin-bottom: 10px;
        }

        .login-footer {
          text-align: center;
          font-size: 13px;
          margin-top: 15px;
        }

        .login-footer a {
          color: #094328;
          font-weight: bold;
          text-decoration: none;
        }
      `}</style>

      <div className="login-page">
        <div className="login-card">

          <div className="login-title">Log in</div>
          <div className="login-sub">Neurafit Nutrition</div>

          <label className="login-label">Email *</label>
          <input
            className="login-input"
            type="email"
            name="email"
            placeholder="Enter email"
            onChange={handleChange}
          />

          <label className="login-label">Password *</label>
          <input
            className="login-input"
            type="password"
            name="password"
            placeholder="Enter password"
            onChange={handleChange}
          />

          {error && <div className="login-error">❌ {error}</div>}

          <button className="login-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Log in "}
          </button>

          <div className="login-footer">
            Don't have an account? <Link to="/signup">Sign up </Link>
          </div>

        </div>
      </div>
    </>
  );
}