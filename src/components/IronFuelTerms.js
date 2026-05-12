import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@500;700&display=swap');

  .if-tnc * { box-sizing: border-box; }
  .if-tnc { font-family: 'Barlow', sans-serif; background: #0d0d0d; color: #f0f0f0; min-height: 100vh; }

  .if-tnc-header { background: #111; border-bottom: 2px solid #2e7d32; padding: 0 5vw; display: flex; align-items: center; justify-content: space-between; height: 68px; position: sticky; top: 0; z-index: 100; }
  .if-tnc-logo { font-family: 'Bebas Neue', sans-serif; font-size: 1.7rem; letter-spacing: 0.08em; color: #fff; }
  .if-tnc-logo span { color: #43a047; }
  .if-tnc-badge { font-family: 'Barlow Condensed', sans-serif; font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); border: 1px solid rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 4px; }

  .if-tnc-hero { background: linear-gradient(135deg, #020d03 0%, #0d0d0d 60%); padding: 60px 5vw 88px; position: relative; overflow: hidden; border-bottom: 1px solid #1a1a1a; }
  .if-tnc-hero::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(-55deg, transparent, transparent 40px, rgba(46,125,50,0.04) 40px, rgba(46,125,50,0.04) 41px); pointer-events: none; }
  .if-tnc-hero::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 50px; background: #0d0d0d; clip-path: polygon(0 100%, 100% 100%, 100% 40%, 0 100%); }
  .if-tnc-glow { position: absolute; top: -80px; left: -80px; width: 420px; height: 420px; background: radial-gradient(circle, rgba(46,125,50,0.15) 0%, transparent 70%); pointer-events: none; }
  .if-tnc-bg-icon { position: absolute; right: 6vw; bottom: 60px; font-size: 6rem; opacity: 0.06; pointer-events: none; user-select: none; }
  .if-tnc-eyebrow { font-family: 'Barlow Condensed', sans-serif; font-size: 0.72rem; letter-spacing: 0.28em; text-transform: uppercase; color: #43a047; margin-bottom: 14px; }
  .if-tnc-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 8vw, 6rem); letter-spacing: 0.04em; line-height: 0.95; color: #fff; margin: 0 0 8px; }
  .if-tnc-title span { color: #43a047; }
  .if-tnc-sub { margin-top: 18px; color: rgba(255,255,255,0.4); font-size: 0.92rem; font-weight: 300; max-width: 500px; line-height: 1.65; }

  .if-tnc-nav { display: flex; gap: 8px; flex-wrap: wrap; padding: 24px 5vw 0; max-width: 940px; margin: 0 auto; }
  .if-tnc-nav-btn { padding: 7px 16px; border-radius: 4px; border: 1px solid #2a2a2a; background: #1a1a1a; font-family: 'Barlow Condensed', sans-serif; font-size: 0.78rem; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.18s; }
  .if-tnc-nav-btn:hover, .if-tnc-nav-btn.active { background: #2e7d32; color: #fff; border-color: #2e7d32; }

  .if-tnc-main { max-width: 940px; margin: 0 auto; padding: 32px 5vw 80px; display: flex; flex-direction: column; gap: 20px; }

  .if-tnc-card { background: #161616; border-radius: 10px; border: 1px solid #222; overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s; animation: ifTncFade 0.4s ease both; }
  .if-tnc-card:hover { border-color: #2e7d32; box-shadow: 0 8px 40px rgba(0,0,0,0.4); }
  @keyframes ifTncFade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  .if-tnc-card-head { display: flex; align-items: center; gap: 14px; padding: 20px 24px 18px; border-bottom: 1px solid #222; cursor: pointer; user-select: none; transition: background 0.15s; }
  .if-tnc-card-head:hover { background: #1c1c1c; }
  .if-tnc-card-icon { width: 44px; height: 44px; border-radius: 6px; background: #2e7d32; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; flex-shrink: 0; }
  .if-tnc-card-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; letter-spacing: 0.06em; color: #fff; flex: 1; }
  .if-tnc-chevron { width: 26px; height: 26px; border-radius: 4px; border: 1px solid #333; display: flex; align-items: center; justify-content: center; color: #555; font-size: 0.65rem; transition: transform 0.25s, background 0.2s; flex-shrink: 0; }
  .if-tnc-chevron.open { transform: rotate(180deg); background: #2e7d32; color: #fff; border-color: #2e7d32; }

  .if-tnc-card-body { padding: 22px 24px; overflow: hidden; transition: max-height 0.35s ease, opacity 0.3s ease, padding 0.3s; }
  .if-tnc-card-body.collapsed { max-height: 0 !important; padding-top: 0; padding-bottom: 0; opacity: 0; }

  .if-tnc-intro { font-size: 0.91rem; color: rgba(255,255,255,0.6); line-height: 1.65; margin-bottom: 14px; }

  .if-tnc-list { list-style: none; display: flex; flex-direction: column; gap: 13px; }
  .if-tnc-list li { display: flex; gap: 12px; align-items: flex-start; font-size: 0.91rem; color: rgba(255,255,255,0.7); line-height: 1.6; }
  .if-tnc-bullet { width: 3px; flex-shrink: 0; height: 18px; background: #2e7d32; border-radius: 2px; margin-top: 3px; }

  .if-tnc-note { background: rgba(46,125,50,0.08); border: 1px solid rgba(46,125,50,0.25); border-left: 3px solid #2e7d32; border-radius: 6px; padding: 13px 16px; font-size: 0.87rem; color: rgba(255,255,255,0.55); display: flex; gap: 10px; align-items: flex-start; line-height: 1.55; margin-top: 14px; }

  .if-tnc-contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(195px, 1fr)); gap: 13px; }
  .if-tnc-cc { background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 8px; padding: 18px; text-decoration: none; color: inherit; display: block; transition: border-color 0.18s, box-shadow 0.18s; }
  .if-tnc-cc:hover { border-color: #2e7d32; box-shadow: 0 0 16px rgba(46,125,50,0.15); }
  .if-tnc-cc-icon { font-size: 1.3rem; margin-bottom: 8px; }
  .if-tnc-cc-label { font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: #43a047; margin-bottom: 4px; font-family: 'Barlow Condensed', sans-serif; }
  .if-tnc-cc-val { font-size: 0.87rem; color: rgba(255,255,255,0.65); line-height: 1.4; }

  .if-tnc-footer { text-align: center; padding: 0 5vw 40px; font-size: 0.76rem; color: rgba(255,255,255,0.18); letter-spacing: 0.05em; }

  @media (max-width: 480px) { .if-tnc-title { font-size: 3.2rem; } }
`;

const sections = [
  {
    id: "acceptance",
    icon: "✅",
    title: "Acceptance of Terms",
    intro: "By using our website, you confirm that you have read, understood, and agree to these Terms and Conditions. If you do not agree, please do not use our website or services.",
  },
  {
    id: "products",
    icon: "🛒",
    title: "Products and Pricing",
    items: [
      "Product descriptions and images are for reference only; actual products may vary slightly.",
      "We reserve the right to change product prices at any time without prior notice.",
      "All prices are in INR (Rs.) and include applicable taxes.",
      "While we strive for accuracy, errors may occur. We reserve the right to correct them or cancel affected orders.",
    ],
  },
  {
    id: "orders",
    icon: "💳",
    title: "Orders and Payment",
    items: [
      "Placing an order means you agree to purchase at the listed price.",
      "We reserve the right to accept or reject any order.",
      "Full payment must be completed before order processing.",
      "Accepted payment methods are shown at checkout.",
      "Orders are subject to availability and confirmation.",
    ],
  },
  {
    id: "shipping",
    icon: "🚚",
    title: "Shipping and Delivery",
    items: [
      "Delivery timelines are estimates and not guaranteed.",
      "We are not responsible for delays due to external factors.",
      "Ownership and risk transfer to the customer once the order is handed to the courier.",
      "Please refer to our Shipping Policy for more details.",
    ],
  },
  {
    id: "refunds",
    icon: "🔄",
    title: "Cancellation and Refunds",
    intro: "Please refer to our Cancellation and Refund Policy for complete details on cancellations, returns, and refunds.",
  },
  {
    id: "ip",
    icon: "©️",
    title: "Intellectual Property",
    items: [
      "All content including text, images, logos, graphics, and software belongs to Neurafit Nutrition and is protected by law.",
      "You may not copy, modify, or distribute any content without prior written permission.",
    ],
  },
  {
    id: "accounts",
    icon: "👤",
    title: "User Accounts",
    items: [
      "You are responsible for maintaining the confidentiality of your account details.",
      "All activities under your account are your responsibility.",
      "We reserve the right to suspend or terminate accounts if necessary.",
    ],
  },
  {
    id: "liability",
    icon: "⚠️",
    title: "Limitation of Liability",
    intro: "To the fullest extent permitted by law, Neurafit Nutrition shall not be liable for any indirect, incidental, or consequential damages, including:",
    items: [
      "Inability to use our website or products.",
      "Unauthorized access to personal data.",
      "Interruptions or technical issues on our platform.",
    ],
  },
  {
    id: "changes",
    icon: "🔁",
    title: "Changes to Terms",
    intro: "We may update these Terms and Conditions at any time. Changes will be effective immediately upon posting. Continued use of the website means you accept the updated terms.",
  },
  {
    id: "contact",
    icon: "📞",
    title: "Contact Us",
    contacts: [
      { icon: "📧", label: "Email", value: "support@NeurafitNutrition.com", href: "mailto:support@NeurafitNutrition.com" },
      { icon: "📞", label: "Phone", value: "+91 7739412888", href: "tel:+917739412888" },
      { icon: "📍", label: "Address", value: "Shubhankarpur, Darbhanga, Bihar - 846005, India", href: null },
    ],
  },
];

export default function IronFuelTerms() {
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
      <div className="if-tnc">

        <header className="if-tnc-header">
      
          <div className="if-tnc-badge">Last Updated: Mar 21, 2026</div>
        </header>

        <div className="if-tnc-hero">
          <div className="if-tnc-glow" />
          <div className="if-tnc-eyebrow">Legal Documentation</div>
          <h1 className="if-tnc-title">
            Terms and<br /><span>Conditions</span>
          </h1>
          <p className="if-tnc-sub">
            Welcome to Neurafit Nutrition. These Terms and Conditions govern your use
            of our website and the purchase of our products. By accessing our website
            or placing an order, you agree to be bound by these terms.
          </p>
          <div className="if-tnc-bg-icon">💪</div>
        </div>

        <nav className="if-tnc-nav">
          {sections.map((s) => (
            <button
              key={s.id}
              className={"if-tnc-nav-btn" + (open[s.id] ? " active" : "")}
              onClick={() => toggle(s.id)}
            >
              {s.icon} {s.title}
            </button>
          ))}
        </nav>

        <main className="if-tnc-main">
          {sections.map((s, i) => (
            <div
              key={s.id}
              id={"sec-" + s.id}
              className="if-tnc-card"
              style={{ animationDelay: (i * 0.06) + "s" }}
            >
              <div className="if-tnc-card-head" onClick={() => toggle(s.id)}>
                <div className="if-tnc-card-icon">{s.icon}</div>
                <div className="if-tnc-card-title">{s.title}</div>
                <div className={"if-tnc-chevron" + (open[s.id] ? " open" : "")}>v</div>
              </div>

              <div
                className={"if-tnc-card-body" + (open[s.id] ? "" : " collapsed")}
                style={{ maxHeight: open[s.id] ? "600px" : "0" }}
              >
                {s.intro && (
                  <p className="if-tnc-intro">{s.intro}</p>
                )}

                {s.items && (
                  <ul className="if-tnc-list">
                    {s.items.map((item, j) => (
                      <li key={j}>
                        <span className="if-tnc-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.id === "refunds" && (
                  <div className="if-tnc-note">
                    <span>i</span>
                    <span>Visit our Cancellation and Refund Policy page for full details.</span>
                  </div>
                )}

                {s.id === "shipping" && (
                  <div className="if-tnc-note">
                    <span>i</span>
                    <span>Visit our Shipping Policy page for full details.</span>
                  </div>
                )}

                {s.contacts && (
                  <div>
                    <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.35)", marginBottom: "16px", fontWeight: 300 }}>
                      For any queries regarding these Terms, reach out to us:
                    </p>
                    <div className="if-tnc-contact-grid">
                      {s.contacts.map((c) =>
                        c.href ? (
                          <a key={c.label} href={c.href} className="if-tnc-cc">
                            <div className="if-tnc-cc-icon">{c.icon}</div>
                            <div className="if-tnc-cc-label">{c.label}</div>
                            <div className="if-tnc-cc-val">{c.value}</div>
                          </a>
                        ) : (
                          <div key={c.label} className="if-tnc-cc">
                            <div className="if-tnc-cc-icon">{c.icon}</div>
                            <div className="if-tnc-cc-label">{c.label}</div>
                            <div className="if-tnc-cc-val">{c.value}</div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </main>

      
      </div>
    </>
  );
}
