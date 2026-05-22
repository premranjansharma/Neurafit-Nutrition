import React, { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

// ✅ FIX 1: API_BASE — sab jagah consistent
const API_BASE = process.env.REACT_APP_BASE_URL;

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@500;600&family=DM+Sans:wght@300;400;500;600&display=swap');

  :root {
    --bg:         #0f0e0d;
    --surface:    #1a1916;
    --surface-2:  #232220;
    --border:     rgba(200,169,110,0.15);
    --gold:       #c8a96e;
    --gold-light: #e2c98e;
    --gold-dim:   rgba(200,169,110,0.12);
    --text-1:     #f0ebe2;
    --text-2:     #9e9688;
    --text-3:     #5e5a53;
    --green:      #5ecf8a;
    --red:        #e05c5c;
    --radius:     14px;
    --radius-sm:  8px;
    --shadow:     0 24px 60px rgba(0,0,0,0.55);
    --ff-display: 'Playfair Display', Georgia, serif;
    --ff-body:    'DM Sans', sans-serif;
    --tr:         0.22s cubic-bezier(0.4,0,0.2,1);
  }

  * { box-sizing: border-box; margin: 0; padding: 0; }

  .co-page {
    min-height: 100vh;
    background: var(--bg);
    background-image:
      radial-gradient(ellipse 60% 50% at 20% 10%, rgba(200,169,110,0.06) 0%, transparent 60%),
      radial-gradient(ellipse 40% 40% at 80% 90%, rgba(200,169,110,0.04) 0%, transparent 60%);
    font-family: var(--ff-body);
    display: flex;
    align-items: flex-start;
    justify-content: center;
    padding: 48px 20px 80px;
  }

  .co-wrapper {
    display: grid;
    grid-template-columns: 1fr 1.25fr;
    gap: 24px;
    width: 100%;
    max-width: 960px;
    animation: fadeUp 0.5s ease both;
  }

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .co-panel {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: var(--radius);
    padding: 36px 32px;
    box-shadow: var(--shadow);
  }

  .co-header { margin-bottom: 28px; }

  .co-tag {
    display: inline-block;
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--gold);
    background: var(--gold-dim);
    border: 1px solid rgba(200,169,110,0.25);
    padding: 3px 10px;
    border-radius: 30px;
    margin-bottom: 10px;
  }

  .co-title {
    font-family: var(--ff-display);
    font-size: 26px;
    font-weight: 500;
    color: var(--text-1);
    line-height: 1.25;
  }

  .cart-items { display: flex; flex-direction: column; gap: 2px; margin-bottom: 24px; }

  .cart-empty { text-align: center; padding: 32px 0; color: var(--text-3); }
  .cart-empty .ei { font-size: 36px; display: block; margin-bottom: 10px; }

  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 14px 0;
    border-bottom: 1px solid var(--border);
    gap: 12px;
  }
  .cart-item:last-child { border-bottom: none; }

  .ci-info { display: flex; flex-direction: column; gap: 3px; }
  .ci-name { font-size: 14px; font-weight: 500; color: var(--text-1); }
  .ci-qty  { font-size: 12px; color: var(--text-3); font-weight: 300; }
  .ci-price { font-size: 14px; font-weight: 600; color: var(--gold); white-space: nowrap; }

  .cost-box {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 18px 20px;
  }

  .cost-row {
    display: flex;
    justify-content: space-between;
    font-size: 13.5px;
    color: var(--text-2);
    padding: 5px 0;
  }

  .free-tag { color: var(--green); font-weight: 600; font-size: 12px; letter-spacing: 0.04em; }

  .free-badge {
    font-size: 11px;
    color: var(--green);
    background: rgba(94,207,138,0.08);
    border: 1px solid rgba(94,207,138,0.2);
    border-radius: 6px;
    padding: 5px 10px;
    margin: 6px 0;
    text-align: center;
  }

  .cost-divider { height: 1px; background: var(--border); margin: 10px 0 8px; }
  .cost-total   { font-size: 15px; font-weight: 600; color: var(--text-1); padding-top: 8px; }
  .total-amt    { color: var(--gold-light); font-family: var(--ff-display); font-size: 18px; }

  .form-section-label {
    font-size: 10px;
    font-weight: 600;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--gold);
    opacity: 0.7;
    margin: 20px 0 14px;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  .form-section-label::after { content: ''; flex: 1; height: 1px; background: var(--border); }

  .form-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 8px; }
  .form-grp  { display: flex; flex-direction: column; gap: 7px; }
  .form-grp.full { grid-column: 1 / -1; }

  .form-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-3);
  }

  .form-input {
    background: var(--surface-2);
    border: 1px solid var(--border);
    border-radius: var(--radius-sm);
    padding: 11px 14px;
    font-family: var(--ff-body);
    font-size: 14px;
    color: var(--text-1);
    outline: none;
    transition: border-color var(--tr), box-shadow var(--tr);
    resize: none;
    width: 100%;
  }
  .form-input::placeholder { color: var(--text-3); }
  .form-input:focus {
    border-color: rgba(200,169,110,0.55);
    box-shadow: 0 0 0 3px rgba(200,169,110,0.08);
  }
  .form-input.input-success { border-color: rgba(94,207,138,0.45); }
  .form-input.input-error   { border-color: rgba(224,92,92,0.5); }
  .form-textarea { min-height: 80px; line-height: 1.6; }

  .location-row { display: flex; align-items: center; gap: 10px; margin-bottom: 16px; }

  .detect-btn {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    background: var(--gold-dim);
    border: 1px solid rgba(200,169,110,0.3);
    border-radius: var(--radius-sm);
    padding: 9px 16px;
    font-family: var(--ff-body);
    font-size: 12px;
    font-weight: 600;
    color: var(--gold);
    cursor: pointer;
    transition: background var(--tr), border-color var(--tr), opacity var(--tr);
    white-space: nowrap;
    letter-spacing: 0.04em;
  }
  .detect-btn:hover:not(:disabled) { background: rgba(200,169,110,0.18); border-color: rgba(200,169,110,0.5); }
  .detect-btn:disabled { opacity: 0.55; cursor: not-allowed; }
  .detect-btn svg { width: 13px; height: 13px; flex-shrink: 0; }
  .detect-pulse { animation: pulse 1.2s ease-in-out infinite; }
  @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }

  .location-status      { font-size: 12px; font-weight: 400; flex: 1; }
  .location-status.success { color: var(--green); }
  .location-status.error   { color: var(--red); }

  .pin-hint     { font-size: 11px; margin-top: -4px; height: 16px; transition: opacity 0.2s; }
  .pin-hint.ok  { color: var(--green); }
  .pin-hint.err { color: var(--red); }

  .pay-label {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: var(--text-3);
    margin: 24px 0 12px;
  }

  .pay-options { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 28px; }

  .pay-option {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 14px 16px;
    background: var(--surface-2);
    border: 1.5px solid var(--border);
    border-radius: var(--radius-sm);
    cursor: pointer;
    transition: border-color var(--tr), background var(--tr), box-shadow var(--tr);
  }
  .pay-option.active {
    border-color: var(--gold);
    background: rgba(200,169,110,0.06);
    box-shadow: 0 0 0 3px rgba(200,169,110,0.07);
  }
  .pay-option:hover:not(.active) { border-color: rgba(200,169,110,0.35); background: rgba(200,169,110,0.03); }

  .pay-icon  { font-size: 22px; flex-shrink: 0; }
  .pay-title { display: block; font-size: 13px; font-weight: 600; color: var(--text-1); margin-bottom: 2px; }
  .pay-sub   { display: block; font-size: 11px; color: var(--text-3); font-weight: 300; }

  .pay-btn {
    width: 100%;
    padding: 16px 24px;
    background: linear-gradient(135deg, #c8a96e 0%, #a8813e 100%);
    border: none;
    border-radius: var(--radius-sm);
    font-family: var(--ff-body);
    font-size: 15px;
    font-weight: 600;
    color: #0f0e0d;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    transition: opacity var(--tr), transform var(--tr), box-shadow var(--tr);
    box-shadow: 0 6px 24px rgba(200,169,110,0.25);
    letter-spacing: 0.02em;
    margin-bottom: 14px;
  }
  .pay-btn:hover:not(:disabled) { opacity: 0.92; transform: translateY(-1px); box-shadow: 0 10px 32px rgba(200,169,110,0.35); }
  .pay-btn:active:not(:disabled) { transform: translateY(0); }
  .pay-btn:disabled { opacity: 0.7; cursor: not-allowed; justify-content: center; }

  .btn-amt { background: rgba(0,0,0,0.18); padding: 3px 10px; border-radius: 20px; font-size: 13px; }

  .spinner {
    display: inline-block;
    width: 20px; height: 20px;
    border: 2px solid rgba(0,0,0,0.3);
    border-top-color: #0f0e0d;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  .secure-note { text-align: center; font-size: 11.5px; color: var(--text-3); letter-spacing: 0.03em; }

  @media (max-width: 720px) {
    .co-wrapper  { grid-template-columns: 1fr; }
    .co-page     { padding: 24px 16px 60px; }
    .co-panel    { padding: 28px 22px; }
    .form-grid   { grid-template-columns: 1fr; }
    .pay-options { grid-template-columns: 1fr; }
  }
`;

const fetchPincodeData = async (pin) => {
  try {
    const res  = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
    const data = await res.json();
    if (data[0]?.Status === "Success") {
      const po = data[0].PostOffice[0];
      return { city: po.District, state: po.State, success: true };
    }
    return { success: false };
  } catch { return { success: false }; }
};

const reverseGeocode = async (lat, lng) => {
  try {
    const res  = await fetch(
      `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
      { headers: { "Accept-Language": "en" } }
    );
    const data = await res.json();
    const addr = data.address || {};
    return {
      pincode : addr.postcode || "",
      city    : addr.city || addr.town || addr.county || addr.district || "",
      state   : addr.state || "",
      street  : [addr.road, addr.suburb, addr.neighbourhood].filter(Boolean).join(", "),
      success : true,
    };
  } catch { return { success: false }; }
};

