import React, { useContext, useState, useEffect, useCallback } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

const styles = {
  card: {
    position: "relative",
    background: "#064d22",
    borderRadius: "10px",
    overflow: "hidden",
    cursor: "pointer",
    border: "1px solid #ebebeb",
    transition: "transform 0.35s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.35s ease",
    boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    userSelect: "none",
    willChange: "transform",
    contain: "layout style paint",
  },
  cardHover: {
    transform: "translateY(-6px)",
    boxShadow: "0 20px 48px rgba(0,0,0,0.13)",
  },
  imageWrapper: {
    position: "relative",
    width: "87%",
    paddingTop: "100%",
    overflow: "hidden",
    background: "transparent",
    isolation: "isolate",
  },
  image: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.3s ease",
    transformOrigin: "center center",
  },
  imageHover: {
    transform: "scale(1.10)",
  },
  imageLoading: {
    opacity: 0,
  },
  skeleton: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(90deg, #f0ede8 25%, #e8e4de 50%, #f0ede8 75%)",
    backgroundSize: "200% 100%",
    animation: "shimmer 1.6s infinite",
  },
  dotRow: {
    position: "absolute",
    bottom: "12px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    gap: "5px",
    zIndex: 2,
  },
  dot: {
    width: "5px",
    height: "5px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.5)",
    transition: "background 0.3s ease, transform 0.3s ease",
  },
  dotActive: {
    background: "#ffffff",
    transform: "scale(1.4)",
  },
  wishlistBtn: {
    position: "absolute",
    top: "12px",
    right: "12px",
    width: "34px",
    height: "34px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.92)",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 3,
    backdropFilter: "blur(4px)",
    transition: "transform 0.2s ease, background 0.2s ease",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  body: {
    padding: "16px 18px 18px",
  },
  name: {
    margin: "0 0 5px",
    fontSize: "15px",
    fontWeight: "600",
    color: "#1a1a1a",
    letterSpacing: "-0.2px",
    lineHeight: "1.35",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
  },
  desc: {
    margin: "0 0 12px",
    fontSize: "13px",
    color: "#e46e6e",
    lineHeight: "1.5",
    overflow: "hidden",
    textOverflow: "ellipsis",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
  },
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "10px",
  },
  priceBlock: {
    display: "flex",
    flexDirection: "column",
    gap: "1px",
  },
  priceLabel: {
    fontSize: "10px",
    fontWeight: "500",
    color: "#aaa",
    letterSpacing: "0.8px",
    textTransform: "uppercase",
  },
  price: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1a1a1a",
    letterSpacing: "-0.5px",
    lineHeight: 1,
  },
  priceCurrency: {
    fontSize: "13px",
    fontWeight: "600",
    verticalAlign: "super",
    marginRight: "1px",
    color: "#555",
  },
  addBtn: {
    display: "flex",
    alignItems: "center",
    gap: "7px",
    padding: "10px 16px",
    background: "#090808",
    color: "#fbf8f8",
    border: "1.5px solid #0a5728",
    borderRadius: "100px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "600",
    letterSpacing: "0.2px",
    transition: "background 0.2s ease, border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
    whiteSpace: "nowrap",
    flexShrink: 0,
  },
  addBtnHover: {
    background: "#2e2e2e",
    borderColor: "#666",
    boxShadow: "0 0 0 3px rgba(255,255,255,0.08)",
  },
  addBtnAdded: {
    background: "#16a34a",
    borderColor: "#16a34a",
  },
  addBtnActive: {
    transform: "scale(0.94)",
    boxShadow: "none",
  },
  plusIcon: {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    background: "rgba(255,255,255,0.25)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    lineHeight: 1,
    fontWeight: "300",
  },
  outOfStock: {
    position: "absolute",
    top: "12px",
    left: "12px",
    background: "rgba(26,26,26,0.82)",
    color: "#fff",
    fontSize: "10px",
    fontWeight: "600",
    letterSpacing: "1px",
    textTransform: "uppercase",
    padding: "4px 9px",
    borderRadius: "100px",
    backdropFilter: "blur(4px)",
    zIndex: 3,
  },
  metaRow: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    margin: "0 0 11px",
  },
  weightBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    background: "#f4f2ee",
    color: "#666",
    fontSize: "11px",
    fontWeight: "600",
    padding: "3px 9px",
    borderRadius: "100px",
    letterSpacing: "0.2px",
  },
  actionRow: {
    display: "flex",
    gap: "8px",
    marginTop: "13px",
  },
  buyBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "10px 0",
    background: "#1a1a1a",
    color: "#fff",
    border: "1.5px solid #3a3a3a",
    borderRadius: "100px",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "700",
    letterSpacing: "0.2px",
    transition: "background 0.2s ease, border-color 0.2s ease, transform 0.15s ease, box-shadow 0.2s ease",
    whiteSpace: "nowrap",
  },
  buyBtnHover: {
    background: "#2e2e2e",
    borderColor: "#666",
    boxShadow: "0 0 0 3px rgba(255,255,255,0.08)",
    transform: "scale(1.02)",
  },
  buyBtnDisabled: {
    background: "#e5e5e5",
    color: "#aaa",
    cursor: "not-allowed",
  },
};

