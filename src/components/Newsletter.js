import React, { useState } from "react";

export default function Newsletter({ setSubscribers }) {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError]     = useState("");

  const handleSubmit = () => {
    // Basic validation
    if (!name.trim())  return setError("Please enter your name.");
    if (!email.trim() || !email.includes("@"))
                       return setError("Please enter a valid email.");

    const newSub = {
      id:    Date.now(),
      name:  name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      date:  new Date().toLocaleDateString("en-IN", {
        day: "2-digit", month: "short", year: "numeric"
      }),
    };

    setSubscribers((prev) => [...prev, newSub]);
    setSubmitted(true);
    setError("");
  };

  if (submitted) {
    return (
      <div className="newsletter-section">
        <div className="newsletter-success">
          <div className="newsletter-success__icon">✓</div>
          <h3>You're subscribed!</h3>
          <p>Thanks <strong>{name}</strong>, we'll keep you updated.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="newsletter-section">
      <div className="newsletter-box">

        <div className="newsletter-left">
          <span className="newsletter-tag">Newsletter</span>
          <h2 className="newsletter-title">Subscribe to Newsletter</h2>
          <p className="newsletter-desc">
            Stay updated with our latest products and offers.
          </p>
          <ul className="newsletter-perks">
            <li>✓ Exclusive deals & discounts</li>
            <li>✓ New product launches first</li>
            <li>✓ Health tips & fitness advice</li>
          </ul>
        </div>

        <div className="newsletter-right">
          {error && <p className="newsletter-error">{error}</p>}

          <div className="newsletter-field">
            <label>Full Name *</label>
            <input
              type="text"
              placeholder="Ravi Prakash"
              value={name}
              onChange={(e) => { setName(e.target.value); setError(""); }}
            />
          </div>

          <div className="newsletter-field">
            <label>Email Address *</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setError(""); }}
            />
          </div>

          <div className="newsletter-field">
            <label>Phone Number (optional)</label>
            <input
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <button className="newsletter-btn" onClick={handleSubmit}>
            Subscribe →
          </button>
        </div>

      </div>
    </div>
  );
}