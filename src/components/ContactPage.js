import { useState } from "react";
import { useNavigate } from 'react-router-dom';


/* ===== ICONS ===== */


const IconLocation = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
);
const IconMail = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
  </svg>
);
const IconPhone = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
  </svg>
);
const IconChevron = ({ open }) => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#1D9E75" strokeWidth="2" strokeLinecap="round"
    style={{ transition: "transform 0.2s", transform: open ? "rotate(180deg)" : "rotate(0deg)", flexShrink: 0 }}>
    <polyline points="6 9 12 15 18 9"/>
  </svg>
);
const TwitterIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.746l7.73-8.835L1.254 2.25H8.08l4.253 5.622 5.91-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
);
const InstagramIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
  </svg>
);
const WhatsAppIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);
const FacebookIcon = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="white">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
);

/* ===== DATA ===== */
const faqs = [
  { q: "What are your shipping options?", a: "We offer standard shipping (3–5 business days) and express shipping (1–2 business days) throughout India. Free shipping on orders above ₹500." },
  { q: "Do you offer international shipping?", a: "Currently, we only ship within India. We're working on expanding and will announce when international shipping becomes available." },
  { q: "What is your return policy?", a: "We accept returns within 7 days of delivery if the product is unused and in its original packaging. Contact our team to initiate a return." },
  { q: "How can I track my order?", a: "Once your order is shipped, you'll receive a tracking number via email. You can also track your order by logging into your account on our website." },
];

const socials = [
  { label: "Twitter / X",  href: "https://twitter.com/naturalpuff",   Icon: TwitterIcon,   bg: "#000",        hover: { bg: "#f0f0f0", color: "#000",    border: "#000" } },
  { label: "Instagram",    href: "https://instagram.com/naturalpuff", Icon: InstagramIcon, bg: "linear-gradient(45deg,#f09433,#e6683c,#dc2743,#cc2366,#bc1888)", hover: { bg: "#fdf0f5", color: "#96004a", border: "#E1306C" } },
  { label: "WhatsApp",     href: "https://wa.me/917739412888",        Icon: WhatsAppIcon,  bg: "#25D366",     hover: { bg: "#edfbf1", color: "#128C7E",  border: "#25D366" } },
  { label: "Facebook",     href: "https://facebook.com/naturalpuff",  Icon: FacebookIcon,  bg: "#1877F2",     hover: { bg: "#edf3fd", color: "#0a4fa8",  border: "#1877F2" } },
];

/* ===== SMALL COMPONENTS ===== */
function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: "0.5px solid rgba(0,0,0,0.08)" }}>
      <button onClick={() => setOpen(!open)}
        style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "14px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontFamily: "inherit", fontSize: 14, fontWeight: 500, color: "#085041" }}>
        {q} <IconChevron open={open} />
      </button>
      <div style={{ fontSize: 13, color: "#5F5E5A", lineHeight: 1.6, maxHeight: open ? 200 : 0, overflow: "hidden", transition: "max-height 0.25s ease", paddingBottom: open ? 14 : 0 }}>
        {a}
      </div>
    </div>
  );
}

