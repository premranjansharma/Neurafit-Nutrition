import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import logo from "../assets/logo-nav.png";
/* ─────────────────────────────────────────────
   Keyframe / global style injection
───────────────────────────────────────────── */
const injectStyles = () => {
  if (document.getElementById("order-success-styles")) return;
  const style = document.createElement("style");
  style.id = "order-success-styles";
  style.innerHTML = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500&display=swap');

    @keyframes os-fadeUp {
      from { opacity: 0; transform: translateY(28px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes os-scaleIn {
      0%   { opacity: 0; transform: scale(0.4) rotate(-10deg); }
      60%  { transform: scale(1.08) rotate(2deg); }
      100% { opacity: 1; transform: scale(1) rotate(0deg); }
    }
    @keyframes os-ripple {
      0%   { transform: scale(0.8); opacity: 0.6; }
      100% { transform: scale(2.4); opacity: 0; }
    }
    @keyframes os-scanline {
      0%   { background-position: 0 0; }
      100% { background-position: 0 100px; }
    }
    @keyframes os-pulse {
      0%, 100% { box-shadow: 0 0 0 0 rgba(0,255,136,0.35); }
      50%       { box-shadow: 0 0 0 14px rgba(0,255,136,0); }
    }
    @keyframes os-dash {
      to { stroke-dashoffset: 0; }
    }
    @keyframes os-numberCount {
      from { opacity: 0; transform: translateY(8px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes os-glowLine {
      0%,100% { opacity: 0.4; }
      50%      { opacity: 1; }
    }
    @keyframes os-floatDot {
      0%,100% { transform: translateY(0px); }
      50%      { transform: translateY(-10px); }
    }
    @keyframes os-bgShift {
      0%,100% { background-position: 0% 50%; }
      50%      { background-position: 100% 50%; }
    }

    .os-wrap * { box-sizing: border-box; margin: 0; padding: 0; }

    .os-wrap {
      font-family: 'DM Sans', sans-serif;
      background: #0b0f0c;
      min-height: 100vh;
      color: #e8f0eb;
      position: relative;
      overflow-x: hidden;
    }

    /* ── Noise overlay ── */
    .os-wrap::before {
      content: '';
      position: fixed;
      inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E");
      opacity: 0.035;
      pointer-events: none;
      z-index: 0;
    }

    /* ── Radial glow behind icon ── */
    .os-glow-bg {
      position: fixed;
      top: -120px;
      left: 50%;
      transform: translateX(-50%);
      width: 600px;
      height: 600px;
      background: radial-gradient(circle, rgba(0,255,136,0.09) 0%, transparent 65%);
      pointer-events: none;
      z-index: 0;
    }

    /* ── Grid lines ── */
    .os-grid-lines {
      position: fixed;
      inset: 0;
      background-image:
        linear-gradient(rgba(0,255,136,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(0,255,136,0.03) 1px, transparent 1px);
      background-size: 48px 48px;
      pointer-events: none;
      z-index: 0;
    }

    .os-content {
      position: relative;
      z-index: 1;
      max-width: 640px;
      margin: 0 auto;
      padding: 48px 20px 80px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }

    /* ── Brand bar ── */
    .os-brand {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: 18px;
      letter-spacing: 0.18em;
      color: #00ff88;
      text-transform: uppercase;
      margin-bottom: 52px;
      opacity: 0;
      animation: os-fadeUp 0.5s ease forwards;
      animation-delay: 0.05s;
    }

    /* ── Icon ring ── */
    .os-icon-ring {
      position: relative;
      width: 120px;
      height: 120px;
      margin-bottom: 32px;
      opacity: 0;
      animation: os-scaleIn 0.7s cubic-bezier(.34,1.56,.64,1) forwards;
      animation-delay: 0.2s;
    }
    .os-icon-ring-border {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid rgba(0,255,136,0.5);
      animation: os-pulse 2.4s ease infinite;
      animation-delay: 1s;
    }
    .os-icon-ring-border2 {
      position: absolute;
      inset: -12px;
      border-radius: 50%;
      border: 1px solid rgba(0,255,136,0.12);
    }
    .os-ripple {
      position: absolute;
      inset: 0;
      border-radius: 50%;
      border: 2px solid rgba(0,255,136,0.4);
      animation: os-ripple 2s ease-out infinite;
      animation-delay: 0.9s;
    }
    .os-icon-circle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: linear-gradient(135deg, #0d2b1e 0%, #0f3325 100%);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
      z-index: 1;
    }
    .os-check-svg {
      width: 52px;
      height: 52px;
    }
    .os-check-circle {
      fill: none;
      stroke: rgba(0,255,136,0.2);
      stroke-width: 2;
    }
    .os-check-path {
      fill: none;
      stroke: #00ff88;
      stroke-width: 3.5;
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-dasharray: 60;
      stroke-dashoffset: 60;
      animation: os-dash 0.6s ease forwards;
      animation-delay: 0.75s;
    }

    /* ── Headline block ── */
    .os-headline {
      text-align: center;
      margin-bottom: 10px;
      opacity: 0;
      animation: os-fadeUp 0.6s ease forwards;
      animation-delay: 0.45s;
    }
    .os-headline h1 {
      font-family: 'Syne', sans-serif;
      font-weight: 800;
      font-size: clamp(28px, 6vw, 40px);
      line-height: 1.1;
      letter-spacing: -0.02em;
      color: #ffffff;
    }
    .os-headline h1 span {
      color: #00ff88;
    }
    .os-subheadline {
      font-size: 15px;
      font-weight: 300;
      color: rgba(232,240,235,0.55);
      text-align: center;
      margin-bottom: 40px;
      max-width: 380px;
      line-height: 1.65;
      opacity: 0;
      animation: os-fadeUp 0.6s ease forwards;
      animation-delay: 0.55s;
    }

    /* ── Divider ── */
    .os-divider {
      width: 100%;
      height: 1px;
      background: linear-gradient(90deg, transparent, rgba(0,255,136,0.2), transparent);
      margin-bottom: 28px;
      opacity: 0;
      animation: os-fadeUp 0.5s ease forwards;
      animation-delay: 0.65s;
    }

    /* ── Order card ── */
    .os-card {
      width: 100%;
      background: linear-gradient(160deg, #121a15 0%, #0e1711 100%);
      border: 1px solid rgba(0,255,136,0.12);
      border-radius: 20px;
      padding: 32px;
      margin-bottom: 16px;
      position: relative;
      overflow: hidden;
      opacity: 0;
      animation: os-fadeUp 0.6s ease forwards;
    }
    .os-card::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0;
      height: 2px;
      background: linear-gradient(90deg, transparent, #00ff88, transparent);
      opacity: 0.6;
    }
    .os-card-1 { animation-delay: 0.72s; }
    .os-card-2 { animation-delay: 0.84s; }

    .os-card-label {
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.2em;
      text-transform: uppercase;
      color: rgba(0,255,136,0.6);
      margin-bottom: 18px;
      font-family: 'Syne', sans-serif;
    }

    .os-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 13px 0;
      border-bottom: 1px solid rgba(255,255,255,0.05);
    }
    .os-row:last-child { border-bottom: none; padding-bottom: 0; }
    .os-row:first-of-type { padding-top: 0; }

    .os-row-key {
      font-size: 13px;
      color: rgba(232,240,235,0.45);
      font-weight: 400;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .os-row-key svg {
      width: 14px;
      height: 14px;
      opacity: 0.5;
      flex-shrink: 0;
    }
    .os-row-val {
      font-size: 14px;
      font-weight: 500;
      color: #e8f0eb;
      font-family: 'Syne', sans-serif;
      text-align: right;
    }
    .os-row-val.mono {
      font-family: 'Courier New', monospace;
      font-size: 13px;
      color: #00ff88;
      letter-spacing: 0.05em;
      background: rgba(0,255,136,0.07);
      padding: 3px 10px;
      border-radius: 6px;
      border: 1px solid rgba(0,255,136,0.15);
    }

    /* Payment badge */
    .os-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-size: 12px;
      font-weight: 500;
      padding: 4px 12px;
      border-radius: 100px;
      font-family: 'Syne', sans-serif;
    }
    .os-badge.success {
      background: rgba(0,255,136,0.1);
      color: #00ff88;
      border: 1px solid rgba(0,255,136,0.25);
    }
    .os-badge.pending {
      background: rgba(255,200,50,0.1);
      color: #ffc832;
      border: 1px solid rgba(255,200,50,0.25);
    }
    .os-badge-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: currentColor;
    }

    /* Total row */
    .os-total-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-top: 20px;
      margin-top: 4px;
      border-top: 1px solid rgba(0,255,136,0.12);
    }
    .os-total-label {
      font-family: 'Syne', sans-serif;
      font-size: 13px;
      font-weight: 600;
      letter-spacing: 0.1em;
      text-transform: uppercase;
      color: rgba(232,240,235,0.5);
    }
    .os-total-amount {
      font-family: 'Syne', sans-serif;
      font-size: 26px;
      font-weight: 800;
      color: #00ff88;
      letter-spacing: -0.02em;
    }

    /* ── Floating dots decoration ── */
    .os-dots {
      display: flex;
      gap: 6px;
      margin: 28px 0 36px;
      opacity: 0;
      animation: os-fadeUp 0.5s ease forwards;
      animation-delay: 0.9s;
    }
    .os-dot {
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: rgba(0,255,136,0.3);
    }
    .os-dot:nth-child(2) { animation: os-floatDot 2s ease infinite 0.2s; background: rgba(0,255,136,0.5); }
    .os-dot:nth-child(3) { animation: os-floatDot 2s ease infinite 0.4s; background: rgba(0,255,136,0.7); }
    .os-dot:nth-child(4) { animation: os-floatDot 2s ease infinite 0.6s; background: rgba(0,255,136,0.5); }
    .os-dot:nth-child(5) { animation: os-floatDot 2s ease infinite 0.8s; }

    /* ── Buttons ── */
    .os-btn-group {
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 12px;
      opacity: 0;
      animation: os-fadeUp 0.6s ease forwards;
      animation-delay: 0.95s;
    }

    .os-btn {
      width: 100%;
      padding: 17px 28px;
      border-radius: 14px;
      font-family: 'Syne', sans-serif;
      font-size: 14px;
      font-weight: 700;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      cursor: pointer;
      border: none;
      transition: all 0.22s cubic-bezier(.4,0,.2,1);
      position: relative;
      overflow: hidden;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    .os-btn::after {
      content: '';
      position: absolute;
      inset: 0;
      background: rgba(255,255,255,0.06);
      opacity: 0;
      transition: opacity 0.2s;
    }
    .os-btn:hover::after { opacity: 1; }
    .os-btn:active { transform: scale(0.98); }

    .os-btn-primary {
      background: linear-gradient(135deg, #00ff88, #00cc6a);
      color: #0b0f0c;
      box-shadow: 0 4px 24px rgba(0,255,136,0.25), 0 0 0 0 rgba(0,255,136,0.2);
    }
    .os-btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(0,255,136,0.4), 0 0 0 4px rgba(0,255,136,0.08);
    }

    .os-btn-secondary {
      background: transparent;
      color: rgba(232,240,235,0.7);
      border: 1px solid rgba(255,255,255,0.1);
    }
    .os-btn-secondary:hover {
      border-color: rgba(0,255,136,0.3);
      color: #00ff88;
      transform: translateY(-2px);
      box-shadow: 0 4px 16px rgba(0,255,136,0.08);
    }

    .os-btn svg {
      width: 16px;
      height: 16px;
      transition: transform 0.2s;
      flex-shrink: 0;
    }
    .os-btn-primary:hover svg,
    .os-btn-secondary:hover svg {
      transform: translateX(3px);
    }

    /* ── Footer note ── */
    .os-footer-note {
      margin-top: 36px;
      font-size: 12px;
      color: rgba(232,240,235,0.25);
      text-align: center;
      line-height: 1.7;
      opacity: 0;
      animation: os-fadeUp 0.5s ease forwards;
      animation-delay: 1.1s;
    }
    .os-footer-note a {
      color: rgba(0,255,136,0.5);
      text-decoration: none;
      transition: color 0.2s;
    }
    .os-footer-note a:hover { color: #00ff88; }

    /* ── Fallback / Error state ── */
    .os-fallback {
      text-align: center;
      padding: 80px 24px;
    }
    .os-fallback-icon {
      font-size: 48px;
      margin-bottom: 20px;
    }
    .os-fallback h2 {
      font-family: 'Syne', sans-serif;
      font-size: 22px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 12px;
    }
    .os-fallback p {
      color: rgba(232,240,235,0.45);
      font-size: 14px;
      margin-bottom: 32px;
      max-width: 320px;
      margin-left: auto;
      margin-right: auto;
    }

    @media (max-width: 480px) {
      .os-content { padding: 32px 16px 60px; }
      .os-card { padding: 24px 20px; }
      .os-total-amount { font-size: 22px; }
    }
  `;
  document.head.appendChild(style);
};

/* ─────────────────────────────────────────────
   Helper – format currency
───────────────────────────────────────────── */
const formatCurrency = (amount, currency = "USD") => {
  if (amount == null) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(amount);
};

/* ─────────────────────────────────────────────
   Helper – format date
───────────────────────────────────────────── */
const formatDate = (dateStr) => {
  if (!dateStr) return "—";
  return new Date(dateStr).toLocaleDateString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

/* ─────────────────────────────────────────────
   Inline SVG icons
───────────────────────────────────────────── */
const IconHash = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2.5 5.5h11M2.5 10.5h11M6 2l-1.5 12M11.5 2L10 14" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IconCard = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1" y="3.5" width="14" height="9" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M1 6.5h14" stroke="currentColor" strokeWidth="1.3"/>
    <rect x="3" y="9" width="3" height="1.5" rx="0.5" fill="currentColor"/>
  </svg>
);
const IconTruck = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M1 3.5h9v7H1zM10 5.5h2.5L14 8v2.5h-4V5.5z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <circle cx="3.5" cy="11.5" r="1.2" stroke="currentColor" strokeWidth="1.3"/>
    <circle cx="11.5" cy="11.5" r="1.2" stroke="currentColor" strokeWidth="1.3"/>
  </svg>
);
const IconCalendar = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" stroke="currentColor" strokeWidth="1.3"/>
    <path d="M1.5 6.5h13M5 1.5v2M11 1.5v2" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);
const IconArrow = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);
const IconShop = () => (
  <svg viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M2 2h12l-1.5 6H3.5L2 2z" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <path d="M3.5 8l1 5h7l1-5" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round"/>
    <circle cx="6" cy="14.5" r="0.8" fill="currentColor"/>
    <circle cx="10" cy="14.5" r="0.8" fill="currentColor"/>
  </svg>
);

/* ─────────────────────────────────────────────
   Main Component
───────────────────────────────────────────── */
const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const order = location.state?.order;

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    injectStyles();
    setMounted(true);
  }, []);

  /* ── Fallback if no order data ── */
  if (!order) {
    return (
      <div className="os-wrap">
        <div className="os-glow-bg" />
        <div className="os-grid-lines" />
        <div className="os-content">
          <div className="os-fallback" style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.4s" }}>
            <div className="os-fallback-icon">📦</div>
            <h2>No Order Found</h2>
            <p>
              We couldn't find your order details. This page requires valid
              order information to display.
            </p>
            <button
              className="os-btn os-btn-primary"
              style={{ maxWidth: 280, margin: "0 auto" }}
              onClick={() => navigate("/shop")}
            >
              <IconShop />
              Back to Shop
            </button>
          </div>
        </div>
      </div>
    );
  }

  const paymentStatus =
    order.paymentStatus?.toLowerCase() === "paid" ||
    order.paymentStatus?.toLowerCase() === "success"
      ? "paid"
      : order.paymentStatus || "pending";

  const isPaid = paymentStatus === "paid";

  return (
    <div className="os-wrap">
      <div className="os-glow-bg" />
      <div className="os-grid-lines" />

      <div className="os-content">
        {/* Brand */}
      <div className="os-brand">
        <img
         src={logo}
         alt="Logo"
         style={{
          height: "60px",
         objectFit: "contain",
          }}
          />
          </div>

        {/* Animated success icon */}
        <div className="os-icon-ring">
          <div className="os-icon-ring-border2" />
          <div className="os-ripple" />
          <div className="os-icon-ring-border" />
          <div className="os-icon-circle">
            <svg className="os-check-svg" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle className="os-check-circle" cx="26" cy="26" r="23" />
              <path className="os-check-path" d="M15 26.5l8 8 14-16" />
            </svg>
          </div>
        </div>

        {/* Headline */}
        <div className="os-headline">
          <h1>Order <span>Confirmed!</span></h1>
        </div>
        <p className="os-subheadline">
          Thank you{order.customerName ? `, ${order.customerName}` : ""}! Your order
          has been placed successfully. We'll send you shipping updates shortly.
        </p>

        <div className="os-divider" />

        {/* ── Card 1 – Order details ── */}
        <div className="os-card os-card-1">
          <div className="os-card-label">Order Details</div>

          <div className="os-row">
            <span className="os-row-key">
              <IconHash />
              Order ID
            </span>
            <span className="os-row-val mono">
              {order.orderId || "—"}
            </span>
          </div>

          <div className="os-row">
            <span className="os-row-key">
              <IconCard />
              Payment
            </span>
            <span className="os-row-val">
              <span className={`os-badge ${isPaid ? "success" : "pending"}`}>
                <span className="os-badge-dot" />
                {isPaid ? "Paid" : (order.paymentStatus || "Pending")}
              </span>
            </span>
          </div>

          <div className="os-row">
            <span className="os-row-key">
              <IconCalendar />
              Order Date
            </span>
            <span className="os-row-val">
              {formatDate(order.orderDate || new Date().toISOString())}
            </span>
          </div>

          <div className="os-row">
            <span className="os-row-key">
              <IconTruck />
              Est. Delivery
            </span>
            <span className="os-row-val" style={{ color: "#00ff88" }}>
              {formatDate(order.estimatedDelivery)}
            </span>
          </div>
        </div>

        {/* ── Card 2 – Total ── */}
        <div className="os-card os-card-2">
          <div className="os-card-label">Payment Summary</div>

          {order.subtotal != null && (
            <div className="os-row">
              <span className="os-row-key">Subtotal</span>
              <span className="os-row-val">
                {formatCurrency(order.subtotal, order.currency)}
              </span>
            </div>
          )}
          {order.shipping != null && (
            <div className="os-row">
              <span className="os-row-key">Shipping</span>
              <span className="os-row-val">
                {order.shipping === 0
                  ? "Free"
                  : formatCurrency(order.shipping, order.currency)}
              </span>
            </div>
          )}
          {order.tax != null && (
            <div className="os-row">
              <span className="os-row-key">Tax</span>
              <span className="os-row-val">
                {formatCurrency(order.tax, order.currency)}
              </span>
            </div>
          )}

          <div className="os-total-row">
            <span className="os-total-label">Total Charged</span>
            <span className="os-total-amount">
              {formatCurrency(order.total ?? order.amount, order.currency)}
            </span>
          </div>
        </div>

        {/* Decorative dots */}
        <div className="os-dots">
          {[1, 2, 3, 4, 5].map((i) => (
            <div className="os-dot" key={i} />
          ))}
        </div>

        {/* CTA Buttons */}
        <div className="os-btn-group">
          <button
            className="os-btn os-btn-primary"
            onClick={() => navigate("/track-order", { state: { orderId: order.orderId } })}
          >
            <IconTruck />
            Track Order
            <IconArrow />
          </button>

          <button
            className="os-btn os-btn-secondary"
            onClick={() => navigate("/shop")}
          >
            <IconShop />
            Continue Shopping
          </button>
        </div>

        {/* Footer note */}
        <p className="os-footer-note">
          A confirmation email has been sent to{" "}
          {order.customerEmail ? (
            <a href={`mailto:${order.customerEmail}`}>{order.customerEmail}</a>
          ) : (
            "your registered email"
          )}
          .<br />
          Need help?{" "}
          <a href="/support">Contact Support</a>
        </p>
      </div>
    </div>
  );
};

export default OrderSuccess;
