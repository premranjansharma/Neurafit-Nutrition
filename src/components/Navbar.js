import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import logo from "../assets/logo.png";

export default function Navbar({ offers }) {
  const { cart } = useContext(CartContext);

  const [current, setCurrent] = useState(0);
  const [timeLeft, setTimeLeft] = useState(null);
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userName, setUserName] = useState(localStorage.getItem("userName"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    localStorage.removeItem("userId");
    setToken(null);
    setUserName(null);
    navigate("/login");
  };

  useEffect(() => {
    if (!offers || offers.length === 0) return;
    setCurrent(0);
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % offers.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [offers]);

  useEffect(() => {
    if (!offers || offers.length === 0) return;
    let switching = false;
    const interval = setInterval(() => {
      const offer = offers[current];
      if (!offer?.time || !offer?.createdAt) { setTimeLeft(null); return; }
      const created = new Date(offer.createdAt).getTime();
      const expiry = created + offer.time * 1000;
      const diff = Math.floor((expiry - Date.now()) / 1000);
      if (diff <= 0) {
        setTimeLeft(0);
        if (!switching && offers.length > 1) {
          switching = true;
          setTimeout(() => { setCurrent((prev) => (prev + 1) % offers.length); switching = false; }, 300);
        }
      } else {
        setTimeLeft(diff);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [current, offers]);

  const formatTime = (secs) => {
    if (secs == null) return "";
    const h = Math.floor(secs / 3600).toString().padStart(2, "0");
    const m = Math.floor((secs % 3600) / 60).toString().padStart(2, "0");
    const s = (secs % 60).toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
  };

  return (
    <>
      <style>{`

/* ===== NAVBAR ===== */
.nav {
  display: flex;
  align-items: center;
  padding: 1px 20px;
  background: rgba(0, 20, 10, 0.85);
  backdrop-filter: blur(12px);
  position: sticky;
  top: 0;
  z-index: 1000;
  box-sizing: border-box;
  width: 100%;
}

.nav-logo-img {
  width: 125px;
  display: flex;
  transition: 0.3s;
}
  .nav-logo-img:hover {
  transform: scale(1.08);
  
}

/*  (Desktop)    */

.nav-links {
  display: flex;
  gap: 20px;
  margin: 0 auto;
}

.nav-links a {
  color: #69e9d6;
  text-decoration: none;
  font-size: 14px;
  position: relative;
}

.nav-links a::after {
  content: "";
  position: absolute;
  width: 0%;
  height: 2px;
  background: #00ff88;
  left: 0;
  bottom: -3px;
  transition: 0.3s;
}

.nav-links a:hover::after {
  width: 100%;
}

/*      RIGHT SECTION        */

.right-section {
  display: flex;
  align-items: center;
  gap: 15px;
  flex-shrink: 0;
}

/* ===== CART ===== */
.nav-cart {
  position: relative;
  padding: 6px;
  border-radius: 20%;
  background: rgba(2, 38, 21, 0.1);
  border: 1px solid #00ff88;
  color: #fff;
  display: flex;
  align-items: center;
  transition: 0.3s;        
  cursor: pointer;  
}
  .nav-cart:hover {
  background: #00ff88;
  color: black;
  transform: scale(1.1);

}

.nav-cart span {
  position: absolute;
  top: -5px;
  right: -6px;
  background: red;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 50%;
  color: white;
}

/* ===== AUTH BUTTONS ===== */
.auth-buttons {
  display: flex;
  align-items: center;
  gap: ;12px;
}

.nav-login-btn {
  padding: 7px 14px;
  font-weight: bold;
  border-radius: 8px;
  background: transparent;
  border: 1px solid #00ff88;
  color: #00ff88;
  text-decoration: none;
  transition: 0.3s;
  cursor: pointer;
  font-family: 'Poppins', sans-serif;
  font-size: 14px;
  outline: none;
  -webkit-appearance: none;
  appearance: none;
}

.nav-login-btn:hover {
  background: #00ff88;
  color: black;
  transform: scale(1.05);
}
  .login-link {
  margin-right: 16px;
}

.nav-signup-btn {
  padding: 7px 14px;
  border-radius: 8px;
  background: linear-gradient(135deg, #01190e, );
  color: #00ff88;
  text-decoration: none;
  font-weight: bold;
  font-size: 14px;
  transition: transform 0.15s;
  border: 1px solid #00ff88;

}

.nav-signup-btn:hover {
  background: #00ff88;
  color: black;
  transform: scale(1.05);

}

/* ===== MENU ICON ===== */
.menu-icon {
  display: none;
  font-size: 24px;
  cursor: pointer;
  color: #14c99f;
  flex-shrink: 0;
   order: 3;   
    margin-right: 0;
    margin-left: 15px; 
}
.nav-login-btn {
  text-align: center;
}

.nav-signup-btn {
  text-align: center;
}
/* ===== MOBILE AUTH (inside menu) ===== */
.mobile-auth {
  display: none;
}

/* ===== MOBILE ===== */

@media (max-width: 768px) {
  .menu-icon {
    display: block;   
  }


  .nav-logo-img {
    width: 120px;
    display: flex;
  }
  

  /* Desktop auth chhupaao */
  .auth-buttons {
    display: none;
  }

  /* Right mein sirf cart */
  .right-section {
    margin-left: auto;
    gap: 10px;
  }

  /* Nav links — dropdown */
  .nav-links {
    display: none;
    position: absolute;
    top: 57px;
    left: 0;
    width: 100%;
    background: rgba(0, 20, 10, 0.97);
    backdrop-filter: blur(8px);
    flex-direction: column;
    align-items: flex-start;
    padding: 20px;
    box-sizing: border-box;
    margin: 0;
    z-index: 999;
    top: 55px; 
  }

  .nav-links.active {
    display: flex;
  }

  .nav-links a {
    width: 100%;
    text-align: centre;
    padding: 10px 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }

  /* Mobile auth — menu ke andar */
  .mobile-auth {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    margin-top: 12px;
    padding-top: 12px;
    border-top: 1px solid rgba(0,255,136,0.25);
  }

  .mobile-username {
    color: #00ff88;
    text-decoration: none;
    font-size: 14px;
    padding: 5px 0;
  }
}
      `}</style>

      {/* OFFER BAR */}
      {visible && offers?.length > 0 && (
        <div className="offer-bar">
          <div className="offer-text">
            🔥 {offers[current]?.text}
            {timeLeft > 0 && (
              <span className="offer-timer">⏱ {formatTime(timeLeft)}</span>
            )}
          </div>
          <button className="offer-close" onClick={() => setVisible(false)}>
            <span className="ring"></span>
            <span className="x-icon"></span>
          </button>
        </div>
      )}

      {/* NAVBAR */}
      <div className="nav">

        {/* MENU ICON — mobile only */}
        <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? "✕" : "☰"}
        </div>

        {/* LOGO */}
        <Link to="/" className="logo" onClick={() => window.scrollTo(0, 0)}>
          <img src={logo} alt="Logo" className="nav-logo-img" />
        </Link>

        {/* NAV LINKS + MOBILE AUTH */}
        <div className={`nav-links ${menuOpen ? "active" : ""}`}>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/About" onClick={() => setMenuOpen(false)}>About</Link>
          <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link to="/health" onClick={() => setMenuOpen(false)}>Health</Link>
          <Link to="/Blog" onClick={() => setMenuOpen(false)}>Blog</Link>
          <Link to="/sales" onClick={() => setMenuOpen(false)}>Sales</Link>
          <Link to="/track" onClick={() => setMenuOpen(false)}>Track</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

          {/* ✅ Auth — mobile menu ke andar */}
          <div className="mobile-auth">
            {token ? (
              <>
                <Link to="/profile" className="mobile-username" onClick={() => setMenuOpen(false)}>
                  👋 {userName}
                </Link>
                <button onClick={handleLogout} className="nav-login-btn">
                  Logout 🚪
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-login-btn" onClick={() => setMenuOpen(false)}>Log In</Link>
                <Link to="/signup" className="nav-signup-btn" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </>
            )}
          </div>
        </div>

        {/* RIGHT SECTION — cart + desktop auth */}
        <div className="right-section">

          {/* CART */}
          <Link to="/cart" className="nav-cart">
            <FaShoppingCart size={20} />
            <span>{cart.reduce((sum, item) => sum + item.qty, 0)}</span>
          </Link>

          {/* AUTH — desktop only */}
          <div className="auth-buttons">
            {token ? (
              <>
                <Link to="/profile" style={{ color: "#00ff88" }}>
                  👋 {userName}
                </Link>
                <button onClick={handleLogout} className="nav-login-btn">
                  Logout 🚪
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-login-btn">Log In</Link>
               <span style={{ margin: "0 12px", color: "#00ff88" }}>|</span>
               <Link to="/signup" className="nav-signup-btn">Sign Up</Link>
              </>
            )}
          </div>

        </div>
      </div>
    </>
  );
}
