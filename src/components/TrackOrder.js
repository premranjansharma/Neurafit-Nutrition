import React, { useState } from "react";

const STATUS_STEPS = ["pending", "confirmed", "shipped", "delivered"];

const STATUS_LABELS = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
};

const styles = {
  page: {
    minHeight: "100vh",
    background: "#fff",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "48px 16px",
    fontFamily: "'DM Sans', sans-serif",
  },
  card: {
    background: "#438135",
    borderRadius: "20px",
    border: "1px solid #5e4a21",
    padding: "40px",
    width: "100%",
    maxWidth: "560px",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "32px",
  },
  logoBox: {
    width: "36px",
    height: "36px",
    background: "#105416",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#fff",
    fontSize: "18px",
  },
  logoText: {
    fontSize: "17px",
    fontWeight: "600",
    color: "#1a1a1a",
    letterSpacing: "-0.3px",
  },
  heading: {
    fontSize: "26px",
    fontWeight: "700",
    color: "#1a1a1a",
    letterSpacing: "-0.5px",
    margin: "0 0 6px 0",
  },
  subtext: {
    fontSize: "14px",
    color: "#888",
    margin: "0 0 28px 0",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    marginBottom: "16px",
  },
  inputWrapper: {
    position: "relative",
  },
  inputIcon: {
    position: "absolute",
    left: "14px",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "16px",
    pointerEvents: "none",
  },
  input: {
    width: "100%",
    padding: "13px 14px 13px 40px",
    border: "1.5px solid #e8e5df",
    borderRadius: "12px",
    fontSize: "14px",
    color: "#1a1a1a",
    outline: "none",
    background: "#fafaf8",
    boxSizing: "border-box",
    transition: "border-color 0.2s",
    fontFamily: "'DM Sans', sans-serif",
  },
  btn: {
    width: "100%",
    padding: "14px",
    background: "#1a1a1a",
    color: "#fff",
    border: "none",
    borderRadius: "12px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "4px",
    letterSpacing: "-0.2px",
    transition: "opacity 0.15s",
    fontFamily: "'DM Sans', sans-serif",
  },
  divider: {
    height: "1px",
    background: "#f0ede7",
    margin: "28px 0",
  },
  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "24px",
    flexWrap: "wrap",
    gap: "8px",
  },
  orderId: {
    fontSize: "12px",
    color: "#aaa",
    letterSpacing: "0.5px",
    marginBottom: "2px",
    textTransform: "uppercase",
    margin: 0,
  },
  orderIdVal: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#1a1a1a",
    fontFamily: "monospace",
    margin: 0,
  },
  statusBadge: (status) => ({
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "600",
    letterSpacing: "0.3px",
    background:
      status === "delivered"
        ? "#e6f4ea"
        : status === "shipped"
        ? "#e8f0fe"
        : status === "confirmed"
        ? "#fff3e0"
        : "#f3f3f3",
    color:
      status === "delivered"
        ? "#2e7d32"
        : status === "shipped"
        ? "#1a56db"
        : status === "confirmed"
        ? "#e65100"
        : "#555",
  }),
  timeline: {
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "space-between",
    marginBottom: "28px",
    position: "relative",
  },
  timelineStep: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "6px",
    flex: 1,
    position: "relative",
    zIndex: 1,
  },
  stepDot: (active, done) => ({
    width: "28px",
    height: "28px",
    borderRadius: "50%",
    background: done ? "#1a1a1a" : active ? "#1a1a1a" : "#e8e5df",
    border: active ? "none" : done ? "none" : "2px solid #e8e5df",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "12px",
    color: done || active ? "#fff" : "#bbb",
    fontWeight: "700",
    transition: "all 0.3s",
  }),
  stepLabel: (active, done) => ({
    fontSize: "11px",
    fontWeight: active || done ? "600" : "400",
    color: active || done ? "#1a1a1a" : "#bbb",
    textAlign: "center",
    letterSpacing: "-0.1px",
  }),
  timelineLine: {
    position: "absolute",
    top: "14px",
    left: "14%",
    right: "14%",
    height: "2px",
    background: "#e8e5df",
    zIndex: 0,
  },
  timelineLineFill: (pct) => ({
    position: "absolute",
    top: "14px",
    left: "14%",
    width: `${pct}%`,
    height: "2px",
    background: "#1a1a1a",
    zIndex: 0,
    transition: "width 0.5s ease",
  }),
  infoGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "24px",
  },
  infoBox: {
    background: "#fafaf8",
    border: "1px solid #f0ede7",
    borderRadius: "12px",
    padding: "12px 14px",
  },
  infoLabel: {
    fontSize: "11px",
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: "0.4px",
    marginBottom: "3px",
    margin: 0,
  },
  infoValue: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a1a1a",
    margin: 0,
  },
  productList: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
  },
  productItem: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "12px 14px",
    background: "#fafaf8",
    border: "1px solid #f0ede7",
    borderRadius: "12px",
  },
  productName: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#1a1a1a",
    marginBottom: "2px",
    margin: 0,
  },
  productQty: {
    fontSize: "12px",
    color: "#aaa",
    margin: 0,
  },
  productPrice: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "14px 0 0 0",
    marginTop: "4px",
    borderTop: "1.5px solid #1a1a1a",
  },
  totalLabel: {
    fontSize: "14px",
    fontWeight: "600",
    color: "#1a1a1a",
  },
  totalAmount: {
    fontSize: "18px",
    fontWeight: "700",
    color: "#1a1a1a",
    letterSpacing: "-0.5px",
  },
  sectionTitle: {
    fontSize: "12px",
    fontWeight: "600",
    color: "#aaa",
    textTransform: "uppercase",
    letterSpacing: "0.6px",
    marginBottom: "12px",
    margin: 0,
    paddingBottom: "12px",
  },
};

