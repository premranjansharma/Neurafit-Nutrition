import { Link } from "react-router-dom";
import { useEffect, useRef } from "react";

const features = [
  {
    icon: "⚡",
    title: "High Energy Boost",
    desc: "Enhances stamina and reduces fatigue for intense workouts.",
  },
  {
    icon: "🧠",
    title: "Mental Focus",
    desc: "Improves concentration and keeps you sharp during training.",
  },
  {
    icon: "💪",
    title: "Muscle Recovery",
    desc: "Supports faster recovery and reduces muscle soreness.",
  },
  {
    icon: "🔥",
    title: "Performance & Endurance",
    desc: "Boosts strength and helps you push beyond your limits.",
  },
];

export default function PerformanceSection() {
  const cardRefs = useRef([]);

  useEffect(() => {
    cardRefs.current.forEach((card, i) => {
      if (!card) return;
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      const timer = setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, 200 + i * 120);
      return () => clearTimeout(timer);
    });
  }, []);

  return (
    <>
      <style>{`
        .perf-section {
          background: linear-gradient(160deg, #1d4707 0%, #01321a 60%, #024f0d 100%);;
          padding: 80px 24px;
          text-align: center;
          position: relative;
          overflow: hidden;
          font-family: 'Segoe UI', sans-serif;
        }
        .perf-section::before {
          content: '';
          position: absolute;
          width: 600px; height: 600px;
          top: -200px; left: 50%;
          transform: translateX(-50%);
          background: radial-gradient(circle, rgba(255,100,0,0.12) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }
        .perf-badge {
          display: inline-block;
          background: rgba(255,140,0,0.12);
          border: 1px solid rgba(255,140,0,0.3);
          color: #ff8c00;
          font-size: 11px; font-weight: 700;
          letter-spacing: 3px; text-transform: uppercase;
          padding: 6px 18px; border-radius: 20px;
          margin-bottom: 20px;
        }
        .perf-title {
          font-size: clamp(2rem, 5vw, 3.2rem);
          font-weight: 900; line-height: 1.1;
          background: linear-gradient(135deg, #fff 30%, #ffb700 70%, #ff4500 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 16px;
          font-family: 'Impact', 'Arial Black', sans-serif;
          text-transform: uppercase; letter-spacing: 1px;
        }
        .perf-sub {
          color: rgba(255,255,255,0.42);
          font-size: 15px; line-height: 1.8;
          max-width: 520px; margin: 0 auto 56px;
        }
        .perf-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 20px;
          max-width: 960px;
          margin: 0 auto 52px;
        }
        .perf-card {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,140,0,0.12);
          border-radius: 12px;
          padding: 28px 24px;
          text-align: left;
          transition: opacity 0.5s ease, transform 0.5s ease,
                      border-color 0.25s, background 0.25s;
        }
        .perf-card:hover {
          border-color: rgba(255,140,0,0.45);
          background: rgba(255,100,0,0.06);
          transform: translateY(-4px) !important;
        }
        .perf-card-icon {
          font-size: 28px; margin-bottom: 14px; display: block;
        }
        .perf-divider {
          width: 48px; height: 2px;
          background: linear-gradient(90deg, #ff8c00, #ff4500);
          border-radius: 2px; margin: 12px 0;
        }
        .perf-card-title {
          font-size: 15px; font-weight: 700;
          color: #fff; margin-bottom: 8px; letter-spacing: 0.3px;
        }
        .perf-card-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.42);
          line-height: 1.7;
        }
        .perf-cta-wrap {
          display: flex; flex-direction: column;
          align-items: center; gap: 14px;
        }
        .perf-btn {
          display: inline-block;
          background: linear-gradient(135deg, #ff8c00, #ff4500);
          color: #fff; text-decoration: none;
          font-weight: 700; font-size: 13px;
          letter-spacing: 2px; text-transform: uppercase;
          padding: 14px 40px; border-radius: 4px;
          box-shadow: 0 0 28px rgba(255,100,0,0.35);
          transition: transform 0.18s, box-shadow 0.18s;
        }
        .perf-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 0 44px rgba(255,100,0,0.55);
        }
        .perf-cta-sub {
          color: rgba(255,255,255,0.3);
          font-size: 12px; letter-spacing: 1.5px;
          text-transform: uppercase;
        }
      `}</style>

      <section className="perf-section">
        <span className="perf-badge">💪 Health &amp; Performance</span>
        <h2 className="perf-title">
          Supercharge Your<br />Performance
        </h2>
        <p className="perf-sub">
          IronFuel supplements are formulated with powerful, science-backed
          ingredients that support energy, strength, and overall fitness performance.
        </p>

        <div className="perf-grid">
          {features.map((f, i) => (
            <div
              key={i}
              className="perf-card"
              ref={el => (cardRefs.current[i] = el)}
            >
              <span className="perf-card-icon">{f.icon}</span>
              <div className="perf-divider" />
              <div className="perf-card-title">{f.title}</div>
              <div className="perf-card-desc">{f.desc}</div>
            </div>
          ))}
        </div>

        <div className="perf-cta-wrap">
          <Link to="/products" className="perf-btn">
            ➡️ Explore Performance Benefits
          </Link>
          <span className="perf-cta-sub">
            Discover the Power of IronFuel Nutrition
          </span>
        </div>
      </section>
    </>
  );
}