function SocialLink({ label, href, Icon, bg, hover }) {
  const [h, setH] = useState(false);
  return (
    <a href={href} target="_blank" rel="noopener noreferrer"
      onMouseEnter={() => setH(true)} onMouseLeave={() => setH(false)}
      style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 12px", border: `0.5px solid ${h ? hover.border : "rgba(0,0,0,0.10)"}`, borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 500, color: h ? hover.color : "#1a1a1a", background: h ? hover.bg : "#F7FAF8", transition: "all 0.15s" }}>
      <div style={{ width: 28, height: 28, borderRadius: 6, background: bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
        <Icon />
      </div>
      {label}
    </a>
  );
}

/* ===== MAIN EXPORT ===== */
export default function ContactPage() {
  const navigate = useNavigate();
  const [form, setForm]   = useState({ name: "", email: "", phone: "", subject: "", message: "" });
  const [toast, setToast] = useState(false);

  const update = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  const handleSubmit = () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      alert("Please fill in all required fields.");
      return;
    }
    setToast(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
    setTimeout(() => setToast(false), 3500);
  };

  /* shared styles */
  const card   = { background: "#fff", border: "0.5px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: "1.75rem", boxShadow: "0 2px 16px rgba(0,0,0,0.05)" };
  const cardH2 = { fontFamily: "'Playfair Display', serif", fontSize: 18, fontWeight: 500, color: "#085041", margin: "0 0 1.25rem", paddingBottom: 12, borderBottom: "0.5px solid rgba(0,0,0,0.08)" };
  const inp    = { width: "100%", padding: "10px 14px", border: "0.5px solid rgba(0,0,0,0.15)", borderRadius: 8, fontFamily: "inherit", fontSize: 14, color: "#1a1a1a", background: "#F7FAF8", outline: "none" };
  const lbl    = { display: "block", fontSize: 11, fontWeight: 500, color: "#5F5E5A", marginBottom: 5, letterSpacing: "0.05em", textTransform: "uppercase" };
  const icoWrap = { width: 36, height: 36, borderRadius: "50%", background: "#E1F5EE", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, color: "#1D9E75" };
  const icoLbl  = { fontSize: 10, fontWeight: 500, color: "#5F5E5A", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 };
  const icoVal  = { fontSize: 13, lineHeight: 1.55 };
  const linkClr = { color: "#1D9E75", textDecoration: "none" };

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif", background: "#F7FAF8", minHeight: "100vh", color: "#1a1a1a" }}>
      <link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500&family=Playfair+Display:wght@500;600&display=swap" rel="stylesheet" />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "3rem 1.5rem 4rem" }}>

        {/* HERO */}
        <div style={{ background: "linear-gradient(135deg,#085041,#0F6E56)", borderRadius: 14, padding: "3rem 2.5rem", marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-block", background: "rgba(159,225,203,0.2)", color: "#9FE1CB", fontSize: 11, fontWeight: 500, letterSpacing: "0.08em", padding: "4px 12px", borderRadius: 20, marginBottom: "1rem", border: "0.5px solid rgba(159,225,203,0.3)", textTransform: "uppercase" }}>
            Neurafit Nutrition — Get in Touch
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 34, fontWeight: 600, color: "#fff", marginBottom: 10, lineHeight: 1.2 }}>
            Have Questions<br />or Feedback?
          </h1>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,0.7)", maxWidth: 500, margin: 0 }}>
            We’d love to hear from you. Reach out to our team and we’ll get back to you as soon as possible.
          </p>
        </div>

        {/* GRID — Form + Info */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem", marginBottom: "1.5rem" }}>

          {/* FORM */}
          <div style={card}>
            <h2 style={cardH2}>Send Us a Message</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20.5, paddingRight:10 }}>
              <div style={{ marginBottom: "1rem",width: "87%" }}>
                <label style={lbl}>Full Name *</label>
                <input style={inp} placeholder="Your name" value={form.name} onChange={update("name")} />
              </div>
              <div style={{ marginBottom: "1rem",width: "92.5%" }}>
                <label style={lbl}>Email Address *</label>
                <input style={inp} type="email" placeholder="you@email.com" value={form.email} onChange={update("email")} />
              
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 15}}>
              <div style={{ marginBottom: "1.rem",width: "85%" }}>
                <label style={lbl}>Phone Number</label>
                <input style={inp} type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={update("phone")} />
              </div>
              <div style={{ marginBottom: "1rem",width: "100%"}}>
                <label style={lbl}>Subject *</label>
                <select style={{ ...inp, appearance: "none" }} value={form.subject} onChange={update("subject")}>
                  <option value="">Select a subject</option>
                  <option>Order Inquiry</option>
                  <option>Shipping &amp; Delivery</option>
                  <option>Returns &amp; Refunds</option>
                  <option>Product Feedback</option>
                  <option>Business Partnership</option>
                  <option>Other</option>
                </select>
              </div>
            </div>
            <div style={{ marginBottom: "1rem" ,width: "94%"}}>
              <label style={lbl}>Message *</label>
              <textarea style={{ ...inp, minHeight: 110, resize: "vertical" }} placeholder="Write your message here…" value={form.message} onChange={update("message")} />
             

            </div>
            <button onClick={handleSubmit}
              onMouseEnter={e => e.currentTarget.style.background = "#085041"}
              onMouseLeave={e => e.currentTarget.style.background = "#1D9E75"}
              style={{ width: "100%", padding: 12, background: "#1D9E75", color: "#fff", border: "none", borderRadius: 8, fontFamily: "inherit", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "background 0.15s" }}>
              Send Message →
            </button>
          </div>

          {/* INFO */}
          <div style={card}>
            <h2 style={cardH2}>Contact Neurafit Nutrition</h2>

            {/* Addresses */}
            {[
              { label: "Darbhanga Office", val: <>Shubhankarpur<br />Darbhanga, Bihar 846004 India</> },
            
            ].map(({ label, val }) => (
              <div key={label} style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: "1rem" }}>
                <div style={icoWrap}><IconLocation /></div>
                <div><div style={icoLbl}>{label}</div><div style={icoVal}>{val}</div></div>
              </div>
            ))}

            {/* Email */}
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: "1rem" }}>
              <div style={icoWrap}><IconMail /></div>
              <div>
                <div style={icoLbl}>Email</div>
                <div style={icoVal}>
                  <a href="mailto:info@.com"  style={linkClr}>@.com</a><br />
                  <a href="mailto:sales@.com" style={linkClr}>@.com</a>
                </div>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div style={icoWrap}><IconPhone /></div>
              <div>
                <div style={icoLbl}>Phone</div>
                <div style={icoVal}>
                  <a href="tel:+917739412888" style={linkClr}>+91 7739412888</a><br />
                  <a href="tel:+917739740853" style={linkClr}>+91 7739740853</a>
                </div>
              </div>
            </div>

            {/* Hours */}
            <div style={{ marginBottom: "1.25rem" }}>
              <div style={{ ...icoLbl, marginBottom: 8 }}>Business Hours</div>
              {[["Monday – Friday", "9:00 AM – 6:00 PM"], ["Saturday", "10:00 AM – 4:00 PM"], ["Sunday", null]].map(([day, time], i, arr) => (
                <div key={day} style={{ display: "flex", justifyContent: "space-between", fontSize: 13, padding: "6px 0", borderBottom: i < arr.length - 1 ? "0.5px solid rgba(0,0,0,0.06)" : "none" }}>
                  <span style={{ color: "#5F5E5A" }}>{day}</span>
                  {time ? <span style={{ fontWeight: 500 }}>{time}</span> : <span style={{ color: "#E24B4A", fontWeight: 500 }}>Closed</span>}
                </div>
              ))}
            </div>

            {/* Social */}
            <div>
              <div style={{ ...icoLbl, marginBottom: 10 }}>Connect With Us</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
                {socials.map(s => <SocialLink key={s.label} {...s} />)}
              </div>
            </div>
          </div>
        </div>

        {/* FAQ */}
        <div style={{ ...card, marginBottom: "1.5rem" }}>
          <h2 style={cardH2}>Frequently Asked Questions</h2>
          {faqs.map(f => <FaqItem key={f.q} q={f.q} a={f.a} />)}
        </div>

        {/* CTA */}
        <div style={{ background: "linear-gradient(135deg,#085041,#0F6E56)", borderRadius: 14, padding: "2rem 2.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, color: "#fff", fontWeight: 500, margin: 0 }}>Ready to Try Our Products?</h3>
            <p style={{ color: "rgba(255,255,255,0.65)", fontSize: 13, marginTop: 4, marginBottom: 0 }}>Explore Neurafit Nutrition supplements — power, strength, and performance in every scoop.</p>
          </div>
          <button
          onClick={()=>navigate("/products")}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
            style={{ padding: "11px 26px", background: "#EF9F27", color: "#412402", border: "none", borderRadius: 8, fontFamily: "inherit", fontSize: 14, fontWeight: 500, cursor: "pointer", transition: "opacity 0.15s", whiteSpace: "nowrap" }}>
            Shop Now →
          </button>
        </div>
      </div>

      {/* TOAST */}
      <div style={{ position: "fixed", bottom: 24, left: "50%", transform: `translateX(-50%) translateY(${toast ? 0 : 80}px)`, background: "#085041", color: "#9FE1CB", padding: "11px 22px", borderRadius: 30, fontSize: 13, fontWeight: 500, transition: "transform 0.3s cubic-bezier(.34,1.56,.64,1)", zIndex: 9999, pointerEvents: "none", whiteSpace: "nowrap" }}>
        ✓ Message sent! We'll get back to you soon.
      </div>
    </div>
  );
}
