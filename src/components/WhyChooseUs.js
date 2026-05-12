import { useEffect, useRef } from "react";

const reasons = [
  {
    icon: "🏆",
    title: "Premium Quality",
    desc: "We use high-grade ingredients to ensure purity, safety, and effective performance in every product.",
  },
  {
    icon: "🔬",
    title: "Rigorous Testing",
    desc: "Strict quality checks at every stage guarantee reliable and consistent results you can trust.",
  },
  {
    icon: "⚡",
    title: "Science-Backed Formulation",
    desc: "Our supplements are designed using proven ingredients to enhance strength, energy, and endurance.",
  },
  {
    icon: "🚫",
    title: "No Harmful Additives",
    desc: "Clean formulations with no unnecessary fillers, ensuring safe and effective supplementation.",
  },
  {
    icon: "📦",
    title: "Secure Packaging",
    desc: "Advanced packaging keeps products fresh, safe, and effective for longer use.",
  },
  {
    icon: "💝",
    title: "Customer First",
    desc: "We prioritize customer satisfaction with reliable support and a seamless shopping experience.",
  },
];

export default function WhyChooseUs() {
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      card.style.opacity = "0";
      card.style.transform = "translateY(28px)";
      const t = setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 150 + i * 100);
      return () => clearTimeout(t);
    });
  }, []);

  return (
    <>
      <style>{`
        .why-section {
          background: linear-gradient(160deg, #1c4506 0%, #01321a 60%, #095e15 100%);
          padding: 80px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
          font-family: 'Segoe UI', sans-serif;
        }
        .why-section::before {
          content: '';
          position: absolute;
          width: 700px; height: 700px;
          top: -250px; left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(circle, rgba(255,100,0,0.10) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .why-badge {
          display: inline-block;
          background: rgba(255,140,0,0.12);
          border: 1px solid rgba(255,140,0,0.3);
          color: #047c20;
          font-size: 11px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          padding: 6px 18px; border-radius: 20px;
          margin-bottom: 20px;
        }
        .why-title {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 900; line-height: 1.1;
          background: linear-gradient(135deg, #fff 30%, #00ff3c 70%, #22ff00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 48px;
          font-family: 'Impact', 'Arial Black', sans-serif;
          text-transform: uppercase; letter-spacing: 1px;
        }
        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 20px;
          max-width: 1000px;
          margin: 0 auto;
        }
        .why-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,140,0,0.10);
          border-radius: 14px;
          padding: 32px 26px;
          text-align: left;
          transition: opacity 0.5s ease, transform 0.5s ease,
                      border-color 0.25s, background 0.25s;
        }
        .why-card:hover {
          border-color: rgba(255,140,0,0.42);
          background: rgba(255,100,0,0.05);
          transform: translateY(-4px) !important;
        }
        .why-icon {
          font-size: 30px; margin-bottom: 16px; display: block;
        }
        .why-divider {
          width: 40px; height: 2px;
          background: linear-gradient(90deg, #ff8c00, #ff4500);
          border-radius: 2px; margin-bottom: 14px;
        }
        .why-card-title {
          font-size: 15px; font-weight: 700;
          color: #fff; margin-bottom: 10px; letter-spacing: 0.3px;
        }
        .why-card-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.40);
          line-height: 1.75;
        }
      `}</style>

      <section className="why-section">
        <span className="why-badge">💪 Why Neurafit Nutrition</span>
        <h2 className="why-title">Why Choose Us</h2>

        <div className="why-grid">
          {reasons.map((r, i) => (
            <div
              key={i}
              className="why-card"
              ref={(el) => (cardRefs.current[i] = el)}
            >
              <span className="why-icon">{r.icon}</span>
              <div className="why-divider" />
              <div className="why-card-title">{r.title}</div>
              <div className="why-card-desc">{r.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
