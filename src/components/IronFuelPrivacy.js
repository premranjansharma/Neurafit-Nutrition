import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@500;700&display=swap');

  .if-pp * { box-sizing: border-box; }
  .if-pp { font-family: 'Barlow', sans-serif; background: #0d0d0d; color: #f0f0f0; min-height: 100vh; }

  .if-pp-header { background: #111; border-bottom: 2px solid #2e7d32; padding: 0 5vw; display: flex; align-items: center; justify-content: space-between; height: 68px; position: sticky; top: 0; z-index: 100; }
  .if-pp-logo { font-family: 'Bebas Neue', sans-serif; font-size: 1.7rem; letter-spacing: 0.08em; color: #fff; }
  .if-pp-logo span { color: #43a047; }
  .if-pp-badge { font-family: 'Barlow Condensed', sans-serif; font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); border: 1px solid rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 4px; }

  .if-pp-hero { background: linear-gradient(135deg, #020d03 0%, #0d0d0d 60%); padding: 60px 5vw 88px; position: relative; overflow: hidden; border-bottom: 1px solid #1a1a1a; }
  .if-pp-hero::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(-55deg, transparent, transparent 40px, rgba(46,125,50,0.04) 40px, rgba(46,125,50,0.04) 41px); pointer-events: none; }
  .if-pp-hero::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 50px; background: #0d0d0d; clip-path: polygon(0 100%, 100% 100%, 100% 40%, 0 100%); }
  .if-pp-glow { position: absolute; top: -80px; left: -80px; width: 420px; height: 420px; background: radial-gradient(circle, rgba(46,125,50,0.15) 0%, transparent 70%); pointer-events: none; }
  .if-pp-bg-icon { position: absolute; right: 6vw; bottom: 60px; font-size: 6rem; opacity: 0.06; pointer-events: none; user-select: none; }
  .if-pp-eyebrow { font-family: 'Barlow Condensed', sans-serif; font-size: 0.72rem; letter-spacing: 0.28em; text-transform: uppercase; color: #43a047; margin-bottom: 14px; }
  .if-pp-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 8vw, 6rem); letter-spacing: 0.04em; line-height: 0.95; color: #fff; margin: 0 0 8px; }
  .if-pp-title span { color: #43a047; }
  .if-pp-sub { margin-top: 18px; color: rgba(255,255,255,0.4); font-size: 0.92rem; font-weight: 300; max-width: 500px; line-height: 1.65; }

  .if-pp-nav { display: flex; gap: 8px; flex-wrap: wrap; padding: 24px 5vw 0; max-width: 940px; margin: 0 auto; }
  .if-pp-nav-btn { padding: 7px 16px; border-radius: 4px; border: 1px solid #2a2a2a; background: #1a1a1a; font-family: 'Barlow Condensed', sans-serif; font-size: 0.78rem; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.18s; }
  .if-pp-nav-btn:hover, .if-pp-nav-btn.active { background: #2e7d32; color: #fff; border-color: #2e7d32; }

  .if-pp-main { max-width: 940px; margin: 0 auto; padding: 32px 5vw 80px; display: flex; flex-direction: column; gap: 20px; }

  .if-pp-card { background: #161616; border-radius: 10px; border: 1px solid #222; overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s; animation: ifPpFade 0.4s ease both; }
  .if-pp-card:hover { border-color: #2e7d32; box-shadow: 0 8px 40px rgba(0,0,0,0.4); }
  @keyframes ifPpFade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  .if-pp-card-head { display: flex; align-items: center; gap: 14px; padding: 20px 24px 18px; border-bottom: 1px solid #222; cursor: pointer; user-select: none; transition: background 0.15s; }
  .if-pp-card-head:hover { background: #1c1c1c; }
  .if-pp-card-icon { width: 44px; height: 44px; border-radius: 6px; background: #2e7d32; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; flex-shrink: 0; }
  .if-pp-card-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; letter-spacing: 0.06em; color: #fff; flex: 1; }
  .if-pp-chevron { width: 26px; height: 26px; border-radius: 4px; border: 1px solid #333; display: flex; align-items: center; justify-content: center; color: #555; font-size: 0.65rem; transition: transform 0.25s, background 0.2s; flex-shrink: 0; }
  .if-pp-chevron.open { transform: rotate(180deg); background: #2e7d32; color: #fff; border-color: #2e7d32; }

  .if-pp-card-body { padding: 22px 24px; overflow: hidden; transition: max-height 0.35s ease, opacity 0.3s ease, padding 0.3s; }
  .if-pp-card-body.collapsed { max-height: 0 !important; padding-top: 0; padding-bottom: 0; opacity: 0; }

  .if-pp-intro { font-size: 0.91rem; color: rgba(255,255,255,0.6); line-height: 1.65; margin-bottom: 14px; }

  .if-pp-list { list-style: none; display: flex; flex-direction: column; gap: 13px; }
  .if-pp-list li { display: flex; gap: 12px; align-items: flex-start; font-size: 0.91rem; color: rgba(255,255,255,0.7); line-height: 1.6; }
  .if-pp-bullet { width: 3px; flex-shrink: 0; height: 18px; background: #2e7d32; border-radius: 2px; margin-top: 3px; }

  .if-pp-sublist { margin-top: 10px; margin-left: 16px; display: flex; flex-direction: column; gap: 8px; }
  .if-pp-sublist li { display: flex; gap: 10px; align-items: flex-start; font-size: 0.88rem; color: rgba(255,255,255,0.55); line-height: 1.55; }
  .if-pp-sub-bullet { width: 2px; flex-shrink: 0; height: 14px; background: #43a047; border-radius: 2px; margin-top: 4px; }

  .if-pp-note { background: rgba(46,125,50,0.08); border: 1px solid rgba(46,125,50,0.25); border-left: 3px solid #2e7d32; border-radius: 6px; padding: 13px 16px; font-size: 0.87rem; color: rgba(255,255,255,0.55); display: flex; gap: 10px; align-items: flex-start; line-height: 1.55; margin-top: 14px; }
  .if-pp-warn { background: rgba(255,160,0,0.07); border: 1px solid rgba(255,160,0,0.2); border-left: 3px solid #ffa000; border-radius: 6px; padding: 13px 16px; font-size: 0.87rem; color: rgba(255,255,255,0.55); display: flex; gap: 10px; align-items: flex-start; line-height: 1.55; margin-top: 14px; }

  .if-pp-rights-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 12px; }
  .if-pp-right-card { background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 8px; padding: 16px 18px; transition: border-color 0.18s; }
  .if-pp-right-card:hover { border-color: #2e7d32; }
  .if-pp-right-icon { font-size: 1.3rem; margin-bottom: 8px; }
  .if-pp-right-label { font-size: 0.85rem; color: rgba(255,255,255,0.7); line-height: 1.4; }

  .if-pp-contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(195px, 1fr)); gap: 13px; }
  .if-pp-cc { background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 8px; padding: 18px; text-decoration: none; color: inherit; display: block; transition: border-color 0.18s, box-shadow 0.18s; }
  .if-pp-cc:hover { border-color: #2e7d32; box-shadow: 0 0 16px rgba(46,125,50,0.15); }
  .if-pp-cc-icon { font-size: 1.3rem; margin-bottom: 8px; }
  .if-pp-cc-label { font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: #43a047; margin-bottom: 4px; font-family: 'Barlow Condensed', sans-serif; }
  .if-pp-cc-val { font-size: 0.87rem; color: rgba(255,255,255,0.65); line-height: 1.4; }

  .if-pp-footer { text-align: center; padding: 0 5vw 40px; font-size: 0.76rem; color: rgba(255,255,255,0.18); letter-spacing: 0.05em; }

  @media (max-width: 480px) { .if-pp-title { font-size: 3.2rem; } }
`;

const userRights = [
  { icon: "📋", label: "Access and update your personal data" },
  { icon: "🗑️", label: "Request deletion of your data" },
  { icon: "📵", label: "Opt out of marketing communications" },
  { icon: "🔍", label: "Request details about how your data is used" },
];

const sections = [
  {
    id: "collect",
    icon: "📊",
    title: "Information We Collect",
    intro: "We may collect the following types of information:",
    groups: [
      { label: "Personal Information", items: ["Name, email address, phone number", "Billing and shipping address", "Payment details"] },
      { label: "Account Information", items: ["Username, password, order history, preferences"] },
      { label: "Technical Information", items: ["IP address, browser type, device details, cookies"] },
      { label: "Usage Information", items: ["Pages visited, products viewed, time spent, and interactions"] },
    ],
  },
  {
    id: "use",
    icon: "⚙️",
    title: "How We Use Your Information",
    intro: "We use your information to:",
    items: [
      "Process and deliver your orders",
      "Communicate regarding orders, products, and services",
      "Provide customer support",
      "Improve our website and product offerings",
      "Send promotional emails (only with your consent)",
      "Prevent fraud and ensure website security",
      "Comply with legal requirements",
    ],
  },
  {
    id: "sharing",
    icon: "🔗",
    title: "Information Sharing",
    intro: "We may share your data with:",
    items: [
      "Service Providers: Payment gateways, shipping partners, and marketing services",
      "Legal Authorities: When required by law or to protect our rights",
    ],
    warning: "We do not sell or rent your personal information to third parties.",
  },
  {
    id: "security",
    icon: "🔒",
    title: "Data Security",
    intro: "We take appropriate measures to protect your data:",
    items: [
      "Secure servers and encryption for sensitive information",
      "Regular security updates and monitoring",
      "Restricted access to authorized personnel only",
    ],
    note: "No online system is 100% secure, but we strive to protect your information at all times.",
  },
  {
    id: "rights",
    icon: "👤",
    title: "Your Rights",
    isRights: true,
  },
  {
    id: "cookies",
    icon: "🍪",
    title: "Cookies and Tracking",
    intro: "We use cookies to enhance user experience, analyze traffic, and personalize content. You can manage cookie settings through your browser.",
  },
  {
    id: "contact",
    icon: "📞",
    title: "Contact Us",
    contacts: [
      { icon: "📧", label: "Email", value: "privacy@NeurafitNutrition.com", href: "mailto:privacy@NeurafitNutrition.com" },
      { icon: "📞", label: "Phone", value: "+91 7739412888", href: "tel:+917739412888" },
      { icon: "📍", label: "Address", value: "Shubhankarpur, Darbhanga, Bihar - 846005, India", href: null },
    ],
  },
];

export default function IronFuelPrivacy() {
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
      <div className="if-pp">

        <header className="if-pp-header">
        
          <div className="if-pp-badge">Last Updated: Mar 22, 2026</div>
        </header>

        <div className="if-pp-hero">
          <div className="if-pp-glow" />
          <div className="if-pp-eyebrow">Legal Documentation</div>
          <h1 className="if-pp-title">
            Privacy<br /><span>Policy</span>
          </h1>
          <p className="if-pp-sub">
            At Neurafit Nutrition, we are committed to protecting your privacy
            and ensuring the security of your personal information.
          </p>
          <div className="if-pp-bg-icon">🔒</div>
        </div>

        <nav className="if-pp-nav">
          {sections.map((s) => (
            <button
              key={s.id}
              className={"if-pp-nav-btn" + (open[s.id] ? " active" : "")}
              onClick={() => toggle(s.id)}
            >
              {s.icon} {s.title}
            </button>
          ))}
        </nav>

        <main className="if-pp-main">
          {sections.map((s, i) => (
            <div
              key={s.id}
              id={"sec-" + s.id}
              className="if-pp-card"
              style={{ animationDelay: (i * 0.06) + "s" }}
            >
              <div className="if-pp-card-head" onClick={() => toggle(s.id)}>
                <div className="if-pp-card-icon">{s.icon}</div>
                <div className="if-pp-card-title">{s.title}</div>
                <div className={"if-pp-chevron" + (open[s.id] ? " open" : "")}>v</div>
              </div>

              <div
                className={"if-pp-card-body" + (open[s.id] ? "" : " collapsed")}
                style={{ maxHeight: open[s.id] ? "800px" : "0" }}
              >
                {s.intro && <p className="if-pp-intro">{s.intro}</p>}

                {s.groups && (
                  <ul className="if-pp-list">
                    {s.groups.map((g) => (
                      <li key={g.label}>
                        <span className="if-pp-bullet" />
                        <div>
                          <span style={{ color: "#fff", fontWeight: 500 }}>{g.label}:</span>
                          <ul className="if-pp-sublist">
                            {g.items.map((item) => (
                              <li key={item}>
                                <span className="if-pp-sub-bullet" />
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}

                {s.items && (
                  <ul className="if-pp-list">
                    {s.items.map((item, j) => (
                      <li key={j}>
                        <span className="if-pp-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.warning && (
                  <div className="if-pp-warn">
                    <span>!</span>
                    <span>{s.warning}</span>
                  </div>
                )}

                {s.note && (
                  <div className="if-pp-note">
                    <span>i</span>
                    <span>{s.note}</span>
                  </div>
                )}

                {s.isRights && (
                  <div className="if-pp-rights-grid">
                    {userRights.map((r) => (
                      <div className="if-pp-right-card" key={r.label}>
                        <div className="if-pp-right-icon">{r.icon}</div>
                        <div className="if-pp-right-label">{r.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {s.contacts && (
                  <div>
                    <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.35)", marginBottom: "16px", fontWeight: 300 }}>
                      If you have any questions about this Privacy Policy, contact us:
                    </p>
                    <div className="if-pp-contact-grid">
                      {s.contacts.map((c) =>
                        c.href ? (
                          <a key={c.label} href={c.href} className="if-pp-cc">
                            <div className="if-pp-cc-icon">{c.icon}</div>
                            <div className="if-pp-cc-label">{c.label}</div>
                            <div className="if-pp-cc-val">{c.value}</div>
                          </a>
                        ) : (
                          <div key={c.label} className="if-pp-cc">
                            <div className="if-pp-cc-icon">{c.icon}</div>
                            <div className="if-pp-cc-label">{c.label}</div>
                            <div className="if-pp-cc-val">{c.value}</div>
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
