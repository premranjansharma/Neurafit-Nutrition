import React, { useContext, useState, useMemo, useRef, useEffect, useCallback } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const FREE_DELIVERY_AT = 600;
const DELIVERY_FEE     = 35;

// ✅ FIX 1: Consistent env var — About.js se match karta hai
const API_BASE = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

const fmt = (n) =>
  "₹" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --cream:         #fdf6ec;
    --warm-white:    #fff9f2;
    --saffron:       #e8791a;
    --saffron-light: #f5a050;
    --saffron-bg:    #fff3e8;
    --charcoal:      #1c1a18;
    --text-muted:    #7a7068;
    --border:        #e8e0d4;
    --card-shadow:   0 2px 16px rgba(28,26,24,0.07);
    --green:         #27a047;
    --green-bg:      #e8f8ec;
    --green-border:  #b8e8c2;
    --red:           #c0392b;
    --radius:        14px;
    --radius-sm:     8px;
    --ff-display:    'Cormorant Garamond', serif;
    --ff-body:       'DM Sans', sans-serif;
    --tr:            0.2s ease;
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .cart-page {
    min-height: 100vh;
    background: var(--cream);
    background-image:
      radial-gradient(circle at 80% 10%, #f5e6d0 0%, transparent 40%),
      radial-gradient(circle at 5%  90%, #fde8cc 0%, transparent 35%);
    font-family: var(--ff-body);
    padding: 48px 24px 80px;
    max-width: 680px;
    margin: 0 auto;
    margin-top: 30px;       
    margin-bottom: 30px;
  }

  .cart-header { display:flex; align-items:baseline; gap:14px; margin-bottom:32px; border-bottom:1.5px solid var(--border); padding-bottom:20px; }
  .cart-header h2 { font-family:var(--ff-display); font-size:2.4rem; font-weight:700; color:var(--charcoal); letter-spacing:-0.02em; line-height:1; }
  .cart-count { font-size:0.75rem; font-weight:600; color:var(--saffron); background:var(--saffron-bg); border:1px solid #f5c490; padding:3px 10px; border-radius:20px; letter-spacing:0.04em; text-transform:uppercase; }
  .cart-empty { text-align:center; padding:72px 24px; color:var(--text-muted); }
  .cart-empty .empty-icon { font-size:3.5rem; display:block; margin-bottom:16px; opacity:0.5; }
  .cart-empty p { font-size:1.1rem; }
  .cart-items { display:flex; flex-direction:column; gap:12px; margin-bottom:16px; }
  .cart-item { background:var(--warm-white); border:1px solid var(--border); border-radius:var(--radius); padding:16px 18px; display:flex; align-items:center; gap:14px; box-shadow:var(--card-shadow); transition:transform var(--tr),box-shadow var(--tr); animation:slideIn 0.35s ease both; }
  @keyframes slideIn { from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)} }
  .cart-item:hover { transform:translateY(-2px); box-shadow:0 6px 24px rgba(28,26,24,0.11); }
  .item-img { width:62px; height:62px; border-radius:10px; background:#f0e8d8; border:1px solid var(--border); flex-shrink:0; overflow:hidden; display:flex; align-items:center; justify-content:center; }
  .item-img img { width:100%; height:100%; object-fit:cover; }
  .item-img .item-img-fallback { font-size:1.6rem; }
  .item-info { flex:1; min-width:0; }
  .item-info h3 { font-family:var(--ff-display); font-size:1.1rem; font-weight:600; color:var(--charcoal); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-bottom:3px; }
  .item-price-line { font-size:0.82rem; color:var(--text-muted); }
  .item-right { display:flex; flex-direction:column; align-items:flex-end; gap:8px; flex-shrink:0; }
  .item-line-total { font-size:0.95rem; font-weight:600; color:var(--saffron); }
  .qty-controls { display:flex; align-items:center; border:1.5px solid var(--border); border-radius:var(--radius-sm); overflow:hidden; background:white; }
  .qty-controls button { width:30px; height:30px; border:none; background:transparent; font-size:1rem; color:var(--charcoal); cursor:pointer; display:flex; align-items:center; justify-content:center; transition:background var(--tr),color var(--tr); }
  .qty-controls button:hover { background:var(--saffron); color:white; }
  .qty-controls span { min-width:30px; text-align:center; font-size:0.85rem; font-weight:600; color:var(--charcoal); border-left:1px solid var(--border); border-right:1px solid var(--border); user-select:none; }
  .remove-btn { border:none; background:transparent; font-size:0.72rem; font-weight:600; color:var(--text-muted); cursor:pointer; letter-spacing:0.04em; text-transform:uppercase; padding:4px 6px; border-radius:5px; transition:color var(--tr),background var(--tr); }
  .remove-btn:hover { color:var(--red); background:#fdecea; }

  .coupon-list-section { margin-bottom:14px; }
  .coupon-section-label { font-size:0.68rem; font-weight:700; letter-spacing:0.13em; text-transform:uppercase; color:var(--text-muted); margin-bottom:10px; display:flex; align-items:center; gap:8px; }
  .coupon-section-label::after { content:''; flex:1; height:1px; background:var(--border); }
  .coupon-cards { display:flex; flex-direction:column; gap:9px; }

  .coupon-skeleton { height:62px; border-radius:12px; background:linear-gradient(90deg,#f0e8d8 25%,#f8f2ea 50%,#f0e8d8 75%); background-size:200% 100%; animation:shimmer 1.4s infinite; }
  @keyframes shimmer { 0%{background-position:200% 0}100%{background-position:-200% 0} }

  .coupon-card { background:var(--warm-white); border:1.5px dashed var(--border); border-radius:12px; padding:12px 14px; display:flex; align-items:center; gap:12px; cursor:pointer; transition:border-color var(--tr),background var(--tr),transform 0.15s; user-select:none; }
  .coupon-card:hover { border-color:var(--saffron); background:var(--saffron-bg); transform:translateY(-1px); }
  .coupon-card.applied { border-color:var(--green-border); background:var(--green-bg); border-style:solid; }
  .coupon-card.applied:hover { border-color:var(--green); background:#d5f2e0; }
  .coupon-card-icon { width:38px; height:38px; border-radius:9px; background:var(--saffron-bg); border:1px solid #f5c490; display:flex; align-items:center; justify-content:center; flex-shrink:0; font-size:18px; }
  .coupon-card.applied .coupon-card-icon { background:var(--green-bg); border-color:var(--green-border); }
  .coupon-card-body { flex:1; min-width:0; }
  .coupon-card-code { font-family:var(--ff-display); font-size:1rem; font-weight:700; color:var(--charcoal); letter-spacing:0.05em; margin-bottom:1px; }
  .coupon-card-desc { font-size:11.5px; color:var(--text-muted); white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .coupon-card-expiry { font-size:10px; color:#bbb; margin-top:1px; }
  .coupon-card-right { display:flex; flex-direction:column; align-items:flex-end; gap:4px; flex-shrink:0; }
  .coupon-badge { font-size:10px; font-weight:700; padding:2px 8px; border-radius:20px; white-space:nowrap; letter-spacing:0.04em; }
  .coupon-badge.percent { background:var(--saffron-bg); color:#b35c10; border:1px solid #f5c490; }
  .coupon-badge.flat    { background:#eef3ff; color:#3355cc; border:1px solid #c0cdf7; }
  .coupon-badge.free    { background:var(--green-bg); color:#1a7a35; border:1px solid var(--green-border); }
  .coupon-apply-tag   { font-size:10.5px; font-weight:600; color:var(--saffron); letter-spacing:0.04em; text-transform:uppercase; }
  .coupon-applied-tag { font-size:10.5px; font-weight:600; color:var(--green); letter-spacing:0.04em; text-transform:uppercase; }
  .coupon-fetch-error { font-size:12px; color:var(--red); text-align:center; padding:12px; }

  .coupon-box { background:var(--warm-white); border:1.5px dashed var(--border); border-radius:12px; padding:14px 16px; margin-bottom:14px; position:relative; }
  .coupon-label { font-size:0.72rem; font-weight:600; letter-spacing:0.1em; text-transform:uppercase; color:var(--text-muted); margin-bottom:10px; display:flex; align-items:center; gap:6px; }
  .coupon-row { display:flex; gap:8px; }
  .coupon-input { flex:1; background:white; border:1.5px solid var(--border); border-radius:var(--radius-sm); padding:10px 13px; font-family:var(--ff-body); font-size:13px; color:var(--charcoal); letter-spacing:0.07em; text-transform:uppercase; outline:none; transition:border-color var(--tr); }
  .coupon-input::placeholder { text-transform:none; letter-spacing:0; color:#bbb; }
  .coupon-input:focus { border-color:var(--saffron); }
  .coupon-apply-btn { background:var(--saffron); border:none; color:white; border-radius:var(--radius-sm); padding:10px 18px; font-family:var(--ff-body); font-size:13px; font-weight:600; cursor:pointer; white-space:nowrap; transition:filter var(--tr),opacity var(--tr); }
  .coupon-apply-btn:hover { filter:brightness(1.08); }
  .coupon-apply-btn:disabled { opacity:0.6; cursor:not-allowed; filter:none; }
  .coupon-msg { font-size:12px; margin-top:6px; font-weight:500; min-height:18px; }
  .coupon-msg.ok  { color:var(--green); }
  .coupon-msg.err { color:var(--red); }
  .coupon-applied { display:flex; justify-content:space-between; align-items:center; background:var(--green-bg); border:1px solid var(--green-border); border-radius:var(--radius-sm); padding:9px 12px; font-size:12px; color:#1a7a35; font-weight:500; }
  .coupon-remove-btn { background:none; border:none; color:#1a7a35; cursor:pointer; font-size:12px; font-weight:600; padding:0; transition:opacity var(--tr); }
  .coupon-remove-btn:hover { opacity:0.7; }

  .delivery-progress { background:var(--warm-white); border:1px solid var(--border); border-radius:12px; padding:14px 16px; margin-bottom:14px; }
  .progress-header { display:flex; justify-content:space-between; align-items:center; margin-bottom:10px; }
  .progress-title { font-size:13px; font-weight:600; color:var(--charcoal); }
  .progress-title.done { color:var(--green); }
  .progress-sub { font-size:12px; color:var(--text-muted); }
  .progress-bar-bg { height:6px; background:#ede8df; border-radius:4px; overflow:hidden; }
  .progress-bar-fill { height:100%; background:linear-gradient(90deg,var(--saffron),var(--saffron-light)); border-radius:4px; transition:width 0.5s ease; }
  .progress-bar-fill.done { background:linear-gradient(90deg,var(--green),#5ecf8a); }

  .price-box { background:var(--warm-white); border:1.5px solid var(--border); border-radius:var(--radius); padding:20px 22px; margin-bottom:18px; box-shadow:var(--card-shadow); }
  .price-box-title { font-size:0.68rem; font-weight:700; letter-spacing:0.12em; text-transform:uppercase; color:var(--text-muted); margin-bottom:14px; }
  .price-row { display:flex; justify-content:space-between; align-items:center; font-size:0.9rem; color:var(--text-muted); padding:6px 0; border-bottom:1px dashed var(--border); }
  .price-row:last-of-type { border-bottom:none; }
  .discount-value { color:var(--green); font-weight:600; }
  .free-badge { background:var(--green-bg); color:var(--green); font-size:0.68rem; font-weight:700; padding:2px 8px; border-radius:20px; letter-spacing:0.06em; text-transform:uppercase; border:1px solid var(--green-border); }
  .price-divider { height:1.5px; background:linear-gradient(90deg,var(--saffron),var(--border)); border-radius:2px; margin:12px 0 10px; }
  .total-row { display:flex; justify-content:space-between; align-items:center; }
  .total-label { font-family:var(--ff-display); font-size:1.3rem; font-weight:600; color:var(--charcoal); }
  .total-amount { font-family:var(--ff-display); font-size:1.6rem; font-weight:700; color:var(--charcoal); letter-spacing:-0.02em; }
  .savings-note { font-size:11.5px; color:var(--green); text-align:right; margin-top:5px; font-weight:500; }

  .checkout-btn { width:100%; padding:17px 24px; background:linear-gradient(135deg,var(--saffron) 0%,#d4621a 100%); color:white; border:none; border-radius:var(--radius); font-family:var(--ff-body); font-size:1rem; font-weight:600; cursor:pointer; letter-spacing:0.02em; box-shadow:0 4px 20px rgba(232,121,26,0.38); transition:transform var(--tr),box-shadow var(--tr),filter var(--tr); position:relative; overflow:hidden; }
  .checkout-btn::after { content:''; position:absolute; inset:0; background:linear-gradient(135deg,rgba(255,255,255,0.12) 0%,transparent 60%); pointer-events:none; }
  .checkout-btn:hover { transform:translateY(-2px); box-shadow:0 8px 28px rgba(232,121,26,0.5); filter:brightness(1.05); }
  .checkout-btn:active { transform:translateY(0); }
  .checkout-inner { display:flex; align-items:center; justify-content:space-between; }
  .checkout-amount { font-family:var(--ff-display); font-size:1.25rem; font-weight:700; opacity:0.92; }

  @media (max-width:520px) {
    .cart-page { padding:28px 14px 60px; }
    .cart-header h2 { font-size:1.9rem; }
    .cart-item { flex-wrap:wrap; gap:10px; }
    .item-right { flex-direction:row; align-items:center; flex-wrap:wrap; justify-content:flex-end; }
  }
`;

export default function Cart() {
  const { cart, removeFromCart, increaseQty, decreaseQty } = useContext(CartContext);
  const navigate = useNavigate();

  // ✅ FIX 2: couponRef sirf coupon section pe — poore component pe nahi
  const couponRef = useRef();

  const [couponInput, setCouponInput]       = useState("");
  const [appliedCoupon, setAppliedCoupon]   = useState(null);
  const [couponMsg, setCouponMsg]           = useState({ text: "", type: "" });
  const [showCouponList, setShowCouponList] = useState(false);

  const [couponList, setCouponList]   = useState([]);
  const [listLoading, setListLoading] = useState(false);
  const [listError, setListError]     = useState("");
  const [validating, setValidating]   = useState(false);

  // ✅ FIX 2: Sirf coupon box ke bahar click pe band hoga
  useEffect(() => {
    const handle = (e) => {
      if (couponRef.current && !couponRef.current.contains(e.target)) {
        setShowCouponList(false);
      }
    };
    document.addEventListener("mousedown", handle);
    return () => document.removeEventListener("mousedown", handle);
  }, []);

  const fetchCouponList = useCallback(async () => {
    if (couponList.length > 0) return;
    setListLoading(true);
    setListError("");
    try {
      // ✅ FIX 3: Auth token add kiya — agar route protected hai
      const token = localStorage.getItem("token");
      const res   = await fetch(`${API_BASE}/api/coupons`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      const data  = await res.json();
      if (data.success) {
        setCouponList(data.coupons);
      } else {
        setListError("Could not load coupons");
      }
    } catch {
      setListError("Network error");
    } finally {
      setListLoading(false);
    }
  }, [couponList.length]);

  const { subtotal, discountAmt, deliveryFee, total, progressPct, needed } = useMemo(() => {
    const sub = cart.reduce((s, item) => s + item.price * (item.qty ?? item.quantity ?? 1), 0);

    let disc     = 0;
    let freeShip = false;
    if (appliedCoupon) {
      if (appliedCoupon.type === "free")   { freeShip = true; }
      else if (appliedCoupon.isPercent)    { disc = appliedCoupon.discountAmt ?? Math.round(sub * appliedCoupon.discount / 100); }
      else                                 { disc = appliedCoupon.discountAmt ?? appliedCoupon.discount; }
    }

    const discedSub = sub - disc;
    const del       = (freeShip || discedSub >= FREE_DELIVERY_AT) ? 0 : DELIVERY_FEE;
    const pct       = Math.min(100, Math.round((discedSub / FREE_DELIVERY_AT) * 100));
    const need      = Math.max(0, FREE_DELIVERY_AT - discedSub);

    return { subtotal: sub, discountAmt: disc, deliveryFee: del, total: discedSub + del, progressPct: pct, needed: need };
  }, [cart, appliedCoupon]);

  const totalItems = cart.reduce((s, item) => s + (item.qty ?? item.quantity ?? 1), 0);

  const showMsg = (text, type) => {
    setCouponMsg({ text, type });
    setTimeout(() => setCouponMsg({ text: "", type: "" }), 3500);
  };

  const validateAndApply = async (code) => {
    setValidating(true);
    setShowCouponList(false);
    try {
      // ✅ FIX 3: Auth token validate mein bhi
      const token = localStorage.getItem("token");
      const res   = await fetch(`${API_BASE}/api/coupons/validate`, {
        method : "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          code     : code.trim().toUpperCase(),
          cartTotal: subtotal,
        }),
      });
      const data = await res.json();

      if (data.success) {
        setAppliedCoupon(data.coupon);
        setCouponInput(data.coupon.code);
        showMsg(data.message, "ok");
      } else {
        showMsg(data.message || "Invalid coupon", "err");
      }
    } catch {
      showMsg("Network error. Please try again.", "err");
    } finally {
      setValidating(false);
    }
  };

  const handleApplyCoupon = (code) => {
    if (appliedCoupon?.code === code) { handleRemoveCoupon(); return; }
    validateAndApply(code);
  };

  const handleApplyCouponFromInput = () => {
    const code = couponInput.trim().toUpperCase();
    if (!code) { showMsg("Enter a coupon code", "err"); return; }
    validateAndApply(code);
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponInput("");
    setCouponMsg({ text: "", type: "" });
  };

  const getQty = (item) => item.qty ?? item.quantity ?? 1;
  const getId  = (item) => item._id || item.id;

  return (
    // ✅ FIX 2: ref yahan se hata diya
    <div>
      <style>{styles}</style>

      <div className="cart-page">

        {/* ── Header ── */}
        <div className="cart-header">
          <h2>🛒 Your Cart</h2>
          {cart.length > 0 && (
            <span className="cart-count">
              {cart.length} item{cart.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {/* ── Empty State ── */}
        {cart.length === 0 && (
          <div className="cart-empty">
            <span className="empty-icon">🛍️</span>
            <p>Your cart is empty. Start adding some items!</p>
          </div>
        )}

        {/* ── Cart Items ── */}
        {cart.length > 0 && (
          <>
            <div className="cart-items">
              {cart.map((item, i) => (
                <div
                  key={getId(item)}
                  className="cart-item"
                  style={{ animationDelay: `${i * 0.07}s` }}
                >
                  <div className="item-img">
                    {item.image
                      ? <img src={item.image} alt={item.name} />
                      : <span className="item-img-fallback">🛍️</span>
                    }
                  </div>
                  <div className="item-info">
                    <h3>{item.name}</h3>
                    <p className="item-price-line">{fmt(item.price)} × {getQty(item)}</p>
                  </div>
                  <div className="item-right">
                    <span className="item-line-total">{fmt(item.price * getQty(item))}</span>
                    <div className="qty-controls">
                      <button onClick={() => decreaseQty(getId(item))}>−</button>
                      <span>{getQty(item)}</span>
                      <button onClick={() => increaseQty(getId(item))}>+</button>
                    </div>
                    <button className="remove-btn" onClick={() => removeFromCart(getId(item))}>
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* ✅ FIX 2: ref sirf coupon section pe */}
            <div ref={couponRef}>

              {/* ── Coupon Dropdown ── */}
              {showCouponList && (
                <div className="coupon-list-section">
                  <p className="coupon-section-label">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                      <line x1="7" y1="7" x2="7.01" y2="7"/>
                    </svg>
                    Available Coupons
                  </p>
                  <div className="coupon-cards">
                    {listLoading && (
                      <>
                        <div className="coupon-skeleton" />
                        <div className="coupon-skeleton" />
                        <div className="coupon-skeleton" />
                      </>
                    )}
                    {listError && <p className="coupon-fetch-error">⚠️ {listError}</p>}
                    {!listLoading && !listError && couponList.map((c) => {
                      const isApplied = appliedCoupon?.code === c.code;
                      return (
                        <div
                          key={c.code}
                          className={`coupon-card ${isApplied ? "applied" : ""}`}
                          onClick={() => handleApplyCoupon(c.code)}
                        >
                          <div className="coupon-card-icon">{c.icon}</div>
                          <div className="coupon-card-body">
                            <div className="coupon-card-code">{c.code}</div>
                            <div className="coupon-card-desc">{c.label}</div>
                            <div className="coupon-card-expiry">{c.expiry}</div>
                          </div>
                          <div className="coupon-card-right">
                            <span className={`coupon-badge ${c.type}`}>{c.badge}</span>
                            <span className={isApplied ? "coupon-applied-tag" : "coupon-apply-tag"}>
                              {isApplied ? "✓ Applied" : "Apply"}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* ── Coupon Input Box ── */}
              <div className="coupon-box">
                <p className="coupon-label">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
                    <line x1="7" y1="7" x2="7.01" y2="7"/>
                  </svg>
                  Apply Coupon
                </p>
                {appliedCoupon ? (
                  <div className="coupon-applied">
                    <span>
                      ✓ {appliedCoupon.code} —{" "}
                      {appliedCoupon.type === "free"
                        ? "Free delivery"
                        : appliedCoupon.isPercent
                          ? `${appliedCoupon.discount}% off`
                          : `₹${appliedCoupon.discount} off`}{" "}
                      applied!
                    </span>
                    <button className="coupon-remove-btn" onClick={handleRemoveCoupon}>
                      ✕ Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="coupon-row">
                      <input
                        className="coupon-input"
                        placeholder="Enter coupon code"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        onFocus={() => {
                          setShowCouponList(true);
                          fetchCouponList();
                        }}
                      />
                      <button
                        className="coupon-apply-btn"
                        onClick={handleApplyCouponFromInput}
                        disabled={validating}
                      >
                        {validating ? "Checking…" : "Apply"}
                      </button>
                    </div>
                    {couponMsg.text && (
                      <p className={`coupon-msg ${couponMsg.type}`}>{couponMsg.text}</p>
                    )}
                  </>
                )}
              </div>

            </div>{/* end couponRef */}

            {/* ── Free Delivery Progress ── */}
            <div className="delivery-progress">
              <div className="progress-header">
                <span className={`progress-title ${deliveryFee === 0 ? "done" : ""}`}>
                  {deliveryFee === 0 ? "🎉 Free delivery unlocked!" : "Almost there!"}
                </span>
                {deliveryFee > 0 && (
                  <span className="progress-sub">
                    Add {fmt(needed)} more for free delivery
                  </span>
                )}
              </div>
              <div className="progress-bar-bg">
                <div
                  className={`progress-bar-fill ${deliveryFee === 0 ? "done" : ""}`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* ── Price Summary ── */}
            <div className="price-box">
              <p className="price-box-title">Price Details</p>
              <div className="price-row">
                <span>Subtotal ({totalItems} item{totalItems !== 1 ? "s" : ""})</span>
                <span>{fmt(subtotal)}</span>
              </div>
              {(discountAmt > 0 || appliedCoupon?.type === "free") && (
                <div className="price-row">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span className="discount-value">
                    {appliedCoupon?.type === "free" ? "Free delivery" : `− ${fmt(discountAmt)}`}
                  </span>
                </div>
              )}
              <div className="price-row">
                <span>Delivery Fee</span>
                {deliveryFee === 0
                  ? <span className="free-badge">FREE</span>
                  : <span>{fmt(deliveryFee)}</span>
                }
              </div>
              <div className="price-divider" />
              <div className="total-row">
                <span className="total-label">Total</span>
                <span className="total-amount">{fmt(total)}</span>
              </div>
              {discountAmt > 0 && (
                <p className="savings-note">
                  🎉 You're saving {fmt(discountAmt)} on this order!
                </p>
              )}
            </div>

            {/* ── Checkout Button ── */}
            <button className="checkout-btn" onClick={() => navigate("/checkout")}>
              <span className="checkout-inner">
                <span>Proceed to Checkout</span>
                <span className="checkout-amount">{fmt(total)} →</span>
              </span>
            </button>
          </>
        )}

      </div>
    </div>
  );
}
