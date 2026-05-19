import React, { useEffect, useState, useContext, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const API_BASE = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/* ── inject styles once ─────────────────────────────────────── */
const CSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=Syne:wght@600;700;800&display=swap');

  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }
  @keyframes shimmer {
    0%   { background-position: -200% 0; }
    100% { background-position:  200% 0; }
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50%       { opacity: 0.5; }
  }
  @keyframes popIn {
    0%  { transform: scale(0.88); opacity: 0; }
    65% { transform: scale(1.06); }
    100%{ transform: scale(1);    opacity: 1; }
  }

  .pd-root * { box-sizing: border-box; margin: 0; padding: 0; }
  .pd-root { font-family: 'DM Sans', sans-serif; background: #080c09; color: #e8e8e2; min-height: 100vh; }

  /* back btn */
  .pd-back {
    display: inline-flex; align-items: center; gap: 8px;
    padding: 9px 18px; border-radius: 100px;
    background: transparent; border: 1px solid #2a2a2a;
    color: #888; font-size: 13px; font-weight: 500;
    cursor: pointer; transition: border-color .2s, color .2s, background .2s;
    outline: none; font-family: 'DM Sans', sans-serif;
  }
  .pd-back:hover { border-color: #00ff88; color: #00ff88; background: rgba(0,255,136,.06); }

  /* main image */
  .pd-main-img-wrap {
    position: relative; border-radius: 0; overflow: hidden;
    background: #0f130f; aspect-ratio: 1/1;
  }
  .pd-main-img-wrap img {
    width: 100%; height: 100%; object-fit: cover;
    transition: transform .6s cubic-bezier(.25,.46,.45,.94), opacity .3s ease;
    display: block;
  }
  .pd-main-img-wrap:hover img { transform: scale(1.04); }

  /* thumbnails */
  .pd-thumb {
    width: 72px; height: 72px; object-fit: cover;
    border-radius: 0; cursor: pointer;
    border: 2px solid transparent;
    transition: border-color .2s, transform .2s;
    flex-shrink: 0; background: #111;
  }
  .pd-thumb:hover { transform: scale(1.06); }
  .pd-thumb.active { border-color: #00ff88; }

  /* qty */
  .pd-qty-btn {
    width: 34px; height: 34px; border-radius: 50%;
    background: #1a1a1a; border: 1px solid #2e2e2e;
    color: #e8e8e2; font-size: 18px; line-height: 1;
    cursor: pointer; display: flex; align-items: center; justify-content: center;
    transition: background .2s, border-color .2s; outline: none;
    font-family: 'DM Sans', sans-serif;
  }
  .pd-qty-btn:hover { background: #252525; border-color: #00ff88; color: #00ff88; }

  /* add to cart btn */
  .pd-btn-cart {
    flex: 1; padding: 15px 20px;
    background: #00ff88; color: #080c09;
    border: none; border-radius: 100px;
    font-size: 15px; font-weight: 700;
    cursor: pointer; outline: none;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: background .2s, transform .15s, box-shadow .2s;
    font-family: 'DM Sans', sans-serif; white-space: nowrap;
  }
  .pd-btn-cart:hover { background: #00e87a; box-shadow: 0 0 28px rgba(0,255,136,.25); transform: translateY(-1px); }
  .pd-btn-cart:active { transform: scale(0.97); }
  .pd-btn-cart.added { background: #059652; }

  /* buy now */
  .pd-btn-buy {
    flex: 1; padding: 15px 20px;
    background: transparent; color: #e8e8e2;
    border: 1.5px solid #2e2e2e; border-radius: 100px;
    font-size: 15px; font-weight: 700;
    cursor: pointer; outline: none;
    display: flex; align-items: center; justify-content: center; gap: 8px;
    transition: border-color .2s, color .2s, background .2s, transform .15s;
    font-family: 'DM Sans', sans-serif; white-space: nowrap;
  }
  .pd-btn-buy:hover { border-color: #00ff88; color: #00ff88; background: rgba(0,255,136,.06); transform: translateY(-1px); }
  .pd-btn-buy:active { transform: scale(0.97); }

  /* share */
  .pd-btn-share {
    width: 50px; height: 50px; border-radius: 50%;
    background: #111; border: 1.5px solid #2e2e2e;
    color: #888; cursor: pointer; outline: none;
    display: flex; align-items: center; justify-content: center;
    transition: border-color .2s, color .2s; flex-shrink: 0;
  }
  .pd-btn-share:hover { border-color: #555; color: #e8e8e2; }

  /* benefit chip */
  .pd-chip {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 6px 13px; border-radius: 100px;
    background: rgba(0,255,136,.07); border: 1px solid rgba(0,255,136,.18);
    color: #00ff88; font-size: 12px; font-weight: 600; letter-spacing: .3px;
  }

  /* info card */
  .pd-info-card {
    background: #0f130f; border: 1px solid #1e231e;
    border-radius: 0; padding: 20px;
    transition: border-color .25s, background .25s;
  }
  .pd-info-card:hover { border-color: #2e352e; background: #12171200; }

  /* trust item */
  .pd-trust {
    background: #0e120e; border: 1px solid #1a1e1a;
    border-radius: 0; padding: 22px;
    display: flex; align-items: flex-start; gap: 14px;
    transition: border-color .25s;
  }
  .pd-trust:hover { border-color: rgba(0,255,136,.2); }

  /* related card */
  .pd-rel-card {
    background: #0f130f; border: 1px solid #1e231e;
    border-radius: 0; overflow: hidden; cursor: pointer;
    transition: border-color .3s, transform .3s cubic-bezier(.34,1.56,.64,1);
  }
  .pd-rel-card:hover { border-color: rgba(0,255,136,.3); transform: translateY(-5px); }
  .pd-rel-card img { width: 100%; height: 200px; object-fit: cover; display: block; transition: transform .55s ease; }
  .pd-rel-card:hover img { transform: scale(1.07); }

  /* shimmer skeleton */
  .pd-skeleton {
    background: linear-gradient(90deg,#111 25%,#181818 50%,#111 75%);
    background-size: 200% 100%; animation: shimmer 1.6s infinite;
    border-radius: 0;
  }

  /* section fade-up */
  .pd-fade { animation: fadeUp .5s ease both; }
  .pd-fade-1 { animation: fadeUp .5s .08s ease both; }
  .pd-fade-2 { animation: fadeUp .5s .16s ease both; }
  .pd-fade-3 { animation: fadeUp .5s .24s ease both; }

  /* tab */
  .pd-tab {
    padding: 8px 18px; border-radius: 100px;
    background: transparent; border: 1px solid #2a2a2a;
    color: #666; font-size: 13px; font-weight: 600;
    cursor: pointer; outline: none; transition: all .2s;
    font-family: 'DM Sans', sans-serif;
  }
  .pd-tab.on { background: rgba(0,255,136,.1); border-color: rgba(0,255,136,.4); color: #00ff88; }
  .pd-tab:hover:not(.on) { border-color: #3a3a3a; color: #aaa; }

  .pd-divider { border: none; border-top: 1px solid #1a1e1a; margin: 0; }
`;

if (typeof document !== "undefined" && !document.getElementById("pd-style")) {
  const el = document.createElement("style");
  el.id = "pd-style";
  el.textContent = CSS;
  document.head.appendChild(el);
}

/* ── helpers ─────────────────────────────────────────────────── */
const BENEFITS = [
  "Boost Energy & Performance",
  "Improves Strength & Recovery",
  "Premium Quality Ingredients",
  "No Harmful Preservatives",
  "Scientifically Formulated",
];

const TRUST_ITEMS = [
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14M12 5l7 7-7 7"/>
      </svg>
    ),
    title: "Free Premium Delivery",
    desc: "On orders above ₹599",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
      </svg>
    ),
    title: "7-Day Easy Returns",
    desc: "No questions asked",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
      </svg>
    ),
    title: "Cash on Delivery",
    desc: "Available on all orders",
  },
  {
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00ff88" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
      </svg>
    ),
    title: "100% Authentic",
    desc: "Quality guaranteed",
  },
];

/* ── Loading skeleton ─────────────────────────────────────────── */
function LoadingSkeleton() {
  return (
    <div className="pd-root" style={{ padding: "40px 5vw" }}>
      <div className="pd-skeleton" style={{ width: 90, height: 36, marginBottom: 36 }} />
      <div style={{ display: "flex", gap: 50, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <div className="pd-skeleton" style={{ aspectRatio: "1/1", width: "100%" }} />
        </div>
        <div style={{ flex: 1, minWidth: 300, display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="pd-skeleton" style={{ height: 16, width: "40%" }} />
          <div className="pd-skeleton" style={{ height: 48, width: "80%" }} />
          <div className="pd-skeleton" style={{ height: 40, width: "35%" }} />
          <div className="pd-skeleton" style={{ height: 80, width: "100%" }} />
          <div className="pd-skeleton" style={{ height: 52, width: "100%" }} />
        </div>
      </div>
    </div>
  );
}

/* ── main component ───────────────────────────────────────────── */
export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [qty, setQty] = useState(1);
  const [cartState, setCartState] = useState("idle"); // idle | added
  const [activeTab, setActiveTab] = useState("desc");

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/products/${id}`)
      .then((r) => { if (!r.ok) throw new Error(); return r.json(); })
      .then((d) => { setProduct(d.product || d); setLoading(false); })
      .catch(() => { setProduct(null); setLoading(false); });
  }, [id]);

  useEffect(() => {
    fetch(`${API_BASE}/api/products`)
      .then((r) => r.json())
      .then((d) => {
        const list = Array.isArray(d) ? d : d.products || [];
        setRelatedProducts(list.filter((p) => p._id !== id).slice(0, 4));
      })
      .catch(() => {});
  }, [id]);

  const handleAddToCart = useCallback(() => {
    if (!product || cartState === "added") return;
    for (let i = 0; i < qty; i++) addToCart(product);
    setCartState("added");
    setTimeout(() => setCartState("idle"), 2000);
  }, [product, qty, addToCart, cartState]);

  const handleBuyNow = useCallback(() => {
    if (!product) return;
    for (let i = 0; i < qty; i++) addToCart(product);
    navigate("/checkout");
  }, [product, qty, addToCart, navigate]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: product.name, text: product.desc, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("Product link copied!");
    }
  };

  if (loading) return <LoadingSkeleton />;

  if (!product) {
    return (
      <div className="pd-root" style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh" }}>
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: 48, marginBottom: 16 }}>🔍</p>
          <h2 style={{ color: "#e8e8e2", marginBottom: 8 }}>Product Not Found</h2>
          <p style={{ color: "#666", marginBottom: 24 }}>The product you're looking for doesn't exist.</p>
          <button className="pd-back" onClick={() => navigate(-1)}>← Go Back</button>
        </div>
      </div>
    );
  }

  const images = product.images?.length > 0
    ? product.images.map((img) => img.startsWith("http") ? img : `${API_BASE}${img}`)
    : ["/placeholder.png"];

  const inStock = product.stock > 0;

  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  return (
    <div className="pd-root">
      <div style={{ padding: "32px 5vw 0" }}>
        {/* ── Back ─────────────────────────────────── */}
        <button className="pd-back pd-fade" onClick={() => navigate(-1)}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"/>
          </svg>
          Back
        </button>

        {/* ── Main grid ────────────────────────────── */}
        <div style={{ display: "flex", gap: "clamp(30px,5vw,70px)", flexWrap: "wrap", alignItems: "flex-start", marginTop: 32 }}>

          {/* LEFT — gallery */}
          <div style={{ flex: "1 1 340px", maxWidth: 560 }} className="pd-fade-1">
            <div className="pd-main-img-wrap">
              <img src={images[activeImage]} alt={product.name} />
              {/* image counter pill */}
              {images.length > 1 && (
                <span style={{
                  position: "absolute", bottom: 14, right: 14,
                  background: "rgba(0,0,0,.55)", color: "#e8e8e2",
                  fontSize: 11, fontWeight: 600, padding: "4px 10px",
                  borderRadius: 100, backdropFilter: "blur(6px)",
                }}>
                  {activeImage + 1} / {images.length}
                </span>
              )}
            </div>

            {images.length > 1 && (
              <div style={{ display: "flex", gap: 10, marginTop: 12, flexWrap: "wrap" }}>
                {images.map((img, i) => (
                  <img
                    key={i}
                    src={img}
                    alt="thumb"
                    className={`pd-thumb${activeImage === i ? " active" : ""}`}
                    onClick={() => setActiveImage(i)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* RIGHT — info */}
          <div style={{ flex: "1 1 340px" }} className="pd-fade-2">

            {/* category */}
            <p style={{ color: "#00ff88", fontSize: 12, fontWeight: 700, letterSpacing: "1.5px", textTransform: "uppercase", marginBottom: 10 }}>
              {product.category || "Neurafit Nutrition"}
            </p>

            {/* name */}
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(28px,4vw,44px)", fontWeight: 800, lineHeight: 1.1, letterSpacing: "-0.5px", color: "#f0f0ea", marginBottom: 20 }}>
              {product.name}
            </h1>

            <hr className="pd-divider" style={{ marginBottom: 20 }} />

            {/* price row */}
            <div style={{ display: "flex", alignItems: "baseline", gap: 14, marginBottom: 10 }}>
              <span style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(32px,4vw,42px)", fontWeight: 800, color: "#00ff88", letterSpacing: "-1px" }}>
                ₹{(product.price * qty).toLocaleString("en-IN")}
              </span>
              {product.originalPrice && (
                <span style={{ textDecoration: "line-through", color: "#555", fontSize: 18 }}>
                  ₹{(product.originalPrice * qty).toLocaleString("en-IN")}
                </span>
              )}
              {discount && (
                <span style={{ background: "rgba(0,255,136,.12)", color: "#00ff88", fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 100, border: "1px solid rgba(0,255,136,.25)" }}>
                  {discount}% OFF
                </span>
              )}
            </div>

            {/* weight + stock */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, flexWrap: "wrap" }}>
              {product.weight && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#141914", border: "1px solid #2a2a2a", color: "#999", fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 100 }}>
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 0 0-1.9 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.9-2.54L19.4 9.46A2 2 0 0 0 17.48 8Z"/>
                  </svg>
                  {product.weight}{product.unit || "g"}
                </span>
              )}
              <span style={{
                display: "inline-flex", alignItems: "center", gap: 5,
                fontSize: 12, fontWeight: 600, padding: "4px 12px", borderRadius: 100,
                background: inStock ? "rgba(0,255,136,.08)" : "rgba(255,50,50,.08)",
                border: `1px solid ${inStock ? "rgba(0,255,136,.25)" : "rgba(255,50,50,.25)"}`,
                color: inStock ? "#00ff88" : "#ff6060",
              }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "currentColor", display: "inline-block" }} />
                {inStock ? `In Stock · ${product.stock} left` : "Out of Stock"}
              </span>
            </div>

            {/* qty */}
            <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
              <span style={{ color: "#666", fontSize: 13, fontWeight: 500 }}>Quantity</span>
              <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#0f130f", border: "1px solid #2a2a2a", borderRadius: 100, padding: "4px 6px" }}>
                <button className="pd-qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
                <span style={{ minWidth: 24, textAlign: "center", fontSize: 15, fontWeight: 600 }}>{qty}</span>
                <button className="pd-qty-btn" onClick={() => setQty((q) => Math.min(product.stock || 99, q + 1))}>+</button>
              </div>
            </div>

            {/* action buttons */}
            <div style={{ display: "flex", gap: 12, marginBottom: 28, flexWrap: "wrap" }}>
              <button
                className={`pd-btn-cart${cartState === "added" ? " added" : ""}`}
                onClick={handleAddToCart}
                disabled={!inStock}
                style={!inStock ? { opacity: .4, cursor: "not-allowed" } : {}}
              >
                {cartState === "added" ? (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Added!
                  </>
                ) : (
                  <>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    Add to Cart
                  </>
                )}
              </button>

              <button
                className="pd-btn-buy"
                onClick={handleBuyNow}
                disabled={!inStock}
                style={!inStock ? { opacity: .4, cursor: "not-allowed" } : {}}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/>
                  <line x1="3" x2="21" y1="6" y2="6"/>
                  <path d="M16 10a4 4 0 0 1-8 0"/>
                </svg>
                Buy Now
              </button>

              <button className="pd-btn-share" onClick={handleShare} title="Share">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
                  <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
                  <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
                </svg>
              </button>
            </div>

            <hr className="pd-divider" style={{ marginBottom: 24 }} />

            {/* tabs */}
            <div style={{ display: "flex", gap: 8, marginBottom: 20, flexWrap: "wrap" }}>
              {["desc", "benefits", "info"].map((t) => (
                <button key={t} className={`pd-tab${activeTab === t ? " on" : ""}`} onClick={() => setActiveTab(t)}>
                  {{ desc: "Description", benefits: "Key Benefits", info: "Extra Info" }[t]}
                </button>
              ))}
            </div>

            {/* tab content */}
            {activeTab === "desc" && (
              <p style={{ color: "#aaa", lineHeight: 1.9, fontSize: 15 }}>
                {product.desc || "No description available."}
              </p>
            )}
            {activeTab === "benefits" && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {BENEFITS.map((b) => (
                  <span key={b} className="pd-chip">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    {b}
                  </span>
                ))}
              </div>
            )}
            {activeTab === "info" && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  ["Secure Payment", "🔒"],
                  ["Fast Delivery", "⚡"],
                  ["Premium Quality", "✦"],
                  ["24/7 Support", "💬"],
                ].map(([label, icon]) => (
                  <div key={label} className="pd-info-card">
                    <span style={{ fontSize: 20, display: "block", marginBottom: 6 }}>{icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#ccc" }}>{label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* ── Trust strip ──────────────────────────────────────────── */}
      <div style={{ padding: "64px 5vw 0" }} className="pd-fade-3">
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
          <span style={{ width: 3, height: 22, background: "#00ff88", borderRadius: 2, display: "block", flexShrink: 0 }} />
          <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: "#f0f0ea" }}>
            Premium Shopping Experience
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))", gap: 12 }}>
          {TRUST_ITEMS.map((t) => (
            <div key={t.title} className="pd-trust">
              <div style={{ width: 42, height: 42, borderRadius: "50%", background: "rgba(0,255,136,.08)", border: "1px solid rgba(0,255,136,.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {t.icon}
              </div>
              <div>
                <p style={{ fontSize: 14, fontWeight: 700, color: "#e8e8e2", marginBottom: 3 }}>{t.title}</p>
                <p style={{ fontSize: 12, color: "#666" }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Related products ─────────────────────────────────────── */}
      {relatedProducts.length > 0 && (
        <div style={{ padding: "64px 5vw 80px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 28 }}>
            <span style={{ width: 3, height: 22, background: "#00ff88", borderRadius: 2, display: "block", flexShrink: 0 }} />
            <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 700, color: "#f0f0ea" }}>
              You May Also Like
            </h2>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(210px,1fr))", gap: 14 }}>
            {relatedProducts.map((item) => {
              const relImg = item.images?.[0]
                ? item.images[0].startsWith("http") ? item.images[0] : `${API_BASE}${item.images[0]}`
                : "/placeholder.png";
              return (
                <div key={item._id} className="pd-rel-card" onClick={() => navigate(`/products/${item._id}`)}>
                  <div style={{ overflow: "hidden" }}>
                    <img src={relImg} alt={item.name} />
                  </div>
                  <div style={{ padding: "16px 16px 18px" }}>
                    <p style={{ fontSize: 11, color: "#00ff88", fontWeight: 700, letterSpacing: "1px", textTransform: "uppercase", marginBottom: 5 }}>
                      {item.category || "Neurafit"}
                    </p>
                    <h3 style={{ fontSize: 15, fontWeight: 700, color: "#e8e8e2", marginBottom: 8, lineHeight: 1.3 }}>{item.name}</h3>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
                      <span style={{ fontSize: 18, fontWeight: 800, color: "#00ff88", fontFamily: "'Syne', sans-serif" }}>
                        ₹{item.price?.toLocaleString("en-IN")}
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/products/${item._id}`); }}
                        style={{
                          padding: "6px 14px", borderRadius: 100,
                          background: "transparent", border: "1px solid #2e2e2e",
                          color: "#888", fontSize: 12, fontWeight: 600,
                          cursor: "pointer", outline: "none",
                          transition: "border-color .2s, color .2s",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = "#00ff88"; e.currentTarget.style.color = "#00ff88"; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = "#2e2e2e"; e.currentTarget.style.color = "#888"; }}
                      >
                        View →
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
