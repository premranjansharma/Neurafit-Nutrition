import { useEffect, useRef, useState } from "react";
import { useAuth } from "../pages/admin/AuthContext";

const features = [
  { icon: "♻️", title: "Clean & Safe Formulation", desc: "Crafted with carefully selected ingredients to ensure safety, purity, and effectiveness." },
  { icon: "🤝", title: "Trusted Sourcing",          desc: "We partner with reliable suppliers to ensure premium-quality raw materials for every product." },
  { icon: "🚫", title: "No Compromise Policy",      desc: "No unnecessary fillers or harmful additives — only performance-focused nutrition." },
  { icon: "⚡", title: "Advanced Manufacturing",    desc: "Modern processing techniques ensure consistency, quality, and reliability in every batch." },
];

const stats = [
  { num: "24/7",  label: "Quality Monitoring",    desc: "Continuous testing and assurance process" },
  { num: "100%",  label: "Controlled Production", desc: "Precision in formulation and packaging" },
  { num: "5+",    label: "Quality Checks",        desc: "At every stage of production" },
  { num: "99%",   label: "Accuracy",              desc: "In formulation and consistency" },
];

export default function CommitmentSection() {
  const { isAdmin } = useAuth();

  const [showEditModal, setShowEditModal] = useState(false);
  const [showImgModal,  setShowImgModal]  = useState(false);
  const [descText,      setDescText]      = useState(
    "We are committed to delivering high-quality supplements while maintaining responsible practices across sourcing, formulation, and packaging. Our mission is to support your fitness journey with products you can trust."
  );
  const [editBuf,    setEditBuf]    = useState("");
  const [hubImg,     setHubImg]     = useState(null);
  const [pendingImg, setPendingImg] = useState(null);

  const cardRefs = useRef([]);
  const statRefs = useRef([]);
  const hubRef   = useRef(null);

  useEffect(() => {
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(22px)";
      setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 150 + i * 100);
    });
    statRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = "0";
      el.style.transform = "translateY(16px)";
      setTimeout(() => { el.style.opacity = "1"; el.style.transform = "translateY(0)"; }, 500 + i * 100);
    });
    if (hubRef.current) {
      hubRef.current.style.opacity = "0";
      hubRef.current.style.transform = "translateY(18px)";
      setTimeout(() => { hubRef.current.style.opacity = "1"; hubRef.current.style.transform = "translateY(0)"; }, 900);
    }
  }, []);

  const handleImgChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setPendingImg(ev.target.result);
    reader.readAsDataURL(file);
  };

  return (
    <>
      <style>{`
        .cs-admin-bar{background:#0d0d0b;border-bottom:1px solid rgba(0,255,136,0.15);padding:10px 24px;display:flex;align-items:center;gap:12px;flex-wrap:wrap;position:sticky;top:0;z-index:100;}
        .cs-admin-label{font-size:11px;font-weight:700;color:#00ff88;letter-spacing:2px;text-transform:uppercase;}
        .cs-admin-btn{background:rgba(0,255,136,0.08);border:1px solid rgba(0,255,136,0.25);color:#00ff88;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;padding:6px 14px;border-radius:6px;cursor:pointer;transition:background 0.2s;}
        .cs-admin-btn:hover{background:rgba(0,255,136,0.18);}
        .cs-modal-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.82);display:flex;align-items:center;justify-content:center;z-index:200;}
        .cs-modal-box{background:#0d0d0b;border:1px solid rgba(0,255,136,0.3);border-radius:14px;padding:32px 28px;width:100%;max-width:460px;}
        .cs-modal-title{font-size:14px;font-weight:700;color:#00ff88;letter-spacing:2px;text-transform:uppercase;margin-bottom:18px;}
        .cs-modal-textarea{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(0,255,136,0.2);border-radius:8px;padding:12px;color:#fff;font-size:14px;line-height:1.7;min-height:120px;outline:none;resize:vertical;}
        .cs-modal-textarea:focus{border-color:rgba(0,255,136,0.5);}
        .cs-modal-actions{display:flex;gap:10px;margin-top:14px;}
        .cs-modal-save{background:linear-gradient(135deg,#00ff88,#00cc6a);color:#0a0a09;font-weight:800;font-size:12px;letter-spacing:1px;text-transform:uppercase;padding:10px 24px;border-radius:6px;border:none;cursor:pointer;}
        .cs-modal-cancel{background:transparent;border:1px solid rgba(255,255,255,0.15);color:rgba(255,255,255,0.4);font-size:12px;padding:10px 20px;border-radius:6px;cursor:pointer;}
        .cs-img-drop{border:2px dashed rgba(0,255,136,0.25);border-radius:10px;padding:32px 20px;text-align:center;cursor:pointer;transition:border-color 0.2s;margin-bottom:14px;}
        .cs-img-drop:hover{border-color:rgba(0,255,136,0.5);}
        .cs-img-preview{max-width:100%;border-radius:8px;margin-bottom:12px;}
        .commit-section{background: linear-gradient(160deg, #1d4707 0%, #01321a 60%, #1a0800 100%);padding:80px 24px;position:relative;overflow:hidden;font-family:'Segoe UI',sans-serif;}
        .commit-section::before{content:'';position:absolute;width:700px;height:700px;top:-200px;left:50%;transform:translateX(-50%);background:radial-gradient(circle,rgba(0,255,136,0.07) 0%,transparent 70%);border-radius:50%;pointer-events:none;}
        .commit-top{display:flex;align-items:flex-start;gap:48px;max-width:1000px;margin:0 auto 52px;flex-wrap:wrap;}
        .commit-left{flex:1;min-width:260px;text-align:left;}
        .commit-right{flex:1;min-width:260px;}
        .commit-badge{display:inline-block;background:rgba(0,255,136,0.10);border:1px solid rgba(0,255,136,0.28);color:#00ff88;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;padding:6px 18px;border-radius:20px;margin-bottom:18px;}
        .commit-title{font-size:clamp(1.8rem,4vw,2.8rem);font-weight:900;line-height:1.1;background:linear-gradient(135deg,#fff 30%,#00ff88 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;margin-bottom:18px;font-family:'Impact','Arial Black',sans-serif;text-transform:uppercase;letter-spacing:1px;}
        .commit-sub{color:rgba(255,255,255,0.4);font-size:14px;line-height:1.85;}
        .cs-edit-hint{display:inline-block;background:rgba(0,255,136,0.12);border:1px solid rgba(0,255,136,0.3);color:#00ff88;font-size:10px;padding:2px 8px;border-radius:4px;cursor:pointer;margin-left:8px;vertical-align:middle;}
        .commit-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;}
        .commit-card{background:rgba(255,255,255,0.02);border:1px solid rgba(0,255,136,0.08);border-radius:12px;padding:24px 20px;text-align:left;transition:opacity 0.5s,transform 0.5s,border-color 0.25s,background 0.25s;}
        .commit-card:hover{border-color:rgba(0,255,136,0.38);background:rgba(0,255,136,0.04);transform:translateY(-4px)!important;}
        .commit-card-icon{font-size:24px;margin-bottom:12px;display:block;}
        .commit-divider{width:34px;height:2px;background:linear-gradient(90deg,#00ff88,#00cc6a);border-radius:2px;margin-bottom:10px;}
        .commit-card-title{font-size:13px;font-weight:700;color:#fff;margin-bottom:6px;}
        .commit-card-desc{font-size:12px;color:rgba(255,255,255,0.36);line-height:1.7;}
        .commit-stats{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1px;max-width:1000px;margin:0 auto 44px;background:rgba(0,255,136,0.07);border:1px solid rgba(0,255,136,0.12);border-radius:14px;overflow:hidden;}
        .commit-stat{background:#0a0a09;padding:26px 18px;text-align:center;transition:opacity 0.5s,transform 0.5s,background 0.2s;}
        .commit-stat:hover{background:rgba(0,255,136,0.04);}
        .commit-stat-num{font-size:clamp(1.5rem,3.5vw,2.2rem);font-weight:900;background:linear-gradient(135deg,#00ff88,#00cc6a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-family:'Impact','Arial Black',sans-serif;margin-bottom:5px;}
        .commit-stat-label{font-size:12px;font-weight:700;color:#fff;margin-bottom:3px;}
        .commit-stat-desc{font-size:11px;color:rgba(255,255,255,0.3);line-height:1.5;}
        .commit-hub{max-width:1000px;margin:0 auto;background:rgba(255,255,255,0.02);border:1px solid rgba(0,255,136,0.14);border-radius:16px;padding:36px 32px;display:flex;align-items:center;gap:28px;flex-wrap:wrap;transition:opacity 0.6s,transform 0.6s;}
        .hub-img-area{width:100px;height:100px;border-radius:10px;background:rgba(0,255,136,0.05);border:1px dashed rgba(0,255,136,0.2);display:flex;align-items:center;justify-content:center;flex-shrink:0;overflow:hidden;transition:border-color 0.2s;}
        .hub-img-area.clickable{cursor:pointer;}
        .hub-img-area.clickable:hover{border-color:rgba(0,255,136,0.5);}
        .hub-placeholder{text-align:center;font-size:10px;color:rgba(0,255,136,0.4);letter-spacing:1px;}
        .hub-placeholder span{font-size:28px;display:block;margin-bottom:4px;}
        .commit-hub-text{flex:1;min-width:200px;text-align:left;}
        .commit-hub-title{font-size:17px;font-weight:900;background:linear-gradient(135deg,#fff,#00ff88);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-family:'Impact','Arial Black',sans-serif;text-transform:uppercase;letter-spacing:1px;margin-bottom:8px;}
        .commit-hub-desc{font-size:13px;color:rgba(255,255,255,0.38);line-height:1.75;}
        .commit-hub-badge{flex-shrink:0;background:linear-gradient(135deg,#00ff88,#00cc6a);color:#0a0a09;font-size:11px;font-weight:800;letter-spacing:2px;text-transform:uppercase;padding:10px 20px;border-radius:4px;}
      `}</style>

      {/* ADMIN BAR — sirf /admin se login hone par dikhega */}
      {isAdmin && (
        <div className="cs-admin-bar">
          <span className="cs-admin-label">⚙️ Admin — Commitment Section</span>
          <button className="cs-admin-btn"
            onClick={() => { setEditBuf(descText); setShowEditModal(true); }}>
            ✏️ Edit Text
          </button>
          <button className="cs-admin-btn" onClick={() => setShowImgModal(true)}>
            🖼️ Upload Image
          </button>
        </div>
      )}

      {/* EDIT TEXT MODAL */}
      {showEditModal && (
        <div className="cs-modal-overlay">
          <div className="cs-modal-box">
            <div className="cs-modal-title">✏️ Edit Description</div>
            <textarea className="cs-modal-textarea" value={editBuf}
              onChange={e => setEditBuf(e.target.value)} />
            <div className="cs-modal-actions">
              <button className="cs-modal-save"
                onClick={() => { setDescText(editBuf); setShowEditModal(false); }}>
                Save
              </button>
              <button className="cs-modal-cancel" onClick={() => setShowEditModal(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* IMAGE UPLOAD MODAL */}
      {showImgModal && (
        <div className="cs-modal-overlay">
          <div className="cs-modal-box">
            <div className="cs-modal-title">🖼️ Upload Facility Image</div>
            {pendingImg && <img className="cs-img-preview" src={pendingImg} alt="preview" />}
            <div className="cs-img-drop"
              onClick={() => document.getElementById("csFileInput").click()}>
              <div style={{ fontSize: 34 }}>📁</div>
              <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 13, marginTop: 8 }}>
                Click to upload<br />
                <span style={{ color: "rgba(0,255,136,0.5)", fontSize: 11 }}>PNG, JPG, WEBP</span>
              </p>
            </div>
            <input id="csFileInput" type="file" accept="image/*"
              style={{ display: "none" }} onChange={handleImgChange} />
            <div className="cs-modal-actions">
              <button className="cs-modal-save" onClick={() => {
                if (pendingImg) {
                  setHubImg(pendingImg);
                  setShowImgModal(false);
                  setPendingImg(null);
                }
              }}>Apply</button>
              <button className="cs-modal-cancel"
                onClick={() => { setShowImgModal(false); setPendingImg(null); }}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN SECTION */}
      <section className="commit-section">
        <div className="commit-top">

          {/* LEFT */}
          <div className="commit-left">
            <span className="commit-badge">💪 Our Commitment</span>
            <h2 className="commit-title">Performance &amp;<br />Responsibility</h2>
            <div className="commit-sub">
              {descText}
              {isAdmin && (
                <span className="cs-edit-hint"
                  onClick={() => { setEditBuf(descText); setShowEditModal(true); }}>
                  ✏️ Edit
                </span>
              )}
            </div>
          </div>

          {/* RIGHT */}
          <div className="commit-right">
            <div className="commit-grid">
              {features.map((f, i) => (
                <div key={i} className="commit-card"
                  ref={el => (cardRefs.current[i] = el)}>
                  <span className="commit-card-icon">{f.icon}</span>
                  <div className="commit-divider" />
                  <div className="commit-card-title">{f.title}</div>
                  <div className="commit-card-desc">{f.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* STATS */}
        <div className="commit-stats">
          {stats.map((s, i) => (
            <div key={i} className="commit-stat"
              ref={el => (statRefs.current[i] = el)}>
              <div className="commit-stat-num">{s.num}</div>
              <div className="commit-stat-label">{s.label}</div>
              <div className="commit-stat-desc">{s.desc}</div>
            </div>
          ))}
        </div>

        {/* INNOVATION HUB */}
        <div className="commit-hub" ref={hubRef}>
          <div className={`hub-img-area ${isAdmin ? "clickable" : ""}`}
            onClick={() => isAdmin && setShowImgModal(true)}
            title={isAdmin ? "Click to upload image" : ""}>
            {hubImg
              ? <img src={hubImg} alt="facility"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              : <div className="hub-placeholder">
                  <span>🏭</span>
                  {isAdmin ? "Upload" : "Innovation"}<br />
                  {isAdmin ? "Image" : "Hub"}
                </div>
            }
          </div>
          <div className="commit-hub-text">
            <div className="commit-hub-title">Innovation Hub</div>
            <div className="commit-hub-desc">
              Our advanced facility combines modern technology with expert formulation
              to deliver high-performance supplements that meet the highest quality standards.
            </div>
          </div>
          <div className="commit-hub-badge">Our Facility</div>
        </div>
      </section>
    </>
  );
}
