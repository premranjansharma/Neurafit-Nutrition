import React, { useState } from "react";

const posts = [
  {
    id: 1,
    date: "July 25, 2025",
    tag: "Pre Workout",
    title: "How Neurafit GodMode Boosts Workout Performance",
    desc: "Discover how Beta-Alanine, L-Arginine, Creatine HCL, and Caffeine work together to improve energy, endurance, focus, and muscle performance during workouts.",
    readTime: "4 min read",
  },
  {
    id: 2,
    date: "July 28, 2025",
    tag: "Nutrition",
    title: "Why Pre-Workout Supplements Improve Gym Performance",
    desc: "Learn how advanced pre-workout formulas help support stamina, mental focus, workout intensity, and better training efficiency for active lifestyles.",
    readTime: "5 min read",
  },
  {
    id: 3,
    date: "August 1, 2025",
    tag: "Fitness",
    title: "Benefits of Beta-Alanine & Creatine for Strength",
    desc: "Explore how Beta-Alanine and Creatine HCL help improve endurance, reduce fatigue, and support better workout performance during intense training.",
    readTime: "3 min read",
  },
  {
    id: 4,
    date: "August 5, 2025",
    tag: "Energy",
    title: "Caffeine & L-Tyrosine for Energy and Focus",
    desc: "Understand how caffeine and L-Tyrosine support mental alertness, concentration, and energy levels before and during workouts.",
    readTime: "4 min read",
  },
  {
    id: 5,
    date: "July 20, 2025",
    tag: "Wellness",
    title: "Why Athletes Use Neurafit GodMode",
    desc: "Find out why gym enthusiasts and athletes choose Neurafit GodMode for better energy, focus, muscle pump, and workout endurance.",
    readTime: "6 min read",
  },
];

const topics = [
  "All",
  "Pre Workout",
  "Nutrition",
  "Fitness",
  "Energy",
  "Wellness",
];

const tagColors = {
  "Pre Workout": { bg: "#e6f4ff", color: "#0066cc" },
  "Nutrition":   { bg: "#fef9e6", color: "#8a6a00" },
  "Fitness":     { bg: "#e6f4e6", color: "#2d5a27" },
  "Energy":      { bg: "#fdeaea", color: "#b83232" },
  "Wellness":    { bg: "#f4e6f4", color: "#7a2d7a" },
};

export default function Blog() {
  const [activeTag, setActiveTag] = useState("All");
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [expanded, setExpanded] = useState(null);

  const filtered =
    activeTag === "All"
      ? posts
      : posts.filter((p) => p.tag === activeTag);

  const handleSubscribe = () => {
    if (!email.includes("@")) return;
    setSubscribed(true);
  };

  return (
    <div className="blog-page">

      {/* HERO */}
      <div className="blog-hero">
        <div className="blog-hero__inner">
          <span className="blog-hero__tag">Neurafit Blog</span>

          <h1 className="blog-hero__title">
            Fitness, Energy & Performance Insights
          </h1>

          <p className="blog-hero__desc">
            Explore workout tips, supplement knowledge, fitness insights,
            and performance-focused nutrition guides from Neurafit Nutrition.
          </p>
        </div>
      </div>

      {/* TOPICS */}
      <div className="blog-topics-bar">
        <div className="blog-topics-inner">

          <span className="blog-topics-label">
            Explore Topics
          </span>

          <div className="blog-topics">
            {topics.map((t) => (
              <button
                key={t}
                className={`blog-topic-btn ${
                  activeTag === t ? "blog-topic-btn--active" : ""
                }`}
                onClick={() => setActiveTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* POSTS */}
      <div className="blog-outer">
        <div className="blog-section">

          {filtered.length === 0 ? (
            <div className="blog-empty">
              No posts in this category yet.
            </div>
          ) : (
            <div className="blog-grid">

              {filtered.map((post) => {
                const tagStyle =
                  tagColors[post.tag] || {
                    bg: "#e6f4e6",
                    color: "#2d5a27",
                  };

                const isOpen = expanded === post.id;

                return (
                  <div className="blog-card" key={post.id}>

                    <div className="blog-card__top">

                      <span
                        className="blog-card__tag"
                        style={{
                          background: tagStyle.bg,
                          color: tagStyle.color,
                        }}
                      >
                        {post.tag}
                      </span>

                      <span className="blog-card__read">
                        {post.readTime}
                      </span>
                    </div>

                    <p className="blog-card__date">
                      {post.date}
                    </p>

                    <h2 className="blog-card__title">
                      {post.title}
                    </h2>

                    <p className="blog-card__desc">
                      {post.desc}
                    </p>

                    {isOpen && (
                      <div className="blog-card__full">
                        <p>
                          This article explains everything about{" "}
                          <strong>
                            {post.title.toLowerCase()}
                          </strong>.
                          Learn how Neurafit GodMode supports
                          workout performance, energy, focus,
                          and fitness goals.
                        </p>
                      </div>
                    )}

                    <button
                      className="blog-card__btn"
                      onClick={() =>
                        setExpanded(isOpen ? null : post.id)
                      }
                    >
                      {isOpen
                        ? "Show Less ↑"
                        : "Read More →"}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* SUBSCRIBE */}
      <div className="blog-subscribe">
        <div className="blog-subscribe__inner">

          <div className="blog-subscribe__text">
            <h2>Subscribe for Updates</h2>

            <p>
              Stay updated with the latest fitness tips,
              supplement guides, and Neurafit Nutrition news.
            </p>
          </div>

          {subscribed ? (
            <div className="blog-subscribe__success">
              ✓ Subscribed Successfully!
            </div>
          ) : (
            <div className="blog-subscribe__form">

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
              />

              <button onClick={handleSubscribe}>
                Subscribe
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
