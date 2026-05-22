import React, { useState } from "react";

const faqs = [
  {
    q: "Is Neurafit GodMode a pre-workout supplement?",
    a: "Yes, it is specially designed as a pre-workout supplement to support energy, focus, stamina, and workout performance."
  },
  {
    q: "When should I consume Neurafit GodMode?",
    a: "It is generally recommended to consume it before workout sessions for better performance support."
  },
  {
    q: "Is it suitable for beginners?",
    a: "Due to its high stimulant content, beginners should consult a professional before use."
  },
  {
    q: "Can it help improve workout performance?",
    a: "Yes, ingredients like Beta-Alanine, Creatine HCL, and L-Arginine are commonly used to support workout performance and endurance."
  }
];

const nutrients = [
  { name: "Energy",            value: "21 kcal",  pct: 1,   color: "#2d5a27" },
  { name: "Beta-Alanine",      value: "2600mg",   pct: 0,   color: "#3a7a32" },
  { name: "L-Arginine",        value: "1000mg",   pct: 0,   color: "#4a9a40" },
  { name: "Creatine HCL",      value: "500mg",    pct: 0,   color: "#5ab050" },
  { name: "L-Tyrosine",        value: "500mg",    pct: 0,   color: "#2d5a27" },
  { name: "Caffeine",          value: "250mg",    pct: 0,   color: "#3a7a32" },
  { name: "Green Tea Extract", value: "150mg",    pct: 0,   color: "#4a9a40" },
  { name: "L-Citrulline",      value: "1694mg",   pct: 0,   color: "#5ab050" },
  { name: "Niacin (Vit B3)",   value: "15mg",     pct: 94,  color: "#2d5a27" },
  { name: "Carbohydrates",     value: "0.26g",    pct: 0,   color: "#3a7a32" },
  { name: "Protein",           value: "0g",       pct: 0,   color: "#4a9a40" },
  { name: "Sugar",             value: "0g",       pct: 0,   color: "#5ab050" },
];

const benefits = [
  {
    icon: "⚡",
    title: "Instant Energy Boost",
    desc: "Provides powerful workout energy with caffeine and performance-enhancing ingredients to help you train harder and longer."
  },
  {
    icon: "🧠",
    title: "Enhanced Focus",
    desc: "L-Tyrosine and caffeine help improve concentration, alertness, and mental performance during workouts."
  },
  {
    icon: "💪",
    title: "Muscle Performance",
    desc: "Beta-Alanine and Creatine HCL support strength, endurance, and workout intensity."
  },
  {
    icon: "🔥",
    title: "Better Muscle Pump",
    desc: "L-Arginine and L-Citrulline help improve blood flow and nitric oxide production for enhanced muscle pump."
  },
  {
    icon: "🏃",
    title: "Workout Endurance",
    desc: "Helps reduce muscle fatigue and supports longer, more effective training sessions."
  },
  {
    icon: "🛡️",
    title: "Antioxidant Support",
    desc: "Green Tea Extract provides antioxidants that help reduce oxidative stress during intense workouts."
  },
  {
    icon: "⚖️",
    title: "Weight Management",
    desc: "Low-calorie and sugar-free formula suitable for fitness and body composition goals."
  },
  {
    icon: "🚀",
    title: "Performance Optimization",
    desc: "Designed to improve overall training efficiency, stamina, and physical performance."
  },
];

const didYouKnow = [
  "Beta-Alanine helps reduce muscle fatigue and supports high-intensity workout performance.",
  
  "L-Arginine and L-Citrulline help improve nitric oxide production for better blood flow and muscle pump.",
  
  "Creatine HCL is commonly used to support strength, power output, and workout endurance.",
  
  "Caffeine helps improve energy, focus, and alertness during training sessions.",
  
  "Green Tea Extract contains antioxidants that help support metabolism and recovery.",
  
  "Neurafit GodMode is a sugar-free pre-workout formula designed for fitness-focused individuals.",
  
  "L-Tyrosine helps support mental focus and concentration during intense workouts.",
  
  "Made in India with advanced performance-support ingredients for gym and fitness enthusiasts.",
];

