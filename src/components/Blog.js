import React, { useState } from "react";

const posts = [
  {
    id: 1,
    date: "July 25, 2025",
    tag: "Health Benefits",
    title: "Best Time to Eat Makhana for Weight Loss",
    desc: "Want to lose weight without giving up snacks? Learn when to eat makhana to burn more fat, stay full longer, and reduce cravings the healthy way.",
    readTime: "4 min read",
  },
  {
    id: 2,
    date: "July 28, 2025",
    tag: "Nutrition",
    title: "Flavored Makhana: Tasty Doesn't Have to Be Unhealthy",
    desc: "Think healthy snacks can't be tasty? Think again. Discover how flavored makhana delivers crunch and bold flavors — without preservatives, frying, or guilt.",
    readTime: "5 min read",
  },
  {
    id: 3,
    date: "August 1, 2025",
    tag: "Wellness",
    title: "Why Makhana Is the Perfect Fasting Snack",
    desc: "Fasting during Navratri or Ekadashi? Discover why roasted makhana is the best snack to stay energized, light, and sattvic — without breaking your fast.",
    readTime: "3 min read",
  },
  {
    id: 4,
    date: "August 5, 2025",
    tag: "Recipes",
    title: "Is Makhana Good for Kids? Let's Find Out",
    desc: "Looking for a healthy school snack for your kids? Discover why roasted makhana is one of the safest, crunchiest, and most nutritious options for children of all ages.",
    readTime: "4 min read",
  },
  {
    id: 5,
    date: "July 20, 2025",
    tag: "Nutrition",
    title: "Makhana vs Popcorn: Which Snack Is Healthier?",
    desc: "Can't decide between makhana and popcorn? Here's a clear breakdown of which snack is better for weight loss, digestion, energy, and long-term health.",
    readTime: "6 min read",
  },
];

const topics = [
  "All", "Health Benefits", "Recipes", "Nutrition",
  "Sustainable Farming", "Product Insights", "Wellness", "Indian Culture"
];

const tagColors = {
  "Health Benefits":    { bg: "#e6f4e6", color: "#2d5a27" },
  "Nutrition":          { bg: "#fef9e6", color: "#8a6a00" },
  "Wellness":           { bg: "#e6f0fb", color: "#1a5fa5" },
  "Recipes":            { bg: "#fdeaea", color: "#b83232" },
  "Sustainable Farming":{ bg: "#e6f4e6", color: "#2d5a27" },
  "Product Insights":   { bg: "#f4e6f4", color: "#7a2d7a" },
  "Indian Culture":     { bg: "#fff3e6", color: "#a05a00" },
};

export default function Blog() {
  const [activeTag, setActiveTag]   = useState("All");
  const [email, setEmail]           = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [expanded, setExpanded]     = useState(null);

  const filtered = activeTag === "All"
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
          <span className="blog-hero__tag">Our Blog</span>
          <h1 className="blog-hero__title">Discover Insights & Stories</h1>
          <p className="blog-hero__desc">
            Recipes, health tips, and stories from the world of makhana
            and healthy snacking.
          </p>
        </div>
      </div>

      {/* TOPICS FILTER */}
      <div className="blog-topics-bar">
        <div className="blog-topics-inner">
          <span className="blog-topics-label">Explore Topics</span>
          <div className="blog-topics">
            {topics.map((t) => (
              <button
                key={t}
                className={`blog-topic-btn ${activeTag === t ? "blog-topic-btn--active" : ""}`}
                onClick={() => setActiveTag(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* POSTS GRID */}
      <div className="blog-outer">
        <div className="blog-section">

          {filtered.length === 0 ? (
            <div className="blog-empty">No posts in this category yet.</div>
          ) : (
            <div className="blog-grid">
              {filtered.map((post) => {
                const tagStyle = tagColors[post.tag] || { bg: "#e6f4e6", color: "#2d5a27" };
                const isOpen = expanded === post.id;
                return (
                  <div className="blog-card" key={post.id}>
                    <div className="blog-card__top">
                      <span
                        className="blog-card__tag"
                        style={{ background: tagStyle.bg, color: tagStyle.color }}
                      >
                        {post.tag}
                      </span>
                      <span className="blog-card__read">{post.readTime}</span>
                    </div>
                    <p className="blog-card__date">{post.date}</p>
                    <h2 className="blog-card__title">{post.title}</h2>
                    <p className="blog-card__desc">{post.desc}</p>
                    {isOpen && (
                      <div className="blog-card__full">
                        <p>
                          This is a preview of the full article. The complete post
                          covers everything you need to know about <strong>{post.title.toLowerCase()}</strong>.
                          Stay tuned for the full content coming soon on our website at{" "}
                          <a href="https://www.naturalpuff.com" target="_blank" rel="noopener noreferrer">
                            naturalpuff.com
                          </a>.
                        </p>
                      </div>
                    )}
                    <button
                      className="blog-card__btn"
                      onClick={() => setExpanded(isOpen ? null : post.id)}
                    >
                      {isOpen ? "Show Less ↑" : "Read More →"}
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
            <p>Stay informed with our latest blog posts, recipes, and exclusive product announcements.</p>
          </div>
          {subscribed ? (
            <div className="blog-subscribe__success">
              ✓ Subscribed! Thank you.
            </div>
          ) : (
            <div className="blog-subscribe__form">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button onClick={handleSubscribe}>Subscribe</button>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}