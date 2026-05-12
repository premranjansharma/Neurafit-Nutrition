import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Barlow:wght@300;400;500;600&family=Barlow+Condensed:wght@500;700&display=swap');

  .if-ship * { box-sizing: border-box; }
  .if-ship { font-family: 'Barlow', sans-serif; background: #0d0d0d; color: #f0f0f0; min-height: 100vh; }

  .if-ship-header { background: #111; border-bottom: 2px solid #2e7d32; padding: 0 5vw; display: flex; align-items: center; justify-content: space-between; height: 68px; position: sticky; top: 0; z-index: 100; }
  .if-ship-logo { font-family: 'Bebas Neue', sans-serif; font-size: 1.7rem; letter-spacing: 0.08em; color: #fff; }
  .if-ship-logo span { color: #43a047; }
  .if-ship-badge { font-family: 'Barlow Condensed', sans-serif; font-size: 0.68rem; letter-spacing: 0.2em; text-transform: uppercase; color: rgba(255,255,255,0.3); border: 1px solid rgba(255,255,255,0.1); padding: 4px 10px; border-radius: 4px; }

  .if-ship-hero { background: linear-gradient(135deg, #020d03 0%, #0d0d0d 60%); padding: 60px 5vw 88px; position: relative; overflow: hidden; border-bottom: 1px solid #1a1a1a; }
  .if-ship-hero::before { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(-55deg, transparent, transparent 40px, rgba(46,125,50,0.04) 40px, rgba(46,125,50,0.04) 41px); pointer-events: none; }
  .if-ship-hero::after { content: ''; position: absolute; bottom: -1px; left: 0; right: 0; height: 50px; background: #0d0d0d; clip-path: polygon(0 100%, 100% 100%, 100% 40%, 0 100%); }
  .if-ship-glow { position: absolute; top: -80px; left: -80px; width: 420px; height: 420px; background: radial-gradient(circle, rgba(46,125,50,0.15) 0%, transparent 70%); pointer-events: none; }
  .if-ship-truck { position: absolute; right: 6vw; bottom: 60px; font-size: 6rem; opacity: 0.06; pointer-events: none; user-select: none; }
  .if-ship-eyebrow { font-family: 'Barlow Condensed', sans-serif; font-size: 0.72rem; letter-spacing: 0.28em; text-transform: uppercase; color: #43a047; margin-bottom: 14px; }
  .if-ship-title { font-family: 'Bebas Neue', sans-serif; font-size: clamp(3rem, 8vw, 6rem); letter-spacing: 0.04em; line-height: 0.95; color: #fff; margin: 0 0 8px; }
  .if-ship-title span { color: #43a047; }
  .if-ship-sub { margin-top: 18px; color: rgba(255,255,255,0.4); font-size: 0.92rem; font-weight: 300; max-width: 460px; line-height: 1.65; }

  .if-ship-nav { display: flex; gap: 8px; flex-wrap: wrap; padding: 24px 5vw 0; max-width: 940px; margin: 0 auto; }
  .if-ship-nav-btn { padding: 7px 16px; border-radius: 4px; border: 1px solid #2a2a2a; background: #1a1a1a; font-family: 'Barlow Condensed', sans-serif; font-size: 0.82rem; letter-spacing: 0.06em; text-transform: uppercase; color: rgba(255,255,255,0.5); cursor: pointer; transition: all 0.18s; }
  .if-ship-nav-btn:hover, .if-ship-nav-btn.active { background: #2e7d32; color: #fff; border-color: #2e7d32; }

  .if-ship-main { max-width: 940px; margin: 0 auto; padding: 32px 5vw 80px; display: flex; flex-direction: column; gap: 20px; }

  .if-ship-card { background: #161616; border-radius: 10px; border: 1px solid #222; overflow: hidden; transition: border-color 0.2s, box-shadow 0.2s; animation: ifShipFade 0.4s ease both; }
  .if-ship-card:hover { border-color: #2e7d32; box-shadow: 0 8px 40px rgba(0,0,0,0.4); }
  @keyframes ifShipFade { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }

  .if-ship-card-head { display: flex; align-items: center; gap: 14px; padding: 20px 24px 18px; border-bottom: 1px solid #222; cursor: pointer; user-select: none; transition: background 0.15s; }
  .if-ship-card-head:hover { background: #1c1c1c; }
  .if-ship-card-icon { width: 44px; height: 44px; border-radius: 6px; background: #2e7d32; display: flex; align-items: center; justify-content: center; font-size: 1.15rem; flex-shrink: 0; }
  .if-ship-card-title { font-family: 'Bebas Neue', sans-serif; font-size: 1.4rem; letter-spacing: 0.06em; color: #fff; flex: 1; }
  .if-ship-chevron { width: 26px; height: 26px; border-radius: 4px; border: 1px solid #333; display: flex; align-items: center; justify-content: center; color: #555; font-size: 0.65rem; transition: transform 0.25s, background 0.2s; flex-shrink: 0; }
  .if-ship-chevron.open { transform: rotate(180deg); background: #2e7d32; color: #fff; border-color: #2e7d32; }

  .if-ship-card-body { padding: 22px 24px; overflow: hidden; transition: max-height 0.3s ease, opacity 0.3s ease, padding 0.3s; }
  .if-ship-card-body.collapsed { max-height: 0 !important; padding-top: 0; padding-bottom: 0; opacity: 0; }

  .if-ship-list { list-style: none; display: flex; flex-direction: column; gap: 13px; }
  .if-ship-list li { display: flex; gap: 12px; align-items: flex-start; font-size: 0.91rem; color: rgba(255,255,255,0.7); line-height: 1.6; }
  .if-ship-bullet { width: 3px; flex-shrink: 0; height: 18px; background: #2e7d32; border-radius: 2px; margin-top: 3px; }

  .if-ship-delivery-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(155px, 1fr)); gap: 12px; margin-bottom: 18px; }
  .if-ship-delivery-card { background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 8px; padding: 20px 16px; text-align: center; transition: border-color 0.18s, box-shadow 0.18s; }
  .if-ship-delivery-card:hover { border-color: #2e7d32; box-shadow: 0 4px 20px rgba(46,125,50,0.15); }
  .if-ship-delivery-icon { font-size: 1.7rem; margin-bottom: 10px; }
  .if-ship-delivery-zone { font-family: 'Barlow Condensed', sans-serif; font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; color: rgba(255,255,255,0.5); margin-bottom: 6px; }
  .if-ship-delivery-days { font-family: 'Bebas Neue', sans-serif; font-size: 2rem; color: #43a047; line-height: 1; margin-bottom: 2px; letter-spacing: 0.04em; }
  .if-ship-delivery-label { font-size: 0.72rem; color: rgba(255,255,255,0.3); }

  .if-ship-cost-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; font-size: 0.9rem; }
  .if-ship-cost-table th { background: #1e1e1e; color: #43a047; padding: 10px 16px; text-align: left; font-family: 'Barlow Condensed', sans-serif; font-size: 0.82rem; letter-spacing: 0.1em; text-transform: uppercase; border-bottom: 1px solid #2e7d32; }
  .if-ship-cost-table td { padding: 12px 16px; border-bottom: 1px solid #222; color: rgba(255,255,255,0.7); font-size: 0.9rem; }
  .if-ship-cost-table tr:last-child td { border-bottom: none; }
  .if-ship-cost-table tr:hover td { background: #1c1c1c; }
  .if-ship-free-badge { display: inline-block; background: rgba(46,125,50,0.15); color: #66bb6a; border: 1px solid rgba(46,125,50,0.4); border-radius: 4px; padding: 2px 10px; font-size: 0.75rem; font-family: 'Barlow Condensed', sans-serif; letter-spacing: 0.1em; text-transform: uppercase; }

  .if-ship-note { background: rgba(46,125,50,0.08); border: 1px solid rgba(46,125,50,0.25); border-left: 3px solid #2e7d32; border-radius: 6px; padding: 13px 16px; font-size: 0.87rem; color: rgba(255,255,255,0.55); display: flex; gap: 10px; align-items: flex-start; line-height: 1.55; }

  .if-ship-contact-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(195px, 1fr)); gap: 13px; }
  .if-ship-cc { background: #1e1e1e; border: 1px solid #2a2a2a; border-radius: 8px; padding: 18px; text-decoration: none; color: inherit; display: block; transition: border-color 0.18s, box-shadow 0.18s; }
  .if-ship-cc:hover { border-color: #2e7d32; box-shadow: 0 0 16px rgba(46,125,50,0.15); }
  .if-ship-cc-icon { font-size: 1.3rem; margin-bottom: 8px; }
  .if-ship-cc-label { font-size: 0.68rem; letter-spacing: 0.14em; text-transform: uppercase; color: #43a047; margin-bottom: 4px; font-family: 'Barlow Condensed', sans-serif; }
  .if-ship-cc-val { font-size: 0.87rem; color: rgba(255,255,255,0.65); line-height: 1.4; }

  .if-ship-footer { text-align: center; padding: 0 5vw 40px; font-size: 0.76rem; color: rgba(255,255,255,0.18); letter-spacing: 0.05em; }

  @media (max-width: 480px) {
    .if-ship-delivery-grid { grid-template-columns: 1fr 1fr; }
    .if-ship-title { font-size: 3.2rem; }
  }
`;

const deliveryZones = [
  { icon: "🏙️", zone: "Metro Cities", days: "2-4", label: "business days" },
  { icon: "🏘️", zone: "Urban Areas", days: "3-5", label: "business days" },
  { icon: "🌄", zone: "Remote / Rural", days: "5-7", label: "business days" },
];

const shippingCosts = [
  { type: "Standard Shipping", condition: "Orders below Rs.500", cost: "Rs.50" },
  { type: "Free Shipping", condition: "Orders above Rs.600", cost: "FREE" },
  { type: "Express Shipping", condition: "Available at checkout", cost: "Varies" },
];

const sections = [
  {
    id: "methods",
    icon: "🚚",
    title: "Shipping Methods",
    items: [
      "We ship across India using trusted courier partners.",
      "Orders are processed within 24-48 hours after payment confirmation.",
      "Once shipped, you will receive a tracking number via email or SMS.",
      "You can track your order through our website or the courier partner portal.",
    ],
  },
  { id: "delivery", icon: "⏱️", title: "Delivery Timeframes", isDelivery: true },
  { id: "costs", icon: "💰", title: "Shipping Costs", isCosts: true },
  {
    id: "tracking",
    icon: "📦",
    title: "Order Tracking",
    items: [
      "A tracking ID will be shared once your order is shipped.",
      "Track your order via our Track Order page or courier website.",
      "For any tracking issues, feel free to contact our support team.",
    ],
  },
  {
    id: "contact",
    icon: "📞",
    title: "Contact Us",
    contacts: [
      { icon: "📧", label: "Email", value: "info@NeurafitNutrition.com", href: "mailto:info@NeurafitNutrition.com" },
      { icon: "📞", label: "Phone", value: "+91 7739412888", href: "tel:+917739412888" },
      { icon: "📍", label: "Address", value: "Shubhankarpur, Darbhanga, Bihar - 846005, India", href: null },
    ],
  },
];

export default function IronFuelShipping() {
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
      <div className="if-ship">

        <header className="if-ship-header">
        
          <div className="if-ship-badge">Last Updated: Mar 21, 2026</div>
        </header>

        <div className="if-ship-hero">
          <div className="if-ship-glow" />
          <div className="if-ship-eyebrow">Policy Documentation</div>
          <h1 className="if-ship-title">
            Shipping<br /><span>Policy</span>
          </h1>
          <p className="if-ship-sub">
            At Neurafit Nutrition, we aim to deliver our premium supplements
            to you quickly and efficiently across India.
          </p>
          <div className="if-ship-truck">🚚</div>
        </div>

        <nav className="if-ship-nav">
          {sections.map((s) => (
            <button
              key={s.id}
              className={"if-ship-nav-btn" + (open[s.id] ? " active" : "")}
              onClick={() => toggle(s.id)}
            >
              {s.icon} {s.title}
            </button>
          ))}
        </nav>

        <main className="if-ship-main">
          {sections.map((s, i) => (
            <div
              key={s.id}
              id={"sec-" + s.id}
              className="if-ship-card"
              style={{ animationDelay: (i * 0.07) + "s" }}
            >
              <div className="if-ship-card-head" onClick={() => toggle(s.id)}>
                <div className="if-ship-card-icon">{s.icon}</div>
                <div className="if-ship-card-title">{s.title}</div>
                <div className={"if-ship-chevron" + (open[s.id] ? " open" : "")}>v</div>
              </div>

              <div
                className={"if-ship-card-body" + (open[s.id] ? "" : " collapsed")}
                style={{ maxHeight: open[s.id] ? "700px" : "0" }}
              >
                {s.items && (
                  <ul className="if-ship-list">
                    {s.items.map((item, j) => (
                      <li key={j}>
                        <span className="if-ship-bullet" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {s.isDelivery && (
                  <div>
                    <div className="if-ship-delivery-grid">
                      {deliveryZones.map((z) => (
                        <div className="if-ship-delivery-card" key={z.zone}>
                          <div className="if-ship-delivery-icon">{z.icon}</div>
                          <div className="if-ship-delivery-zone">{z.zone}</div>
                          <div className="if-ship-delivery-days">{z.days}</div>
                          <div className="if-ship-delivery-label">{z.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="if-ship-note">
                      <span>!</span>
                      <span>Delivery timelines are estimates and may vary due to weather, public holidays, or unforeseen delays.</span>
                    </div>
                  </div>
                )}

                {s.isCosts && (
                  <div>
                    <table className="if-ship-cost-table">
                      <thead>
                        <tr>
                          <th>Type</th>
                          <th>Condition</th>
                          <th>Cost</th>
                        </tr>
                      </thead>
                      <tbody>
                        {shippingCosts.map((row) => (
                          <tr key={row.type}>
                            <td>{row.type}</td>
                            <td>{row.condition}</td>
                            <td>
                              {row.cost === "FREE"
                                ? <span className="if-ship-free-badge">FREE</span>
                                : row.cost}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    <div className="if-ship-note">
                      <span>i</span>
                      <span>Shipping charges may vary based on location and order weight.</span>
                    </div>
                  </div>
                )}

                {s.contacts && (
                  <div>
                    <p style={{ fontSize: "0.88rem", color: "rgba(255,255,255,0.35)", marginBottom: "16px", fontWeight: 300 }}>
                      For any questions regarding shipping, reach out to us:
                    </p>
                    <div className="if-ship-contact-grid">
                      {s.contacts.map((c) =>
                        c.href ? (
                          <a key={c.label} href={c.href} className="if-ship-cc">
                            <div className="if-ship-cc-icon">{c.icon}</div>
                            <div className="if-ship-cc-label">{c.label}</div>
                            <div className="if-ship-cc-val">{c.value}</div>
                          </a>
                        ) : (
                          <div key={c.label} className="if-ship-cc">
                            <div className="if-ship-cc-icon">{c.icon}</div>
                            <div className="if-ship-cc-label">{c.label}</div>
                            <div className="if-ship-cc-val">{c.value}</div>
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
