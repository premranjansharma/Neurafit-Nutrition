import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@500;700&display=swap');

  .if-wrap * { box-sizing: border-box; }

  .if-wrap {
    font-family: 'Barlow', sans-serif;
    background: #030e00;
    color: #f0f0f0;
    min-height: 100vh;
  }

  /* HEADER */
  .if-header {
    background: #2c2222;
    border-bottom: 2px solid #2e7d32;
    padding: 0 5vw;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 68px;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .if-logo {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.7rem;
    letter-spacing: 0.08em;
    color: #fff;
  }

  .if-logo span { color: #43a047; }

  .if-badge {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.68rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    border: 1px solid rgba(255,255,255,0.1);
    padding: 4px 10px;
    border-radius: 4px;
  }

  /* HERO */
  .if-hero {
    background: linear-gradient(135deg, #020d03 0%, #0d0d0d 60%);
    padding: 60px 5vw 80px;
    position: relative;
    overflow: hidden;
    border-bottom: 1px solid #1e1e1e;
  }

  .if-hero-bg {
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      -55deg,
      transparent,
      transparent 40px,
      rgba(46,125,50,0.04) 40px,
      rgba(46,125,50,0.04) 41px
    );
    pointer-events: none;
  }

  .if-hero-glow {
    position: absolute;
    top: -80px; left: -80px;
    width: 400px; height: 400px;
    background: radial-gradient(circle, rgba(46,125,50,0.15) 0%, transparent 70%);
    pointer-events: none;
  }

  .if-hero::after {
    content: '';
    position: absolute;
    bottom: -1px; left: 0; right: 0;
    height: 50px;
    background: #0d0d0d;
    clip-path: polygon(0 100%, 100% 100%, 100% 40%, 0 100%);
  }

  .if-eyebrow {
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.72rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: #43a047;
  }

  .if-hero-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: clamp(3rem, 8vw, 6rem);
    letter-spacing: 0.04em;
    line-height: 0.95;
    color: #fff;
    margin: 0 0 8px;
  }

  .if-hero-title span { color: #2e7d32; }

  .if-hero-sub {
    margin-top: 18px;
    color: rgba(255,255,255,0.4);
    font-size: 0.92rem;
    font-weight: 300;
    max-width: 460px;
    line-height: 1.65;
  }

  /* QUICK NAV */
  .if-nav {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    padding: 24px 5vw 0;
    max-width: 940px;
    margin: 0 auto;
  }

  .if-nav-btn {
    padding: 7px 16px;
    border-radius: 4px;
    border: 1px solid #2a2a2a;
    background: #1a1a1a;
    font-family: 'Barlow Condensed', sans-serif;
    font-size: 0.82rem;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.5);
    cursor: pointer;
    transition: all 0.18s;
  }

  .if-nav-btn:hover, .if-nav-btn.active {
    background: #2e7d32;
    color: #fff;
    border-color: #2e7d32;
  }

  /* MAIN */
  .if-main {
    max-width: 940px;
    margin: 0 auto;
    padding: 32px 5vw 80px;
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  /* CARD */
  .if-card {
    background: #161616;
    border-radius: 10px;
    border: 1px solid #222;
    overflow: hidden;
    transition: border-color 0.2s, box-shadow 0.2s;
    animation: ifFadeUp 0.4s ease both;
  }

  .if-card:hover { border-color: #333; box-shadow: 0 8px 40px rgba(0,0,0,0.4); }

  @keyframes ifFadeUp {
    from { opacity: 0; transform: translateY(16px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  /* CARD HEAD */
  .if-card-head {
    display: flex;
    align-items: center;
    gap: 14px;
    padding: 20px 24px 18px;
    border-bottom: 1px solid #222;
    cursor: pointer;
    user-select: none;
    transition: background 0.15s;
  }

  .if-card-head:hover { background: #1c1c1c; }

  .if-card-icon {
    width: 44px; height: 44px;
    border-radius: 6px;
    background: #2e7d32;
    display: flex; align-items: center; justify-content: center;
    font-size: 1.15rem;
    flex-shrink: 0;
  }

  .if-card-title {
    font-family: 'Bebas Neue', sans-serif;
    font-size: 1.4rem;
    letter-spacing: 0.06em;
    color: #fff;
    flex: 1;
  }

  .if-chevron {
    width: 26px; height: 26px;
    border-radius: 4px;
    border: 1px solid #333;
    display: flex; align-items: center; justify-content: center;
    color: #555;
    font-size: 0.65rem;
    transition: transform 0.25s, background 0.2s;
    flex-shrink: 0;
  }

  .if-chevron.open { transform: rotate(180deg); background: #2e7d32; color: #fff; border-color: #2e7d32; }

  /* CARD BODY */
  .if-card-body {
    padding: 22px 24px;
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s;
  }

  .if-card-body.collapsed {
    max-height: 0 !important;
    padding-top: 0; padding-bottom: 0;
    opacity: 0;
  }

  /* LIST */
  .if-list { list-style: none; display: flex; flex-direction: column; gap: 13px; }

  .if-list li {
    display: flex; gap: 12px; align-items: flex-start;
    font-size: 0.91rem; color: rgba(255,255,255,0.7); line-height: 1.6;
  }

  .if-bullet {
    width: 3px; flex-shrink: 0;
    height: 18px; background: #2e7d32;
    border-radius: 2px; margin-top: 3px;
  }

  /* TIMELINE */
  .if-timeline { display: flex; flex-direction: column; gap: 0; margin-bottom: 18px; }

  .if-tl-item {
    display: flex; gap: 16px; align-items: flex-start;
    padding-bottom: 22px; position: relative;
  }

  .if-tl-item:last-child { padding-bottom: 0; }

  .if-tl-item::before {
    content: '';
    position: absolute;
    left: 16px; top: 34px; bottom: 0;
    width: 1px; background: #2a2a2a;
  }

  .if-tl-item:last-child::before { display: none; }

  .if-tl-dot {
    width: 33px; height: 33px; border-radius: 6px;
    background: #2e7d32;
    font-family: 'Bebas Neue', sans-serif;
    font-size: 0.9rem; letter-spacing: 0.05em;
    color: #fff;
    display: flex; align-items: center; justify-content: center;
    flex-shrink: 0; z-index: 1;
  }

  .if-tl-text strong {
    display: block; font-size: 0.9rem; font-weight: 600;
    color: #fff; margin-bottom: 2px;
  }

  .if-tl-text span { font-size: 0.84rem; color: rgba(255,255,255,0.45); }

  /* NOTE */
  .if-note {
    background: rgba(46,125,50,0.08);
    border: 1px solid rgba(46,125,50,0.25);
    border-left: 3px solid #2e7d32;
    border-radius: 6px;
    padding: 13px 16px;
    font-size: 0.87rem;
    color: rgba(255,255,255,0.65);
    display: flex; gap: 10px; align-items: flex-start;
    line-height: 1.55;
  }

  /* EXCHANGE GRID */
  .if-exc-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px; }

  .if-exc-card {
    background: #1e1e1e;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    padding: 18px;
    transition: border-color 0.18s;
  }

  .if-exc-card:hover { border-color: #2e7d32; }
  .if-exc-icon { font-size: 1.5rem; margin-bottom: 8px; }
  .if-exc-label { font-size: 0.88rem; font-weight: 500; color: rgba(255,255,255,0.8); }

  /* CONTACT */
  .if-contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(195px, 1fr)); gap: 13px; }

  .if-cc {
    background: #1e1e1e;
    border: 1px solid #2a2a2a;
    border-radius: 8px;
    padding: 18px;
    text-decoration: none;
    color: inherit;
    display: block;
    transition: border-color 0.18s, box-shadow 0.18s;
  }

  .if-cc:hover { border-color: #2e7d32; box-shadow: 0 0 16px rgba(46,125,50,0.15); }

  .if-cc-icon { font-size: 1.3rem; margin-bottom: 8px; }
  .if-cc-label { font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: #2e7d32; margin-bottom: 4px; font-family: 'Barlow Condensed', sans-serif; }
  .if-cc-val { font-size: 0.87rem; color: rgba(255,255,255,0.65); line-height: 1.4; }

  /* FOOTER */
  .if-footer {
    text-align: center;
    padding: 0 5vw 40px;
    font-size: 0.76rem;
    color: rgba(255,255,255,0.18);
    letter-spacing: 0.05em;
  }

  @media (max-width: 480px) {
    .if-exc-grid { grid-template-columns: 1fr; }
    .if-hero-title { font-size: 3.2rem; }
  }
`;

const sections = [
  {
    id: "cancellation",
    icon: "❌",
    title: "Order Cancellation",
    items: [
      "Orders can be cancelled within 24 hours of placement if they have not been shipped.",
      "To cancel an order, please contact our customer support team at info@ironfuelnutrition.com or call +91 7739412888.",
      "Kindly provide your order number and reason for cancellation.",
      "Once an order has been shipped, it cannot be cancelled, but you may request a return after delivery.",
    ],
  },
  {
    id: "return",
    icon: "🔄",
    title: "Return Policy",
    items: [
      "To initiate a return, contact our support team with photos of the damaged or defective product.",
      "Products must be unused and in original packaging.",
      "Opened or used supplement products cannot be returned unless they are damaged or defective upon delivery.",
    ],
  },
  {
    id: "refund",
    icon: "💰",
    title: "Refund Process",
    timeline: [
      { step: "01", title: "Return Received", desc: "We receive and inspect your returned product." },
      { step: "02", title: "Processing", desc: "Refund processed within 7–10 business days." },
      { step: "03", title: "Credited", desc: "Amount credited to your original payment method." },
    ],
    note: "For damaged or defective items, the full amount including shipping charges will be refunded.",
  },
  {
    id: "exchange",
    icon: "🔁",
    title: "Exchange Policy",
    eligibility: [
      { icon: "🛡️", label: "Damaged or Defective Product" },
      { icon: "📋", label: "Incorrect Product Received" },
    ],
    deadline: "Exchange requests must be made within 7 days of delivery.",
  },
  {
    id: "contact",
    icon: "📞",
    title: "Contact Us",
    contacts: [
      { icon: "📧", label: "Email", value: "info@NeurafitNutrition.com", href: "mailto:info@NeurafitNutrition.com" },
      { icon: "📞", label: "Phone", value: "+91 7739412888", href: "tel:+917739412888" },
      { icon: "📍", label: "Address", value: "Shubhankarpur, Darbhanga, Bihar – 846005, India", href: null },
    ],
  },
];

export default function IronFuelPolicy() {
  const [open, setOpen] = useState(
    Object.fromEntries(sections.map((s) => [s.id, true]))
  );

  const toggle = (id) => {
    setOpen((prev) => ({ ...prev, [id]: !prev[id] }));
    setTimeout(() => {
      document.getElementById("sec-" + id)?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 50);
  };

  return (
    <>
      <style>{styles}</style>
      <div className="if-wrap">

        {/* Header */}
        <header className="if-header">
          
          <div className="if-badge">Last Updated: Mar 21, 2026</div>
        </header>

        {/* Hero */}
        <div className="if-hero">
          <div className="if-hero-bg" />
          <div className="if-hero-glow" />
          <div className="if-eyebrow">Legal · Policy Documentation</div>
          <h1 className="if-hero-title">
            Cancellation<br />&amp; <span>Refund</span><br />Policy
          </h1>
          <p className="if-hero-sub">
            At Neurafit Nutrition, we strive to ensure your complete satisfaction
            with every purchase. We understand situations may arise where you
            need to cancel or request a refund.
          </p>
        </div>

        {/* Quick Nav */}
        <nav className="if-nav">
          {sections.map((s) => (
            <button
              key={s.id}
              className={`if-nav-btn${open[s.id] ? " active" : ""}`}
              onClick={() => toggle(s.id)}
            >
              {s.icon} {s.title}
            </button>
          ))}
        </nav>

        {/* Cards */}
        <main className="if-main">
          {sections.map((s, i) => (
            <div
              key={s.id}
              id={"sec-" + s.id}
              className="if-card"
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              {/* Head */}
              <div className="if-card-head" onClick={() => toggle(s.id)}>
                <div className="if-card-icon">{s.icon}</div>
                <div className="if-card-title">{s.title}</div>
                <div className={`if-chevron${open[s.id] ? " open" : ""}`}>▼</div>
              </div>

              {/* Body */}
              <div
                className={`if-card-body${open[s.id] ? "" : " collapsed"}`}
                style={{ maxHeight: open[s.id] ? "600px" : "0" }}
              >
                {/* Bullet list */}
                {s.items && (
                  <ul className="if-list">
                    {s.items.map((item, j) => (
                      <li key={j}>
                        <span className="if-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {/* Refund timeline */}
                {s.timeline && (
                  <>
                    <div className="if-timeline">
                      {s.timeline.map((t) => (
                        <div className="if-tl-item" key={t.step}>
                          <div className="if-tl-dot">{t.step}</div>
                          <div className="if-tl-text">
                            <strong>{t.title}</strong>
                            <span>{t.desc}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                    {s.note && (
                      <div className="if-note">
                        <span>⚡</span>
                        <span>{s.note}</span>
                      </div>
                    )}
                  </>
                )}

                {/* Exchange */}
                {s.eligibility && (
                  <>
                    <p style={{ fontSize: "0.72rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "#2e7d32", marginBottom: "14px", fontFamily: "'Barlow Condensed', sans-serif" }}>
                      Eligible for Exchange
                    </p>
                    <div className="if-exc-grid">
                      {s.eligibility.map((e) => (
                        <div className="if-exc-card" key={e.label}>
                          <div className="if-exc-icon">{e.icon}</div>
                          <div className="if-exc-label">{e.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="if-note">
                      <span>📅</span>
                      <span>{s.deadline}</span>
                    </div>
                  </>
                )}

                {/* Contact */}
                {s.contacts && (
                  <>
                    <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.4)", marginBottom: "16px", fontWeight: 300 }}>
                      If you have any questions regarding our policy, feel free to reach out:
                    </p>
                    <div className="if-contact-grid">
                      {s.contacts.map((c) =>
                        c.href ? (
                          <a key={c.label} href={c.href} className="if-cc">
                            <div className="if-cc-icon">{c.icon}</div>
                            <div className="if-cc-label">{c.label}</div>
                            <div className="if-cc-val">{c.value}</div>
                          </a>
                        ) : (
                          <div key={c.label} className="if-cc">
                            <div className="if-cc-icon">{c.icon}</div>
                            <div className="if-cc-label">{c.label}</div>
                            <div className="if-cc-val">{c.value}</div>
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>
          ))}
        </main>

       
      </div>
    </>
  );
}