const howTo = [
  {
    icon: "⚡",
    title: "Pre-Workout Energy",
    desc: "Mix 1 scoop of Neurafit GodMode with 220–250 ml of cold water before your workout session."
  },
  {
    icon: "🏋️",
    title: "Gym Performance",
    desc: "Consume 20–30 minutes before exercise to support energy, focus, endurance, and workout intensity."
  },
  {
    icon: "💧",
    title: "Stay Hydrated",
    desc: "Drink enough water throughout the day while using pre-workout supplements for better performance support."
  },
];

export default function HealthBenefits() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="hb-page">

     {/* HERO */}
<div className="hb-hero">
  <div className="hb-hero__inner">
    <span className="hb-tag">Performance & Nutrition</span>

    <h1 className="hb-hero__title">
      Health Benefits of Neurafit GodMode
    </h1>

    <p className="hb-hero__desc">
      Neurafit GodMode is designed to fuel your workouts with advanced energy,
      focus, endurance, and performance-support ingredients. It helps improve
      workout intensity, stamina, muscle pump, and mental focus so you can
      perform at your best during every training session.
    </p>

    <a href="/products" className="hb-btn hb-btn--light">
      Try Our Advanced Pre-Workout
    </a>
  </div>
</div>

{/* WHAT IS NEURAFIT GODMODE */}
<div className="hb-outer">
  <div className="hb-section">
    <div className="hb-two-col">
      <div>
        <h2 className="hb-section__title">
          What is Neurafit GodMode?
        </h2>

        <p className="hb-text">
          Neurafit GodMode is a high-performance pre-workout supplement created
          for gym enthusiasts, athletes, and fitness-focused individuals who
          want enhanced energy, stamina, and focus during workouts.
          <br /><br />
          It combines powerful ingredients like Beta-Alanine, L-Arginine,
          Creatine HCL, L-Citrulline, Caffeine, and L-Tyrosine to support
          workout intensity, muscle endurance, blood flow, and mental alertness.
          <br /><br />
          Overall, Neurafit GodMode helps improve training performance, energy
          levels, focus, and overall workout efficiency.
        </p>
      </div>

      <div className="hb-didyouknow">
        <h3 className="hb-didyouknow__title">
          💡 Did You Know?
        </h3>

        <ul className="hb-didyouknow__list">
          {didYouKnow.map((fact, i) => (
            <li key={i}>{fact}</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</div>

{/* KEY BENEFITS */}
<div className="hb-outer hb-outer--cream">
  <div className="hb-section">
    <div className="hb-section__head">
      <h2>Key Health & Performance Benefits</h2>

      <p>
        Neurafit GodMode is not just a supplement — it is a complete
        performance-support formula designed to fuel your workouts and maximize
        training efficiency.
      </p>
    </div>

    <div className="hb-benefits-grid">
      {benefits.map((b, i) => (
        <div className="hb-benefit-card" key={i}>
          <div className="hb-benefit-card__icon">{b.icon}</div>
          <h3>{b.title}</h3>
          <p>{b.desc}</p>
        </div>
      ))}
    </div>
  </div>
</div>

{/* NUTRITIONAL PROFILE */}
<div className="hb-outer">
  <div className="hb-section">
    <div className="hb-section__head">
      <h2>Nutritional Profile</h2>

      <p>
        Here’s what you get in one serving (6.5g scoop approx.) of
        Neurafit GodMode.
      </p>
    </div>

    <div className="hb-nutrition-wrap">
      <div className="hb-nutrition-card">

        <div className="hb-nutrition-card__header">
          <h3>Supplement Facts</h3>
          <span>Per Serving (6.5g)</span>
        </div>

        <div className="hb-nutrients">
          {nutrients.map((n, i) => (
            <div className="hb-nutrient" key={i}>
              <div className="hb-nutrient__top">
                <span className="hb-nutrient__name">{n.name}</span>
                <span className="hb-nutrient__value">{n.value}</span>
                <span className="hb-nutrient__pct">{n.pct}%</span>
              </div>

              <div className="hb-nutrient__bar">
                <div
                  className="hb-nutrient__fill"
                  style={{
                    width: `${n.pct}%`,
                    background: n.color,
                  }}
                />
              </div>
            </div>
          ))}
        </div>

        <p className="hb-nutrition-note">
          * Percent Daily Values are based on a 2,000 calorie diet.
        </p>
      </div>

      <div className="hb-extra-benefits">
        <h3>Additional Supplement Benefits</h3>

        <ul>
          <li>✓ Supports workout intensity and endurance</li>
          <li>✓ Helps improve energy and mental focus</li>
          <li>✓ Sugar-free performance formula</li>
          <li>✓ Contains antioxidant-rich Green Tea Extract</li>
          <li>✓ Helps support blood circulation and muscle pump</li>
          <li>✓ Designed for active and fitness-focused lifestyles</li>
        </ul>
      </div>
    </div>
  </div>
</div>

{/* HOW TO USE */}
<div className="hb-outer hb-outer--cream">
  <div className="hb-section">

    <div className="hb-section__head">
      <h2>How to Use Neurafit GodMode</h2>

      <p>
        Simple and effective ways to maximize your workout performance.
      </p>
    </div>

    <div className="hb-howto-grid">
      {howTo.map((h, i) => (
        <div className="hb-howto-card" key={i}>
          <div className="hb-howto-card__icon">{h.icon}</div>
          <h3>{h.title}</h3>
          <p>{h.desc}</p>
        </div>
      ))}
    </div>
  </div>
</div>

{/* EXPERT OPINION */}
<div className="hb-outer">
  <div className="hb-section">

    <div className="hb-expert">

      <div className="hb-expert__quote">"</div>

      <p className="hb-expert__text">
        Neurafit GodMode combines performance-focused ingredients that support
        energy, endurance, and mental focus during intense workouts.
        Its advanced pre-workout formula is designed for individuals who want
        better training performance without compromising workout efficiency.
      </p>

      <div className="hb-expert__author">
        <div className="hb-expert__avatar">NF</div>

        <div>
          <strong>Xtyle</strong>
          <span>Fitness & Wellness Expert</span>
        </div>
      </div>
    </div>
  </div>
</div>

{/* FAQ */}
<div className="hb-outer hb-outer--cream">
  <div className="hb-section">

    <div className="hb-section__head">
      <h2>Frequently Asked Questions</h2>
    </div>

    <div className="hb-faqs">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className={`hb-faq ${openFaq === i ? "hb-faq--open" : ""}`}
        >
          <button
            className="hb-faq__q"
            onClick={() => setOpenFaq(openFaq === i ? null : i)}
          >
            {faq.q}

            <span className="hb-faq__arrow">
              {openFaq === i ? "▲" : "▼"}
            </span>
          </button>

          {openFaq === i && (
            <p className="hb-faq__a">{faq.a}</p>
          )}
        </div>
      ))}
    </div>
  </div>
</div>

{/* CTA */}
<div className="hb-cta">

  <h2>Experience the Power of Neurafit GodMode</h2>

  <p>
    Ready to take your workouts to the next level?
    Fuel your training sessions with advanced energy, focus,
    and performance support from Neurafit GodMode.
  </p>

  <div className="hb-cta__btns">
    <a href="/products" className="hb-btn hb-btn--white">
      Shop Now
    </a>

    <a href="/sales" className="hb-btn hb-btn--outline-white">
      Ask Us Questions
    </a>
  </div>
</div>

  </div>
  );
}
