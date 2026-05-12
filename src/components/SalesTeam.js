import React, { useState } from "react";

export default function SalesTeam() {
  const [form, setForm] = useState({
    name: "", email: "", phone: "",
    company: "", location: "", orderSize: "", details: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handle = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const submit = () => {
    if (!form.name.trim())         return setError("Please enter your full name.");
    if (!form.email.includes("@")) return setError("Please enter a valid email.");
    if (!form.phone.trim())        return setError("Please enter your phone number.");
    if (!form.company.trim())      return setError("Please enter your company name.");
    if (!form.location.trim())     return setError("Please enter your location.");
    if (!form.orderSize)           return setError("Please select an order size.");
    if (!form.details.trim())      return setError("Please add additional details.");
    setSubmitted(true);
  };

  return (
    <div className="sales-page">

      {/* HERO */}
      <div className="sales-hero">
        <div className="sales-hero__inner">
          <span className="sales-tag">Sales Team</span>
          <h1 className="sales-hero__title">Contact Our Sales Team</h1>
          <p className="sales-hero__desc">
            Interested in wholesale orders or business partnerships? Our dedicated
            sales team is ready to assist you with pricing, bulk orders, and
            customized solutions.
          </p>
          <div className="sales-hero__btns">
            <a href="#inquiry" className="sales-btn sales-btn--light">Submit an Inquiry</a>
            <a href="#team" className="sales-btn sales-btn--outline">Meet Our Team</a>
          </div>
        </div>
      </div>

      {/* WHY CHOOSE US */}
      <div className="sales-outer">
        <div className="sales-section">
          <div className="sales-section__head">
            <h2>Why Choose Us</h2>
            <p>Benefits of Partnering With Us</p>
          </div>
          <div className="sales-benefits">
              <div className="sales-benefit-card">
              <div className="sales-benefit-card__icon">🌿</div>
              <h3>Premium Quality Products</h3>
              <p>Made with premium ingredients, our products ensure purity, safety, and effective results you can trust every day.
           </p>
            </div>
            <div className="sales-benefit-card">
              <div className="sales-benefit-card__icon">📦</div>
              <h3>Flexible Wholesale Options</h3>
              <p>From small retail orders to large distribution quantities, we offer flexible packaging and pricing options.</p>
            </div>
            <div className="sales-benefit-card">
              <div className="sales-benefit-card__icon">🤝</div>
              <h3>Dedicated Support</h3>
              <p>Our sales team provides personalized service, from order placement to delivery and after-sales support.</p>
            </div>
          </div>
        </div>
      </div>

      {/* INQUIRY FORM */}
      <div className="sales-outer sales-outer--cream" id="inquiry">
        <div className="sales-section">
          <div className="sales-section__head">
            <h2>Submit a Sales Inquiry</h2>
            <p>Fill out the form below and our sales team will get back to you within 24 hours.</p>
          </div>

          {submitted ? (
            <div className="sales-success">
              <div className="sales-success__icon">✓</div>
              <h3>Inquiry Submitted!</h3>
              <p>Thank you! Our sales team will contact you within 24 hours.</p>
            </div>
          ) : (
            <div className="sales-form-wrap">
              {error && <p className="sales-error">{error}</p>}
              <div className="sales-form-grid">
                <div className="sales-field">
                  <label>Full Name *</label>
                  <input name="name" placeholder="Ravi Prakash" value={form.name} onChange={handle} />
                </div>
                <div className="sales-field">
                  <label>Email Address *</label>
                  <input name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handle} />
                </div>
                <div className="sales-field">
                  <label>Phone Number *</label>
                  <input name="phone" type="tel" placeholder="+91 XXXXX XXXXX" value={form.phone} onChange={handle} />
                </div>
                <div className="sales-field">
                  <label>Company/Business Name *</label>
                  <input name="company" placeholder="Your Company" value={form.company} onChange={handle} />
                </div>
                <div className="sales-field">
                  <label>Location/City *</label>
                  <input name="location" placeholder="Mumbai" value={form.location} onChange={handle} />
                </div>
                <div className="sales-field">
                  <label>Estimated Order Size *</label>
                  <select name="orderSize" value={form.orderSize} onChange={handle}>
                    <option value="">Select order size</option>
                    <option value="small">Small (1–50 units)</option>
                    <option value="medium">Medium (51–200 units)</option>
                    <option value="large">Large (201–500 units)</option>
                    <option value="bulk">Bulk (500+ units)</option>
                    <option value="custom">Custom requirement</option>
                  </select>
                </div>
              </div>
              <div className="sales-field" style={{ marginBottom: "16px" }}>
                <label>Additional Details *</label>
                <textarea
                  name="details"
                  rows="4"
                  placeholder="Tell us more about your requirements..."
                  value={form.details}
                  onChange={handle}
                />
              </div>
              <button className="sales-submit-btn" onClick={submit}>
                Submit Inquiry →
              </button>
            </div>
          )}
        </div>
      </div>

      {/* MEET THE TEAM */}
      <div className="sales-outer" id="team">
        <div className="sales-section">
          <div className="sales-section__head">
            <h2>Meet Our Sales Team</h2>
            <p>Our experienced sales professionals are dedicated to helping your business grow.</p>
          </div>
          <div className="sales-team-grid">
            <div className="sales-member-card">

                <div className="about-founder__avatar-wrap">
          <img
            src={require("../assets/ravi.jpg")}
            alt="Ravi Prakash"
            className="about-founder__photo"
          />
        </div>
              
              <h3>Ravi Prakash</h3>
              <span className="sales-member-card__role">Founder & CEO</span>
              <div className="sales-member-card__contacts">
                <p>📞 +91 7739412888</p>
                <p>business@naturalpuff.com</p>
              </div>
            </div>
           
            </div>
          
        </div>
      </div>

      {/* BUSINESS INFO */}
      <div className="sales-outer sales-outer--cream">
        <div className="sales-section">
          <div className="sales-section__head">
            <h2>Business Hours & Information</h2>
          </div>
          <div className="sales-info-grid">
            <div className="sales-info-card">
              <h3>🕘 Business Hours</h3>
              <p>Monday – Friday: 9:00 AM – 6:00 PM</p>
              <p>Saturday: 10:00 AM – 4:00 PM</p>
              <p>Sunday: Closed</p>
            </div>
            <div className="sales-info-card">
              <h3>📦 Wholesale Minimum Order</h3>
              <p>Minimum order quantity: 50 units</p>
              <p>Custom packaging available for orders over 200 units</p>
            </div>
            <div className="sales-info-card">
              <h3>🚚 Shipping & Delivery</h3>
              <p>Pan-India shipping available</p>
              <p>Typical delivery time: 3–7 business days</p>
              <p>Express shipping options available</p>
            </div>
          </div>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <div className="sales-outer">
        <div className="sales-section">
          <div className="sales-section__head">
            <h2>Testimonials</h2>
            <p>What Our Partners Say</p>
          </div>
          <div className="sales-testimonials">
            <div className="sales-testimonial">
              <p className="sales-testimonial__text">
                " Neurafit Godmode has really boosted my workout performance.  
                I feel more energetic, focused, and consistent during my training sessions.
                The quality is impressive, and it actually delivers results.”
              </p>
              <div className="sales-testimonial__author">
                <div className="sales-testimonial__avatar">RK</div>
                <div>
                  <strong>xyz</strong>
                  <span>Fitness Enthusiast</span>
                </div>
              </div>
            </div>
            <div className="sales-testimonial">
              <p className="sales-testimonial__text">
               “I’ve tried many pre-workout supplements, but this one stands out.
                The energy and focus it provides are smooth without any crash.
                 It has become a regular part of my fitness routine.”
              </p>
              <div className="sales-testimonial__author">
                <div className="sales-testimonial__avatar">PS</div>
                <div>
                  <strong>prem Sharma</strong>
                  <span>Gym Member, India, Delhi</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="sales-cta">
        <h2>Ready to Partner With Us?</h2>
        <p>
          Join our growing network of retailers and distributors. Contact our sales
          team today to discuss how we can help grow your business.
        </p>
        <div className="sales-cta__btns">
          <a href="#inquiry" className="sales-btn sales-btn--white">Submit an Inquiry</a>
          <a href="mailto:sales@naturalpuff.com" className="sales-btn sales-btn--outline-white">
            Email Sales Team
          </a>
        </div>
      </div>

    </div>
  );
}