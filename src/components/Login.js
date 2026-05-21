import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// ✅ FIX 2: Fallback add kiya
const API = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/profile");
  }, [navigate]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

 const handleLogin = async () => {
  setError("");

  if (!form.email || !form.password) {
    setError("Email aur password required hai");
    return;
  }

  if (!form.email.includes("@")) {
    setError("Valid email enter karo");
    return;
  }

  if (form.password.length < 6) {
    setError("Password minimum 6 characters ka hona chahiye");
    return;
  }

  try {
    setLoading(true);

      // ✅ FIX 1: /api prefix add kiya
      const res  = await fetch(`${API}/api/auth/login`, {
        method  : "POST",
        headers : { "Content-Type": "application/json" },
        body    : JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        return;
      }

      // ✅ FIX 3: "user" key use karo — Checkout.js se match karta hai
      localStorage.setItem("user",  JSON.stringify(data));
      localStorage.setItem("token", data.token);

      navigate("/profile");

    } catch {
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
          color: rgba(100, 220, 150, 0.7);
          margin-bottom: 6px;
          display: block;
          text-transform: uppercase;
        }

        .login-input {
          width: 100%;
          padding: 12px;
          margin-bottom: 15px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(0,255,136,0.2);
          border-radius: 8px;
          color: white;
          box-sizing: border-box;
        }

        .login-input:focus {
          outline: none;
          border-color: #00cc6a;
        }

        .login-btn {
          width: 100%;
          padding: 14px;
          background: linear-gradient(135deg, #277752, #00cc6a);
          border: none;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          color: #fff;
          font-size: 14px;
          letter-spacing: 0.04em;
        }

        .login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .login-error {
          color: #ff6b6b;
          font-size: 12px;
          margin-bottom: 10px;
        }

        .login-footer {
          text-align: center;
          font-size: 13px;
          color: rgba(255,255,255,0.4);
          margin-top: 15px;
        }

        /* ✅ FIX 4: Link visible color */
        .login-footer a {
          color: #00cc6a;
          font-weight: bold;
          text-decoration: none;
        }

        .login-footer a:hover {
          text-decoration: underline;
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
  value={form.email}
  onChange={handleChange}
  required
/>

         <label className="login-label">Password *</label>
<input
  className="login-input"
  type="password"
  name="password"
  placeholder="Enter password"
  value={form.password}
  onChange={handleChange}
  minLength={6}
  required
/>

          {error && <div className="login-error">❌ {error}</div>}

          <button className="login-btn" onClick={handleLogin} disabled={loading}>
            {loading ? "Logging in..." : "Log in"}
          </button>

          <div className="login-footer">
            Don't have an account? <Link to="/signup">Sign up</Link>
          </div>

        </div>
      </div>
    </>
  );
}
