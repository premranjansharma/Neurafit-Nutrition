import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// ✅ FIX 2: Fallback add kiya
const API = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export default function Signup() {
  const [form, setForm] = useState({
    firstName: "", lastName: "",
    email: "", phone: "",
    address: "", pincode: "",
    city: "", district: "", state: "",
    password: "", confirmPassword: "",
  });
  const [error,   setError]   = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async () => {
    setError("");

    if (!form.firstName || !form.email || !form.password) {
      setError("First name, email aur password required hain");
      return;
    }
    if (form.password.length < 6) {
      setError("Password kam se kam 6 characters ka hona chahiye");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords match nahi kar rahe");
      return;
    }

    try {
      setLoading(true);

      // ✅ FIX 1: /api prefix add kiya
      const res = await fetch(`${API}/api/auth/signup`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name    : `${form.firstName} ${form.lastName}`.trim(),
          email   : form.email,
          password: form.password,
          phone   : form.phone,
          address : `${form.address}, ${form.city}, ${form.district}, ${form.state} - ${form.pincode}`.trim(),
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
        return;
      }

      // ✅ FIX 3: Login.js se consistent — "user" key use karo
      localStorage.setItem("user",  JSON.stringify(data));
      localStorage.setItem("token", data.token);

      // ✅ FIX 4: reload hata diya — navigate kaafi hai
      navigate("/");

    } catch {
      setError("Server se connect nahi ho pa raha. Backend check karo.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .signup-page {
          min-height: calc(100vh - 64px);
          background: linear-gradient(160deg, #a2a2a0 0%, #0c3e23 60%, #013c18 100%);
          display: flex; align-items: center; justify-content: center;
          font-family: 'Segoe UI', sans-serif; padding: 32px 24px;
        }
        .signup-card {
          background: #0d0d0b;
          border: 1px solid rgba(0,255,136,0.25);
          border-radius: 18px; padding: 48px 40px;
          width: 100%; max-width: 560px;
        }
        .signup-title {
          font-size: 24px; font-weight: 900; text-align: center;
          background: linear-gradient(135deg, #fff, #00ff88);
          -webkit-background-clip: text; -webkit-text-fill-color: transparent;
          background-clip: text;
          font-family: 'Impact','Arial Black',sans-serif;
          text-transform: uppercase; letter-spacing: 3px; margin-bottom: 6px;
        }
        .signup-sub {
          text-align: center; font-size: 11px;
          color: rgba(255,255,255,0.25); letter-spacing: 2px; margin-bottom: 10px;
        }
        .signup-back {
          display: block; text-align: center;
          font-size: 12px; color: rgba(0,255,136,0.5);
          text-decoration: none; margin-bottom: 28px;
        }
        .signup-back:hover { color: #00ff88; }
        .signup-divider {
          height: 1px; background: rgba(0,255,136,0.12); margin-bottom: 24px;
        }
        .signup-grid {
          display: grid; grid-template-columns: 1fr 1fr; gap: 14px;
          margin-bottom: 14px;
        }
        .signup-full { grid-column: 1 / -1; }
        .signup-label {
          display: block; font-size: 10px; font-weight: 700;
          color: rgba(0,255,136,0.6); letter-spacing: 2px;
          text-transform: uppercase; margin-bottom: 6px;
        }
        .signup-input, .signup-textarea {
          width: 100%; background: rgba(255,255,255,0.04);
          border: 1px solid rgba(0,255,136,0.15); border-radius: 8px;
          padding: 12px 14px; color: #fff; font-size: 13px;
          outline: none; transition: border-color 0.2s;
          box-sizing: border-box; font-family: inherit;
        }
        .signup-textarea { resize: vertical; min-height: 72px; }
        .signup-input:focus, .signup-textarea:focus {
          border-color: rgba(0,255,136,0.55);
        }
        .signup-err {
          background: rgba(255,69,69,0.08);
          border: 1px solid rgba(255,69,69,0.25);
          color: #ff6b6b; font-size: 12px;
          padding: 10px 14px; border-radius: 7px; margin-bottom: 16px;
        }
        .signup-btn {
          width: 100%;
          background: linear-gradient(135deg, #2e875d, #00cc6a);
          color: #0a0a09; font-weight: 800; font-size: 14px;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 14px; border-radius: 8px; border: none;
          cursor: pointer; transition: opacity 0.2s, transform 0.15s;
          margin-bottom: 20px; margin-top: 8px;
        }
        .signup-btn:hover:not(:disabled) { opacity: 0.88; transform: translateY(-2px); }
        .signup-btn:disabled { opacity: 0.5; cursor: not-allowed; }
        .signup-switch {
          text-align: center; font-size: 13px; color: rgba(255,255,255,0.4);
        }
        .signup-switch a { color: #21b36f; text-decoration: none; font-weight: 700; }
        .signup-switch a:hover { text-decoration: underline; }
        .signup-section-title {
          font-size: 10px; font-weight: 700; color: rgba(0,255,136,0.4);
          letter-spacing: 3px; text-transform: uppercase;
          margin: 20px 0 14px; border-top: 1px solid rgba(0,255,136,0.08);
          padding-top: 18px;
        }
      `}</style>

      <div className="signup-page">
        <div className="signup-card">
          <div className="signup-title">Create Account</div>
          <div className="signup-sub">Neurafit Nutrition</div>
          <Link to="/" className="signup-back">⬅ Back to Home</Link>
          <div className="signup-divider" />

          {/* ── Personal Info ── */}
          <div className="signup-grid">
            <div>
              <label className="signup-label">First Name *</label>
              {/* ✅ FIX 5: value prop add kiya — controlled inputs */}
              <input className="signup-input" name="firstName"
                placeholder="Prem" value={form.firstName} onChange={handleChange} />
            </div>
            <div>
              <label className="signup-label">Last Name</label>
              <input className="signup-input" name="lastName"
                placeholder="Sharma" value={form.lastName} onChange={handleChange} />
            </div>
            <div>
              <label className="signup-label">Email *</label>
              <input className="signup-input" name="email" type="email"
                placeholder="prem@email.com" value={form.email} onChange={handleChange} />
            </div>
            <div>
              <label className="signup-label">Phone</label>
              <input className="signup-input" name="phone" type="tel"
                placeholder="9876543210" maxLength={10} value={form.phone} onChange={handleChange} />
            </div>
          </div>

          {/* ── Address ── */}
          <div className="signup-section-title">📍 Address</div>
          <div className="signup-grid">
            <div className="signup-full">
              <label className="signup-label">Complete Address</label>
              <textarea className="signup-textarea" name="address"
                placeholder="House No, Street, Area..."
                value={form.address} onChange={handleChange} />
            </div>
            <div>
              <label className="signup-label">PIN Code</label>
              <input className="signup-input" name="pincode"
                placeholder="846005" maxLength={6}
                value={form.pincode} onChange={handleChange} />
            </div>
            <div>
              <label className="signup-label">City</label>
              <input className="signup-input" name="city"
                placeholder="Darbhanga" value={form.city} onChange={handleChange} />
            </div>
            <div>
              <label className="signup-label">District</label>
              <input className="signup-input" name="district"
                placeholder="Darbhanga" value={form.district} onChange={handleChange} />
            </div>
            <div>
              <label className="signup-label">State</label>
              <input className="signup-input" name="state"
                placeholder="Bihar" value={form.state} onChange={handleChange} />
            </div>
          </div>

          {/* ── Password ── */}
          <div className="signup-section-title">🔒 Password</div>
          <div className="signup-grid">
            <div>
              <label className="signup-label">Password *</label>
              <input className="signup-input" name="password" type="password"
                placeholder="Min 6 characters"
                value={form.password} onChange={handleChange} />
            </div>
            <div>
              <label className="signup-label">Confirm Password *</label>
              <input className="signup-input" name="confirmPassword" type="password"
                placeholder="Re-enter password"
                value={form.confirmPassword} onChange={handleChange} />
            </div>
          </div>

          {error && <div className="signup-err">❌ {error}</div>}

          <button className="signup-btn" onClick={handleSignup} disabled={loading}>
            {loading ? "Creating Account..." : "Create Account"}
          </button>

          <div className="signup-switch">
            Already have an account? <Link to="/login">Log in</Link>
          </div>
        </div>
      </div>
    </>
  );
}