const loadRazorpayScript = () =>
  new Promise((resolve) => {
    if (window.Razorpay) return resolve(true);
    const script   = document.createElement("script");
    script.src     = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload  = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });

//  token header
const authHeader = () => {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export default function Checkout() {
  const { cart, clearCart } = useContext(CartContext);
  const navigate = useNavigate(); // ✅ FIX 3

  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [loading, setLoading]             = useState(false);
  const [locStatus, setLocStatus]         = useState({ msg: "", type: "" });
  const [detecting, setDetecting]         = useState(false);
  const [pinHint, setPinHint]             = useState({ msg: "", type: "" });

  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    pincode: "", city: "", state: "", address: "",
  });

  const set = (field) => (e) => {
    const val = e.target.value;
    setForm((prev) => ({ ...prev, [field]: val }));
    if (field === "pincode" && val.replace(/\D/g, "").length === 6) {
      fetchPincodeData(val.replace(/\D/g, "")).then((res) => {
        if (res.success) {
          setForm((prev) => ({ ...prev, city: res.city, state: res.state }));
          setPinHint({ msg: `✓ ${res.city}, ${res.state}`, type: "ok" });
        } else {
          setPinHint({ msg: "Invalid pincode", type: "err" });
        }
      });
    } else if (field === "pincode") {
      setPinHint({ msg: "", type: "" });
    }
  };

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      setLocStatus({ msg: "Geolocation not supported by your browser", type: "error" });
      return;
    }
    setDetecting(true);
    setLocStatus({ msg: "Detecting your location…", type: "" });
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        const res = await reverseGeocode(latitude, longitude);
        setDetecting(false);
        if (res.success) {
          setForm((prev) => ({
            ...prev,
            pincode : res.pincode || prev.pincode,
            city    : res.city    || prev.city,
            state   : res.state   || prev.state,
            address : res.street  ? res.street + (prev.address ? ", " + prev.address : "") : prev.address,
          }));
          if (res.pincode) setPinHint({ msg: `✓ ${res.city}, ${res.state}`, type: "ok" });
          setLocStatus({ msg: `✓ Location detected — ${res.city}, ${res.state}`, type: "success" });
        } else {
          setLocStatus({ msg: "Could not fetch address. Please fill manually.", type: "error" });
        }
      },
      (err) => {
        setDetecting(false);
        const msgs = { 1: "Location permission denied.", 2: "Location unavailable.", 3: "Request timed out." };
        setLocStatus({ msg: msgs[err.code] || "Location error", type: "error" });
      },
      { timeout: 10000, enableHighAccuracy: true }
    );
  };

  const getId    = (item) => item?.product?._id || item?.product || item?._id || item?.id;
  const getQty   = (item) => item?.quantity ?? item?.qty ?? 1;
  const getPrice = (item) => item?.price ?? item?.product?.price ?? 0;
  const getName  = (item) => item?.name || item?.product?.name || "";

  const subtotal = cart.reduce((sum, item) => sum + getPrice(item) * getQty(item), 0);
  const delivery = subtotal > 599 ? 0 : 50;
  const total    = subtotal + delivery;

  const getOrderData = () => {
    let userId = null;
    try { userId = JSON.parse(localStorage.getItem("user"))?._id; } catch {}
    return {
      items       : cart.map((item) => ({ product: getId(item), quantity: getQty(item), price: getPrice(item) })),
      totalAmount : total,
      userId,
      guestInfo   : { ...form },
    };
  };

  //  Phone validation helper
  const validateForm = () => {
    if (!form.name.trim())    { alert("Name required");           return false; }
    if (!form.phone.trim())   { alert("Phone number required");   return false; }
    if (!/^[6-9]\d{9}$/.test(form.phone.replace(/\s+/g, ""))) {
      alert("Valid 10-digit Indian mobile number enter karo");   return false;
    }
    if (!form.pincode.trim()) { alert("Pincode required");        return false; }
    if (!form.address.trim()) { alert("Address required");        return false; }
    return true;
  };

  // ── COD ──
  const handleCOD = async () => {
  setLoading(true);

  try {
    const res = await fetch(`${API_BASE}/api/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeader(),
      },
      body: JSON.stringify({
        ...getOrderData(),
        paymentMethod: "COD",
        status: "pending",
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message || "Order failed");
      return;
    }

    clearCart();

navigate(`/order-success/${data.orderId}`, {
  state: {
    order: {
      orderId: data.orderId,
      customerName: form.name,
      customerEmail: form.email,
      paymentStatus: "Pending",
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000
      ).toISOString(),
      subtotal,
      shipping: delivery,
      total,
      currency: "INR",
    },
  },
});

  } catch (err) {
    console.error(err);
    alert("Server error");
  } finally {
    setLoading(false);
  }
};

  // ── Razorpay ──
 const handleRazorpay = async () => {
  setLoading(true);
  const loaded = await loadRazorpayScript();
  if (!loaded) { alert("Razorpay load nahi hua. Internet check karo."); setLoading(false); return; }

  try {
    // STEP 1 — Order create
    const createRes = await fetch(`${API_BASE}/api/payment/razorpay/create`, {
      method  : "POST",
      headers : { "Content-Type": "application/json", ...authHeader() },
      body    : JSON.stringify({ amount: total, currency: "INR" }),
    });
    if (!createRes.ok) {
      const e = await createRes.json();
      alert(e.message || "Order create nahi hua.");
      setLoading(false); return;
    }
    const { paymentDbId, razorpayOrderId, amount: amountPaise, currency, keyId } = await createRes.json();

    // STEP 2 — Razorpay popup
    const opts = {
      key         : keyId,
      amount      : amountPaise,
      currency,
      name        : "Neurafit Nutrition",
      description : "Order Payment",
      order_id    : razorpayOrderId,

      handler: async (response) => {
        try {
          // STEP 3 — Verify
          const verRes = await fetch(`${API_BASE}/api/payment/razorpay/verify`, {
            method  : "POST",
            headers : { "Content-Type": "application/json", ...authHeader() },
            body    : JSON.stringify({
              paymentDbId,
              razorpayOrderId  : response.razorpay_order_id,
              razorpayPaymentId: response.razorpay_payment_id,
              razorpaySignature: response.razorpay_signature,
            }),
          });
          const verData = await verRes.json();
          if (!verData.success) { alert(verData.message || "Verify fail."); setLoading(false); return; }

          // STEP 4 — Save order
          const ordRes = await fetch(`${API_BASE}/api/orders`, {
            method  : "POST",
            headers : { "Content-Type": "application/json", ...authHeader() },
            body    : JSON.stringify({
              ...getOrderData(),
              paymentMethod     : "Razorpay",
              status            : "paid",
              paymentId         : paymentDbId,
              razorpayPaymentId : response.razorpay_payment_id,
            }),
          });
          const ordData = await ordRes.json();
          if (!ordRes.ok) { alert(ordData.message || "Order save nahi hua."); setLoading(false); return; }

          clearCart();
          navigate(`/order-success/${ordData.orderId}`, {
  state: {
    order: {
      orderId: ordData.orderId,
      customerName: form.name,
      customerEmail: form.email,
      paymentStatus: "Paid",
      orderDate: new Date().toISOString(),
      estimatedDelivery: new Date(
        Date.now() + 5 * 24 * 60 * 60 * 1000
      ).toISOString(),
      subtotal,
      shipping: delivery,
      total,
      currency: "INR",
    },
  },
});

        } catch (err) {        // ← closes handler's try
          console.error(err);
          alert("Payment verification error");
          setLoading(false);
        }
      },                       // ← closes handler function

      prefill : { name: form.name, email: form.email, contact: form.phone },
      theme   : { color: "#c8a96e" },
      modal   : { ondismiss: () => setLoading(false) },
    };                         // ← closes opts object

    new window.Razorpay(opts).open();

  } catch (err) {              // ← closes outer try
    console.error(err);
    alert("Payment error");
    setLoading(false);
  }
};

  const handlePayment = () => {
    if (cart.length === 0)  { alert("Cart empty!"); return; }
    if (!validateForm())     return; //  proper validation
    paymentMethod === "COD" ? handleCOD() : handleRazorpay();
  };

  return (
    <>
      <style>{styles}</style>
      <div className="co-page">
        <div className="co-wrapper">

          {/* ── LEFT: Cart Summary ── */}
          <div className="co-panel">
            <div className="co-header">
              <span className="co-tag">Review</span>
              <h2 className="co-title">Your Order</h2>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <span className="ei">🛍️</span>
                  <p>Your cart is empty</p>
                </div>
              ) : cart.map((item, i) => (
                <div className="cart-item" key={getId(item) || i}>
                  <div className="ci-info">
                    <span className="ci-name">{getName(item)}</span>
                    <span className="ci-qty">Qty: {getQty(item)}</span>
                  </div>
                  <span className="ci-price">₹{(getPrice(item) * getQty(item)).toLocaleString()}</span>
                </div>
              ))}
            </div>

            <div className="cost-box">
              <div className="cost-row">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="cost-row">
                <span>Delivery</span>
                <span className={delivery === 0 ? "free-tag" : ""}>
                  {delivery === 0 ? "FREE" : `₹${delivery}`}
                </span>
              </div>
              {delivery === 0 && <div className="free-badge">🎉 Free delivery applied!</div>}
              <div className="cost-divider" />
              <div className="cost-row cost-total">
                <span>Total</span>
                <span className="total-amt">₹{total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* ── RIGHT: Form + Payment ── */}
          <div className="co-panel">
            <div className="co-header">
              <span className="co-tag">Details</span>
              <h2 className="co-title">Delivery Info</h2>
            </div>

            <div className="form-grid">
              <div className="form-grp">
                <label className="form-label">Full Name *</label>
                <input className="form-input" placeholder="Prem Sharma" value={form.name} onChange={set("name")} />
              </div>
              <div className="form-grp">
                <label className="form-label">Email</label>
                <input className="form-input" type="email" placeholder="prem@email.com" value={form.email} onChange={set("email")} />
              </div>
              <div className="form-grp">
  <label className="form-label">Phone *</label>

  <input
    className="form-input"
    type="tel"
    placeholder="7739740853"
    maxLength={10}
    value={form.phone}
    onChange={(e) => {
      const onlyNums = e.target.value.replace(/\D/g, "");
      setForm((prev) => ({ ...prev, phone: onlyNums }));
    }}
  />
</div>
            </div>

            <div className="form-section-label">Shipping Address</div>

            <div className="form-grid" style={{ marginBottom: 8 }}>
              <div className="form-grp full">
                <label className="form-label">Street Address *</label>
                <textarea className="form-input form-textarea"
                  placeholder="House no., Building, Street, Area"
                  value={form.address} onChange={set("address")} />
              </div>
            </div>

            <div className="location-row">
              <button className="detect-btn" onClick={handleDetectLocation} disabled={detecting} type="button">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"
                  strokeLinecap="round" strokeLinejoin="round" className={detecting ? "detect-pulse" : ""}>
                  <circle cx="12" cy="12" r="3" />
                  <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
                  <circle cx="12" cy="12" r="8" strokeDasharray="4 2" />
                </svg>
                {detecting ? "Detecting…" : "Detect Your Location"}
              </button>
              {locStatus.msg && (
                <span className={`location-status ${locStatus.type}`}>{locStatus.msg}</span>
              )}
            </div>
<div className="form-grid" style={{ marginBottom: 8 }}>

    <div className="form-grp">
  <label className="form-label">Pincode *</label>

  <input
    className={`form-input ${
      pinHint.type === "ok"
        ? "input-success"
        : pinHint.type === "err"
        ? "input-error"
        : ""
    }`}
   placeholder="846004"
      maxLength={6}
      value={form.pincode}
      onChange={(e) => {
        const onlyNums = e.target.value.replace(/\D/g, "");
        setForm((prev) => ({
          ...prev,
          pincode: onlyNums,
        }));

        if (onlyNums.length === 6) {
          fetchPincodeData(onlyNums).then((res) => {
            if (res.success) {
              setForm((prev) => ({
                ...prev,
                city: res.city,
                state: res.state,
              }));

              setPinHint({
                msg: `✓ ${res.city}, ${res.state}`,
                type: "ok",
              });
            } else {
              setPinHint({
                msg: "Invalid pincode",
                type: "err",
              });
            }
          });
        } else {
          setPinHint({
            msg: "",
            type: "",
          });
        }
      }}
    />

  {pinHint.msg && (
    <span className={`pin-hint ${pinHint.type}`}>
      {pinHint.msg}
    </span>
  )}
</div>
              <div className="form-grp">
                <label className="form-label">City</label>
                <input className="form-input" placeholder="Darbhanga" value={form.city} onChange={set("city")} />
              </div>
              <div className="form-grp">
                <label className="form-label">State</label>
                <input className="form-input" placeholder="Bihar" value={form.state} onChange={set("state")} />
              </div>
            </div>

            <p className="pay-label">Payment Method</p>
            <div className="pay-options">
              <label className={`pay-option ${paymentMethod === "COD" ? "active" : ""}`}>
                <input type="radio" name="pay" style={{ display: "none" }}
                  checked={paymentMethod === "COD"} onChange={() => setPaymentMethod("COD")} />
                <span className="pay-icon">🚚</span>
                <div>
                  <span className="pay-title">Cash on Delivery</span>
                  <span className="pay-sub">Pay when delivered</span>
                </div>
              </label>
              <label className={`pay-option ${paymentMethod === "Razorpay" ? "active" : ""}`}>
                <input type="radio" name="pay" style={{ display: "none" }}
                  checked={paymentMethod === "Razorpay"} onChange={() => setPaymentMethod("Razorpay")} />
                <span className="pay-icon">⚡</span>
                <div>
                  <span className="pay-title">Pay Online</span>
                  <span className="pay-sub">UPI, Card, Net Banking</span>
                </div>
              </label>
            </div>

            <button className="pay-btn" onClick={handlePayment} disabled={loading}>
              {loading
                ? <span className="spinner" />
                : <>
                    <span>{paymentMethod === "COD" ? "Place Order" : "Pay Now"}</span>
                    <span className="btn-amt">₹{total.toLocaleString()}</span>
                  </>
              }
            </button>

            <p className="secure-note">🔒 Secured &amp; encrypted checkout</p>
          </div>

        </div>
      </div>
    </>
  );
}