export default function TrackOrder() {
  const [orderId, setOrderId] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleTrack = async () => {
    if (!orderId.trim() || !email.trim()) {
      alert("Please enter both Order ID and Email.");
      return;
    }
    setLoading(true);
    try {
     const res = await fetch(
  `${process.env.REACT_APP_BASE_URL}/api/orders/track/${orderId}?email=${email}`
);
      const data = await res.json();
      if (!res.ok) {
        alert(data.message || "Order not found");
        setOrder(null);
      } else {
        setOrder(data);
      }
    } catch {
      alert("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const currentStep = order
    ? STATUS_STEPS.indexOf(order.status?.toLowerCase())
    : -1;

  const timelinePct =
    currentStep <= 0
      ? 0
      : Math.round((currentStep / (STATUS_STEPS.length - 1)) * 72);

  return (
    <div style={styles.page}>
        <div style={styles.card}>
          {/* Logo */}
          <div style={styles.logo}>
            <div style={styles.logoBox}>📦</div>
            <span style={styles.logoText}>OrderTrack</span>
          </div>

          <h2 style={styles.heading}>Track your order</h2>
          <p style={styles.subtext}>
            Enter your order ID and email to see the latest status.
          </p>

          {/* Inputs */}
          <div style={styles.inputGroup}>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>#</span>
              <input
                style={styles.input}
                type="text"
                placeholder="Order ID"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              />
            </div>
            <div style={styles.inputWrapper}>
              <span style={styles.inputIcon}>@</span>
              <input
                style={styles.input}
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleTrack()}
              />
            </div>
          </div>

          <button
            style={{ ...styles.btn, opacity: loading ? 0.6 : 1 }}
            onClick={handleTrack}
            disabled={loading}
          >
            {loading ? "Tracking..." : "Track Order →"}
          </button>

          {/* Result */}
          {order && (
            <>
              <div style={styles.divider} />

              {/* Order header */}
              <div style={styles.resultHeader}>
                <div>
                  <p style={styles.orderId}>Order ID</p>
                  <p style={styles.orderIdVal}>
                    {String(order._id).slice(-10).toUpperCase()}
                  </p>
                </div>
                <span style={styles.statusBadge(order.status?.toLowerCase())}>
                  {STATUS_LABELS[order.status?.toLowerCase()] || order.status}
                </span>
              </div>

              {/* Timeline */}
              <div style={{ position: "relative", marginBottom: "28px" }}>
                <div style={styles.timelineLine} />
                <div style={styles.timelineLineFill(timelinePct)} />
                <div style={styles.timeline}>
                  {STATUS_STEPS.map((step, i) => {
                    const done = i < currentStep;
                    const active = i === currentStep;
                    return (
                      <div key={step} style={styles.timelineStep}>
                        <div style={styles.stepDot(active, done)}>
                          {done ? "✓" : i + 1}
                        </div>
                        <span style={styles.stepLabel(active, done)}>
                          {STATUS_LABELS[step]}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Info grid */}
              <div style={styles.infoGrid}>
                <div style={styles.infoBox}>
                  <p style={styles.infoLabel}>Email</p>
                  <p style={{ ...styles.infoValue, fontSize: "13px" }}>
                    {order.guestInfo?.email || email}
                  </p>
                </div>
                <div style={styles.infoBox}>
                  <p style={styles.infoLabel}>Payment</p>
                  <p style={styles.infoValue}>
                    {order.paymentMethod || "—"}
                  </p>
                </div>
              </div>

              {/* Products */}
              <p style={styles.sectionTitle}>Items</p>
              <div style={styles.productList}>
                {order.items?.map((item, i) => (
                  <div key={i} style={styles.productItem}>
                    <div>
                      <p style={styles.productName}>{item.name}</p>
                      <p style={styles.productQty}>Qty: {item.quantity}</p>
                    </div>
                    <span style={styles.productPrice}>₹{item.price}</span>
                  </div>
                ))}
              </div>

              {/* Total */}
              <div style={styles.totalRow}>
                <span style={styles.totalLabel}>Total</span>
                <span style={styles.totalAmount}>₹{order.totalAmount}</span>
              </div>
            </>
          )}
        </div>
      </div>
  );
}
