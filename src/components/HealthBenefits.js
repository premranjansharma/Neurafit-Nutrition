import React, { useState } from "react";

const faqs = [
  {
    q: "Are makhana and lotus seeds the same thing?",
    a: "Yes, makhana is the common name for lotus seeds or fox nuts. They come from the Euryale ferox plant, which is related to but different from the lotus plant (Nelumbo nucifera)."
  },
  {
    q: "Is makhana suitable for all diets?",
    a: "Makhana is naturally gluten-free, vegan, and low in fat, making it suitable for most dietary restrictions. It's also low on the glycemic index, making it appropriate for those monitoring blood sugar levels."
  },
  {
    q: "How is makhana different from popcorn?",
    a: "While both are light and crunchy snacks, makhana has a higher protein content, lower calories, and more minerals than popcorn. Makhana also doesn't have the tough hulls that can get caught in teeth."
  },
  {
    q: "Can children eat makhana?",
    a: "Yes, makhana is an excellent snack for children. It's nutritious, easy to digest, and the soft texture makes it appropriate even for younger children. Always supervise young children while eating any snack to prevent choking."
  }
];

const nutrients = [
  { name: "Protein",    value: "9.7g",  pct: 19, color: "#2d5a27" },
  { name: "Fiber",      value: "14.5g", pct: 58, color: "#3a7a32" },
  { name: "Calcium",    value: "84mg",  pct: 8,  color: "#4a9a40" },
  { name: "Iron",       value: "1.4mg", pct: 7,  color: "#5ab050" },
  { name: "Magnesium",  value: "67mg",  pct: 16, color: "#2d5a27" },
  { name: "Potassium",  value: "332mg", pct: 7,  color: "#3a7a32" },
  { name: "Zinc",       value: "0.8mg", pct: 5,  color: "#4a9a40" },
  { name: "Phosphorus", value: "289mg", pct: 29, color: "#5ab050" },
];

const benefits = [
  { icon: "❤️", title: "Heart Health",        desc: " contains magnesium which helps maintain heart rhythm and potassium that helps regulate blood pressure." },
  { icon: "🧠", title: "Brain Function",      desc: "Rich in thiamine which helps convert carbohydrates into energy, supporting proper brain and nervous system function." },
  { icon: "📉", title: "Low Glycemic Index",  desc: "Makhana has a low glycemic index, making it a suitable snack for those monitoring blood sugar levels." },
  { icon: "⚖️", title: "Weight Management",  desc: "High in protein and fiber while being low in calories, making it perfect for weight-conscious individuals." },
  { icon: "🌿", title: "Digestive Health",    desc: "The fiber content in makhana aids digestion and helps maintain gut health." },
  { icon: "🛡️", title: "Anti-inflammatory",  desc: "Contains antioxidants that help reduce inflammation and fight oxidative stress in the body." },
  { icon: "😴", title: "Better Sleep",        desc: "Contains magnesium which can help improve sleep quality by promoting relaxation." },
  { icon: "🪔", title: "Ayurvedic Significance", desc: "Traditionally used in Ayurvedic medicine for its cooling properties and health benefits." },
];

const didYouKnow = [
  "Makhana is one of the few plant foods that is a complete protein, containing all nine essential amino acids.",
  "In traditional Ayurveda, makhana is considered a sattvic food, promoting clarity, balance, and purity.",
  "Makhana cultivation is primarily done by small-scale farmers in Bihar, India, providing livelihood for thousands of families.",
  "Unlike many other nuts and seeds, makhana is naturally low in sodium and fat, ideal for various dietary needs.",
];

const howTo = [
  { icon: "🌅", title: "Morning Boost",  desc: "Add crushed makhana to your morning smoothie bowl or yogurt for extra protein and a satisfying crunch." },
  { icon: "🥣", title: "Soup Topper",    desc: "Use plain roasted makhana as a healthy alternative to croutons in soups and salads." },
  { icon: "🥜", title: "Trail Mix",      desc: "Create your own trail mix by combining makhana with dried fruits, nuts, and seeds for an energy-packed snack." },
];

