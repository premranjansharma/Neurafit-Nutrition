import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const API_BASE = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

const timeline = [
  { num: "1", year: "2026 – The Discovery",       desc: "In Darbhanga, Bihar, the vision of Neurafit Nutrition was born with a mission to create powerful, result-driven supplements for modern fitness needs." },
  { num: "2", year: "2026 (Mid) – The Idea is Born", desc: "Recognizing the demand for clean and effective nutrition, we laid the foundation of Neurafit Nutrition focused on strength, energy, and performance." },
  { num: "3", year: "2026 – Product Dev.",         desc: "Through continuous research and testing, we developed high-quality formulations designed to boost stamina, focus, and overall performance." },
  { num: "4", year: "2026 (Mid) – Going Online",   desc: "Neurafit Nutrition launched its online presence, making premium supplements accessible across India with ease and reliability." },
  { num: "5", year: "2026 (Present)",              desc: "Now available online and offline, Neurafit Nutrition continues to grow with a vision to empower individuals to push limits and achieve peak performance." },
];

const values = [
  { icon: "🏆", title: "Quality Without Compromise", desc: "We use only premium grade ingredients and advanced formulations to deliver supplements that ensure purity, safety, and effective performance." },
  { icon: "💪", title: "Performance Focused",       desc: "Our products are designed to enhance strength, energy, and endurance, helping you push beyond limits and achieve your fitness goals." },
  { icon: "🔍", title: "Transparency",             desc: "We believe in complete honesty about our ingredients, formulations, and nutritional information, so you can fuel your body with confidence." },
];

const teamMembers = [
  {
    id: 1,
    name: "Ravi Prakash",
    role: "Founder & Vision Lead",
    image: "ravi.jpg",
    bio: "Drives strategy, innovation, and long-term brand vision for Neurafit Nutrition. Rishav combines business insight with a passion for fitness excellence, ensuring every decision aligns with the brand's mission to empower peak performance.",
    isFounder: true,
    founderTitle: "Ravi Prakash - Founder & Vision Lead of Neurafit Nutrition",
    founderDesc: "Ravi Prakash is the visionary founder of Neurafit Nutrition, passionate about creating premium supplements that truly deliver results. With strategic expertise and a deep commitment to fitness and performance, he leads the brand's innovation and growth.",
    founderQuote: "Neurafit Nutrition is about more than supplements—it's about building a community of champions who refuse to settle. We're here to fuel your strength, ignite your performance, and help you become the best version of yourself."
  },
  {
    id: 2,
    name: "Rishav",
    role: "Co-Founder & Operations Head",
    image: "rishav.jpg",
    bio: "Ensures smooth manufacturing, sourcing, and supply chain efficiency at Neurafit Nutrition. With extensive expertise in operations and logistics, Ravi guarantees that every product reaches you with the highest quality standards and reliability."
  },
  {
    id: 3,
    name: "Animesh",
    role: "Co-Founder & Marketing Lead",
    image: "animesh.jpg",
    bio: "Builds brand identity, customer engagement, and market presence for Neurafit Nutrition. Animesh crafts compelling stories and strategies that connect with our fitness community, turning passion into movement."
  }
];

// ✅ Helper: image URL banana
const getImageUrl = (image) => {
  if (!image) return null;
  if (image.startsWith("http")) return image;
  return `${API_BASE}/uploads/${image}`;
};