const shimmerKeyframes = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  @keyframes popIn {
    0% { transform: scale(0.8); opacity: 0; }
    70% { transform: scale(1.15); }
    100% { transform: scale(1); opacity: 1; }
  }
`;

if (typeof document !== "undefined" && !document.getElementById("pc-style")) {
  const tag = document.createElement("style");
  tag.id = "pc-style";
  tag.textContent = shimmerKeyframes;
  document.head.appendChild(tag);
}

export default function ProductCard({ product, outOfStock = false }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [isImageError, setIsImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [btnState, setBtnState] = useState("idle"); // idle | active | added
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isCartHovered, setIsCartHovered] = useState(false);
  const [isBuyHovered, setIsBuyHovered] = useState(false);

  const images = React.useMemo(() => {
    if (!product?.images?.length) return ["/placeholder.png"];
    return product.images.map((img) =>
      typeof img === "string" && img.startsWith("http") ? img : `${API_BASE}${img}`
    );
  }, [product]);

  useEffect(() => {
    if (images.length <= 1) return;
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2500);
    return () => clearInterval(interval);
  }, [images.length]);

  useEffect(() => {
    setIndex(0);
    setIsImageError(false);
    setIsLoading(true);
  }, [images]);

  const handleAddToCart = useCallback(
    (e) => {
      e.stopPropagation();
      if (!product?._id || outOfStock) return;

      setBtnState("active");
      setTimeout(() => {
        addToCart(product);
        setBtnState("added");
        setTimeout(() => setBtnState("idle"), 1800);
      }, 120);
    },
    [product, addToCart, outOfStock]
  );

  const handleCardClick = useCallback(() => {
    if (product?._id) navigate(`/products/${product._id}`);
  }, [product, navigate]);

  const handleWishlist = (e) => {
    e.stopPropagation();
    setIsWishlisted((w) => !w);
  };

  const handleBuyNow = useCallback(
    (e) => {
      e.stopPropagation();
      if (!product?._id || outOfStock) return;
      addToCart(product);
      navigate("/checkout");
    },
    [product, addToCart, navigate, outOfStock]
  );

  if (!product) return null;

const currentImage = isImageError ? "/placeholder.png" : images[index];

return (
    <div
      style={{ ...styles.card, ...(isHovered ? styles.cardHover : {}) }}
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`View ${product.name || "product"}`}
      onKeyDown={(e) => {
        if (e.key === "Enter") handleCardClick();
        if (e.key === " ") { e.preventDefault(); handleCardClick(); }
      }}
    >
      {/* Image Section */}
      <div style={styles.imageWrapper}>
        {isLoading && <div style={styles.skeleton} aria-hidden="true" />}

        {outOfStock && <span style={styles.outOfStock}>Out of Stock</span>}

        <img
          src={currentImage}
          alt={product.name || "Product image"}
          style={{
            ...styles.image,
            ...(isHovered && !isLoading ? styles.imageHover : {}),
            ...(isLoading ? styles.imageLoading : {}),
          }}
          onError={() => setIsImageError(true)}
          onLoad={() => setIsLoading(false)}
          draggable={false}
        />

        {/* Dot indicators */}
        {images.length > 1 && (
          <div style={styles.dotRow} aria-hidden="true">
            {images.map((_, i) => (
              <span
                key={i}
                style={{ ...styles.dot, ...(i === index ? styles.dotActive : {}) }}
              />
            ))}
          </div>
        )}

        {/* Wishlist */}
        <button
          style={{
            ...styles.wishlistBtn,
            ...(isWishlisted ? { background: "#fff0f0" } : {}),
          }}
          onClick={handleWishlist}
          aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
          title={isWishlisted ? "Wishlisted" : "Add to wishlist"}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill={isWishlisted ? "#e11d48" : "none"} stroke={isWishlisted ? "#e11d48" : "#888"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div style={styles.body}>
        <h3 style={styles.name} title={product.name}>
          {product.name || "Unnamed Product"}
        </h3>

        {/* Weight badge */}
        {(product.weight || product.unit) && (
          <div style={styles.metaRow}>
            <span style={styles.weightBadge}>
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="5" r="3"/><path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.9-2.54L19.4 9.46A2 2 0 0 0 17.48 8Z"/>
              </svg>
              {product.weight}{product.unit || "g"}
            </span>
          </div>
        )}

        {product.desc && (
          <p style={styles.desc}>{product.desc}</p>
        )}

        {/* Price + Add to Cart row */}
        <div style={styles.footer}>
          <div style={styles.priceBlock}>
            <span style={styles.priceLabel}>Price</span>
            <span style={styles.price}>
              <span style={styles.priceCurrency}>₹</span>
              {(product.price ?? 0).toLocaleString("en-IN", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </span>
          </div>

          <button
            style={{
              ...styles.addBtn,
              ...(isCartHovered && btnState === "idle" && !outOfStock ? styles.addBtnHover : {}),
              ...(btnState === "active" ? styles.addBtnActive : {}),
              ...(btnState === "added" ? styles.addBtnAdded : {}),
              ...(outOfStock ? { background: "#ccc", cursor: "not-allowed" } : {}),
            }}
            onClick={handleAddToCart}
            onMouseEnter={(e) => { e.stopPropagation(); setIsCartHovered(true); }}
            onMouseLeave={(e) => { e.stopPropagation(); setIsCartHovered(false); }}
            disabled={outOfStock}
            aria-label={outOfStock ? "Out of stock" : btnState === "added" ? "Added to cart" : "Add to cart"}
          >
            {btnState === "added" ? (
              <>
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Added
              </>
            ) : (
              <>
                <span style={styles.plusIcon} aria-hidden="true">+</span>
                Cart
              </>
            )}
          </button>
        </div>

        {/* Buy Now */}
        <div style={styles.actionRow}>
          <button
            style={{
              ...styles.buyBtn,
              ...(isBuyHovered && !outOfStock ? styles.buyBtnHover : {}),
              ...(outOfStock ? styles.buyBtnDisabled : {}),
            }}
            onClick={handleBuyNow}
            onMouseEnter={(e) => { e.stopPropagation(); setIsBuyHovered(true); }}
            onMouseLeave={(e) => { e.stopPropagation(); setIsBuyHovered(false); }}
            disabled={outOfStock}
            aria-label={outOfStock ? "Out of stock" : "Buy now"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><line x1="3" x2="21" y1="6" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {outOfStock ? "Out of Stock" : "Buy Now"}
          </button>
        </div>
      </div>
    </div>
  );
}