export default function HealthBenefits() {
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="hb-page">

      {/* HERO */}
      <div className="hb-hero">
        <div className="hb-hero__inner">
          <span className="hb-tag">Health & Nutrition</span>
          <h1 className="hb-hero__title">Health Benefits of IronFuel Nutrition</h1>
          <p className="hb-hero__desc">
            IronFuel Nutrition is all about giving your body the right energy, strength, and balance it needs every day. It focuses on nutrient-rich foods that help improve stamina, support blood health, and keep you active throughout the day.
          </p>
          <a href="/products" className="hb-btn hb-btn--light">Try Our Healthy Nutritions </a>
        </div>
      </div>

      {/* WHAT IS IronFuel Nutrition */}
      <div className="hb-outer">
        <div className="hb-section">
          <div className="hb-two-col">
            <div>
              <h2 className="hb-section__title">What is IronFuel Nutrition?</h2>
              <p className="hb-text">
                IronFuel Nutrition is all about giving your body the right fuel to stay active and healthy.
                It focuses on iron-rich and balanced foods that help improve energy and stamina.
                This type of nutrition supports healthy blood and proper oxygen flow in the body.
                It also helps reduce tiredness and keeps you strong throughout the day.
                Overall, IronFuel Nutrition promotes better performance and a healthier lifestyle.
              </p>
            </div>
            <div className="hb-didyouknow">
              <h3 className="hb-didyouknow__title">💡 Did You Know?</h3>
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
            <h2>Key Health Benefits</h2>
            <p>IronFuel Nutrition is not just about food—it’s about fueling your body with the right nutrients for better energy, strength, and overall health.</p>
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
            <p>Here's what you get in a 100g serving of makhana.</p>
          </div>
          <div className="hb-nutrition-wrap">
            <div className="hb-nutrition-card">
              <div className="hb-nutrition-card__header">
                <h3>Nutritional Facts</h3>
                <span>Per 100g serving</span>
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
                        style={{ width: `${n.pct}%`, background: n.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
              <p className="hb-nutrition-note">* Percent Daily Values are based on a 2,000 calorie diet.</p>
            </div>

            <div className="hb-extra-benefits">
              <h3>Additional Nutritional Benefits</h3>
              <ul>
                <li>✓ Flavonoids and antioxidants that help combat oxidative stress</li>
                <li>✓ Low glycemic index, suitable for those with diabetes</li>
                <li>✓ Naturally gluten-free and suitable for celiac disease</li>
                <li>✓ Very low sodium content, ideal for monitoring salt intake</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* HOW TO INCORPORATE */}
      <div className="hb-outer hb-outer--cream">
        <div className="hb-section">
          <div className="hb-section__head">
            <h2>How to Incorporate Makhana</h2>
            <p>Creative ways to add makhana into your daily diet.</p>
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
              Makhana stands out among snack foods for its exceptional nutritional profile.
              Rich in protein, low in fat, and containing essential minerals, it's one of
              the few snacks I wholeheartedly recommend to patients looking for healthier
              alternatives that don't compromise on taste or satisfaction.
            </p>
            <div className="hb-expert__author">
              <div className="hb-expert__avatar">AS</div>
              <div>
                <strong>xtyle</strong>
                <span>Nutritionist & Wellness Expert</span>
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
                  <span className="hb-faq__arrow">{openFaq === i ? "▲" : "▼"}</span>
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
        <h2>Experience the Goodness of IronFuel Nutrition</h2>
        <p>
          Ready to add this nutritional powerhouse to your snacking routine?
          Explore our range of delicious, premium makhana snacks.
        </p>
        <div className="hb-cta__btns">
          <a href="/products" className="hb-btn hb-btn--white">Shop Now</a>
          <a href="/sales" className="hb-btn hb-btn--outline-white">Ask Us Questions</a>
        </div>
      </div>

    </div>
  );
}