// ✅ Helper: fallback avatar
const getAvatarFallback = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&size=200&background=1a1a1a&color=fff`;

export default function About() {
  const [teamData]          = useState(teamMembers); // static data — API se nahi aa raha
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`${API_BASE}/api/content/about`)
      .then((res) => res.json())
      .then((data) => {
        setContent(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Content fetch error:", err);
        setLoading(false);
      });
  }, []);

  const getContent = (section) =>
    content.find((item) => item.section === section)?.text || "";

  return (
    <div className="about-page">

      {/* 1️⃣ HERO */}
      <div className="about-hero">
        <div className="about-hero__inner">
          <span className="about-tag">Our Story</span>
          <h1 className="about-hero__title">
            {getContent("hero") || "Fuel Your Strength, Ignite Your Performance"}
          </h1>
          <p className="about-hero__desc">
            {getContent("heroDesc") || "Premium supplements designed to elevate your fitness journey"}
          </p>
        </div>
      </div>

      {/* 2️⃣ ORIGIN STORY */}
      <div className="about-outer">
        <div className="about-section">
          <div className="about-story">
            <div className="about-story__text">
              <span className="about-label">Our Beginning</span>
              <h2>Where Strength Met Vision</h2>
              <p>{getContent("story1") || "Neurafit Nutrition was born from a passion for fitness and performance, combining business insight, fitness passion, and execution strength."}</p>
              <p>{getContent("story2") || "Three co-founders united by a singular vision: to create premium supplements that empower athletes and fitness enthusiasts to achieve their peak performance."}</p>
              <p>{getContent("story3") || "From strategy and innovation to seamless operations and powerful brand presence, together we're building more than a supplement brand—we're building a movement."}</p>
            </div>
            <div className="about-story__card">
              <div className="about-story__icon">🌾</div>
              <h3>Darbhanga, Bihar</h3>
              <p>Where it all began in 2026</p>
              <div className="about-story__divider" />
              <p className="about-story__quote">
                "Strategy + Operations + Marketing = Peak Performance"
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* 3️⃣ TEAM */}
      <div className="about-outer about-outer--cream">
        <div className="about-section">
          <div className="about-section__head">
            <h2>Meet Our Team</h2>
            <p>The visionaries behind Neurafit Nutrition who combine business insight, fitness passion, and execution strength.</p>
          </div>
          <div className="about-team-grid">
            {loading ? (
              <p>Loading team members...</p>
            ) : teamData.length > 0 ? (
              teamData.map((member) => (
                <div className="about-member" key={member.id}>
                  <div className="about-member__avatar-wrap">
                    <img
                      src={getImageUrl(member.image)}
                      alt={member.name}
                      className="about-member__photo"
                      onError={(e) => { e.target.src = getAvatarFallback(member.name); }}
                    />
                  </div>
                  <div className="about-member__info">
                    <h3>{member.name}</h3>
                    <span className="about-member__role">{member.role}</span>
                    <p>{member.bio}</p>
                  </div>
                </div>
              ))
            ) : (
              <p>No team members found</p>
            )}
          </div>
        </div>
      </div>

      {/* 4️⃣ FOUNDER QUOTE */}
      {teamData.length > 0 && (
        <div className="about-outer">
          <div className="about-section">
            <div className="about-founder">
              <div className="about-founder__left">
                <div className="about-founder__avatar-wrap">
                  <img
                    src={getImageUrl(teamData[0].image)}
                    alt={teamData[0].name}
                    className="about-founder__photo"
                    onError={(e) => { e.target.src = getAvatarFallback(teamData[0].name); }}
                  />
                </div>
                <div>
                  <strong>{teamData[0].name}</strong>
                  <span>{teamData[0].role}</span>
                </div>
              </div>
              <div className="about-founder__right">
                <span className="about-label">Our Founder</span>
                <h2>{teamData[0].founderTitle || `${teamData[0].name} - Founder & Vision Lead of Neurafit Nutrition`}</h2>
                <p>{teamData[0].founderDesc || `${teamData[0].name} is the visionary founder of Neurafit Nutrition, passionate about creating premium supplements that truly deliver results.`}</p>
                <blockquote className="about-blockquote">
                  "{teamData[0].founderQuote || "Neurafit Nutrition is about building a community of champions who refuse to settle."}"
                  <cite>— {teamData[0].name}, {teamData[0].role}</cite>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5️⃣ VALUES */}
      <div className="about-outer about-outer--cream">
        <div className="about-section">
          <div className="about-section__head">
            <h2>Our Values</h2>
          </div>
          <div className="about-values-grid">
            {values.map((v, i) => (
              <div className="about-value-card" key={i}>
                <div className="about-value-card__icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 6️⃣ QUALITY */}
      <div className="about-outer">
        <div className="about-section">
          <div className="about-quality">
            <div className="about-quality__left">
              <span className="about-label">Our Promise</span>
              <h2>Our Quality Commitment</h2>
              <p>We use only premium-grade ingredients and advanced formulations to deliver supplements that ensure purity, safety, and maximum performance results.</p>
              <p>Every product is designed to enhance energy, strength, and endurance, helping you push beyond limits and achieve your fitness goals.</p>
              <p>We believe in complete honesty about our ingredients, formulations, and nutritional values, so you can fuel your body with full confidence.</p>
              <Link to="/" className="about-btn about-btn--dark">Explore Our Products</Link>
            </div>
            <div className="about-quality__badges">
              <div className="about-badge">⚡ Performance Focused</div>
              <div className="about-badge">🚫 No Harmful Additives</div>
              <div className="about-badge">✅ Rigorous Quality Testing</div>
              <div className="about-badge">🏆 Premium Ingredients</div>
              <div className="about-badge">♻️ Safe & Clean Formulation</div>
              <div className="about-badge">💪 Built for Strength & Results</div>
            </div>
          </div>
        </div>
      </div>

      {/* 7️⃣ TIMELINE */}
      <div className="about-outer about-outer--cream">
        <div className="about-section">
          <div className="about-section__head">
            <h2>Our Journey</h2>
            <p>The milestones that have shaped Neurafit Nutrition into what it is today.</p>
          </div>
          <div className="about-timeline">
            {timeline.map((t, i) => (
              <div className="about-timeline__item" key={i}>
                <div className="about-timeline__num">{t.num}</div>
                <div className="about-timeline__content">
                  <h3>{t.year}</h3>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 8️⃣ SHOP */}
      <div className="about-outer">
        <div className="about-section">
          <div className="about-section__head">
            <h2>Shop Neurafit Nutrition</h2>
            <p>Our premium supplements are available on your favorite online marketplaces.</p>
          </div>
          <div className="about-platforms">
            <div className="about-platform-card">
              <div className="about-platform-card__logo about-platform-card__logo--flipkart">F</div>
              <h3>Flipkart</h3>
              <p>Shop our complete range of premium supplements with fast and reliable delivery options across India.</p>
              <a href="https://flipkart.com" target="_blank" rel="noopener noreferrer" className="about-btn about-btn--outline">
                Shop on Flipkart
              </a>
            </div>
            <div className="about-platform-card">
              <div className="about-platform-card__logo about-platform-card__logo--amazon">a</div>
              <h3>Amazon</h3>
              <p>Enjoy fast delivery with Neurafit Nutrition supplements, available on Amazon for quick and reliable access to premium performance products.</p>
              <a href="https://amazon.in" target="_blank" rel="noopener noreferrer" className="about-btn about-btn--outline">
                Shop on Amazon
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 9️⃣ CTA */}
      <div className="about-cta">
        <h2>Experience Neurafit Nutrition</h2>
        <p>Ready to elevate your performance? Explore our premium supplements and discover the perfect fuel to boost your strength, energy, and endurance.</p>
        <div className="about-cta__btns">
          <Link to="/" className="about-btn about-btn--white">Shop Now</Link>
          <Link to="/sales" className="about-btn about-btn--outline-white">Contact Us</Link>
        </div>
      </div>

    </div>
  );
}
