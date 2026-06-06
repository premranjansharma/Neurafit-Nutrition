/* eslint-disable*/
import React, { useState, useEffect} from "react";
import { Routes, Route, Link, useLocation,Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductCard from "./components/ProductCard";
import TrackOrder from "./components/TrackOrder";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Admin from "./pages/admin/Admin";
import SalesTeam from "./components/SalesTeam";
import HealthBenefits from "./components/HealthBenefits";
import About from "./components/About";
import Blog from "./components/Blog";
import Products from "./components/Products";
import ContactPage from "./components/ContactPage";
import IronFuelPolicy from "./components/IronFuelPolicy";
import IronFuelShipping from "./components/IronFuelShipping";
import IronFuelPrivacy from "./components/IronFuelPrivacy";
import IronFuelTerms from "./components/IronFuelTerms";
import ScrollToTop from "./components/ScrollToTop";
import PerformanceSection from "./components/PerformanceSection";
import WhyChooseUs from "./components/WhyChooseUs";
import CommitmentSection from "./components/CommitmentSection";
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import ContentManager from "./pages/admin/ContentManager";
import { AuthProvider } from "./pages/admin/AuthContext";
import ProductDetails from "./components/ProductDetails";
import OrderSuccess from "./components/OrderSuccess";


import "./style.css";
import "./style1.css";
import ravi from "./assets/ravi.jpg";
import logo from "./assets/logo-nav.png";
import pre1 from "./assets/pre1.jpg";
import pre2 from "./assets/pre2.jpg";
import pre3 from "./assets/pre3.jpg";
import protein1 from "./assets/protein1.jpg";
import protein2 from "./assets/protein2.jpg";
import protein3 from "./assets/protein3.jpg";

/* ===== SOCIAL ICONS ===== */
const IconFacebook = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const IconInstagram = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
  </svg>
);
const IconTwitter = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const IconWhatsApp = () => (
  <svg width="18" height="18" viewBox="0 0 32 32" fill="currentColor">
    <path d="M16 0C7.163 0 0 7.163 0 16c0 2.833.737 5.49 2.027 7.8L0 32l8.435-2.01A15.93 15.93 0 0 0 16 32c8.837 0 16-7.163 16-16S24.837 0 16 0zm7.94 22.4c-.34.96-1.99 1.84-2.73 1.96-.74.12-1.66.17-2.68-.17-.62-.2-1.41-.47-2.43-.92-4.27-1.84-7.06-6.14-7.27-6.43-.21-.28-1.72-2.29-1.72-4.37s1.09-3.1 1.48-3.52c.38-.42.83-.52 1.1-.52.28 0 .55.003.79.014.25.012.59-.095.93.71.34.82 1.16 2.83 1.26 3.04.1.21.17.45.03.72-.14.28-.21.45-.42.69-.21.24-.44.54-.63.72-.21.2-.43.42-.18.82.24.4 1.08 1.78 2.32 2.88 1.59 1.42 2.93 1.86 3.34 2.07.41.21.65.18.89-.1.24-.28 1.03-1.2 1.31-1.61.27-.41.55-.34.93-.2.38.14 2.39 1.13 2.8 1.33.41.21.68.31.78.48.1.17.1.99-.24 1.95z" />
  </svg>
);

/* ===== HOME PAGE ===== */
function Home({ products }) {
  return (
    <div>
      {/* HERO */}
      <div className="hero">
        <div className="glow"></div>
        <h1>GODMODE ENERGY</h1>
        <p>Unleash Power | Focus | Performance</p>
        <p>
          Experience next-level energy, razor-sharp focus, and unstoppable
          performance with GodMode by Neurafit Nutrition.
        </p>
        <Link to="/products" className="hero-btn hero-btn--primary">
          Explore Products
        </Link>
      </div>

      {/* HERO SECTION */}
      <div className="hero-section">
        <div className="hero-particles">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="hero-particle" style={{
              left: Math.random() * 100 + "%",
              animationDelay: Math.random() * 5 + "s",
              animationDuration: (3 + Math.random() * 4) + "s",
              width: (4 + Math.random() * 8) + "px",
              height: (4 + Math.random() * 8) + "px",
            }} />
          ))}
        </div>

        <div className="hero-left">
          <span className="hero-badge">Made For Peak Performance</span>
          <h1 className="hero-title">
            Godmode.<br />
            <span className="hero-title--accent">Live Better.</span>
          </h1>
          <p className="hero-desc">
            At Neurafit Nutrition, we believe that real results come from clean,
            effective, and scientifically formulated supplements.
          </p>
          <div className="hero-stats">
            <div className="hero-stat">
              <span className="hero-stat__num">2600mg</span>
              <span className="hero-stat__label">L-Arginine</span>
            </div>
            <div className="hero-stat__divider" />
            <div className="hero-stat">
              <span className="hero-stat__num">2600mg</span>
              <span className="hero-stat__label">Beta Alanine</span>
            </div>
            <div className="hero-stat__divider" />
            <div className="hero-stat">
              <span className="hero-stat__num">250mg</span>
              <span className="hero-stat__label">Caffeine</span>
            </div>
          </div>
          <div className="hero-btns">
            <Link to="/products" className="hero-btn hero-btn--primary">Shop Godmode</Link>
            <Link to="/health" className="hero-btn hero-btn--secondary">Explore Benefits</Link>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-img-wrap">
            <div className="hero-img-ring hero-img-ring--1" />
            <div className="hero-img-ring hero-img-ring--2" />
            <div className="hero-img-ring hero-img-ring--3" />
            <img src={pre1} alt="IronFuel Pre-Workout" className="hero-product-img" />
            <div className="hero-float-badge hero-float-badge--top">
              <span>Premium Quality</span>
            </div>
            <div className="hero-float-badge hero-float-badge--bottom">
              <span>Fast Delivery</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURES */}
      <div className="section grid">
        <div>
          <h3>High Energy</h3>
          <p>Experience an instant surge of energy with our advanced formula.</p>
        </div>
        <div>
          <h3>Focus Boost</h3>
          <p>Stay mentally sharp and focused during every workout.</p>
        </div>
        <div>
          <h3>Muscle Power</h3>
          <p>Improve strength, endurance, and muscle performance.</p>
        </div>
        <div>
          <h3>Sugar Free</h3>
          <p>Enjoy clean energy without unnecessary sugar.</p>
        </div>
      </div>

      {/* PRODUCTS */}
      <div className="section">
        <h2>Featured Products</h2>
        <p>High-performance supplements designed for intense training sessions.</p>
        <div className="grid">
          {products.map((item) => (
            <ProductCard key={item._id} product={item} />
          ))}
        </div>
      </div>

      {/* ABOUT */}
      <div className="section">
        <h2>About Neurafit Nutrition</h2>
        <p>
          Neurafit Nutrition is a modern fitness and performance brand built
          for individuals who refuse to settle for average.
        </p>
      </div>

      <PerformanceSection />
      <WhyChooseUs />

      {/*  CommitmentSection — admin se login hone par edit controls dikhenge */}
      <CommitmentSection />

    </div>
  );
}

/* ===== FOOTER ===== */
function Footer({ setSubscribers }) {
  return (
    <div className="footer">
      <div className="footer-logo">
        <img src={logo} alt="IronFuel Logo" className="footer-logo-img" />
        <span className="footer-brand">Neurafit Nutrition</span>
      </div>

      <div className="footer-socials">
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="social-link social-link--fb">
          <IconFacebook /> Facebook
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link social-link--ig">
          <IconInstagram /> Instagram
        </a>
        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-link social-link--tw">
          <IconTwitter /> Twitter
        </a>
        <a href="https://wa.me/917739412888" target="_blank" rel="noopener noreferrer" className="social-link social-link--wa">
          <IconWhatsApp /> WhatsApp
        </a>
      </div>

      <div className="footer-bottom">
  <p>2026 Neurafit Nutrition. All rights reserved.</p>

  <p>
    Built by{" "}
    <a
      href="https://xtyletechnology.com"
      target="_blank"
      rel="noopener noreferrer"
    >
      <strong>XTYLE TECHNOLOGY</strong>
    </a>
  </p>
</div>
  );
}

/* ===== MAIN APP ===== */
function App() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");
  const [offers, setOffers] = useState([]);

useEffect(() => {
  fetch(`${process.env.REACT_APP_BASE_URL}/api/offers`) 
    .then(res => res.json())
    .then(data => {
      if (Array.isArray(data)) {
        setOffers(data);
      }
    })
    .catch(err => console.error("Offers fetch error:", err));
}, []);

const [products, setProducts] = useState([]);

useEffect(() => {
  fetch(`${process.env.REACT_APP_BASE_URL}/api/products`)
    .then(res => res.json())
    .then(data => {
      const BASE = process.env.REACT_APP_BASE_URL;
      const list = Array.isArray(data) ? data : data.products || [];
      return list.map(p => ({
        ...p,
        images: (p.images || []).map(img =>
          img.startsWith("http") ? img : `${BASE}${img}`
        ),
      }));
    })
    .then(data => setProducts(data))
    .catch(err => console.error("Products fetch error:", err));
}, []);
  const [subscribers, setSubscribers] = useState([]);

  return (



    <AuthProvider>
      <div>
        <ScrollToTop />
        {!isAdmin && <Navbar offers={offers} />}

        <Routes>
           <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home"   element={<Home products={products} />} />
          <Route path="/cart"   element={<Cart />} />
          <Route path="/track"  element={<TrackOrder />} />
          <Route path="/login"  element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/sales"  element={<SalesTeam />} />
          <Route path="/health" element={<HealthBenefits />} />
          <Route path="/about"  element={<About />} />
          <Route path="/blog"   element={<Blog />} />
          <Route path="/products" element={<Products products={products} />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/refund-policy"   element={<IronFuelPolicy />} />
          <Route path="/shipping-policy" element={<IronFuelShipping />} />
          <Route path="/privacy-policy"  element={<IronFuelPrivacy />} />
          <Route path="/terms"           element={<IronFuelTerms />} />
          <Route path="/admin/content" element={<ContentManager />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/order-success/:orderId"element={<OrderSuccess />}/>


          {/* ✅ /admin — login gate Admin.jsx ke andar hai */}
          <Route path="/admin" element={
            <Admin
              products={products}
              setProducts={setProducts}
              offers={offers}
              setOffers={setOffers}
              subscribers={subscribers}
              setSubscribers={setSubscribers}
            />
          } />
          <Route
  path="/profile"
  element={
    <PrivateRoute>
      <Profile />
    </PrivateRoute>
  }
/>
 </Routes>


        

<div className="section contact">
  <h2>Contact</h2>
  <p>Made in India | Premium Quality | Fast Acting Formula</p>

  <div className="contact-grid">

    <div className="contact-card">
      <h3>Founder & CEO</h3>
      <img src={ravi} alt="Ravi" className="founder-img" />
      <p className="founder-name">Ravi Prakash</p>
      <p className="founder-desc">
        Founder of Neurafit Nutrition, building powerful fitness solutions.
      </p>
    </div>

   
    <div className="contact-card">
      <h3>Policies</h3>
      <Link to="/refund-policy">Cancellation & Refund</Link>
      <Link to="/shipping-policy">Shipping Policy</Link>
      <Link to="/privacy-policy">Privacy Policy</Link>
      <Link to="/terms">Terms & Conditions</Link>
    </div>

    <div className="contact-card">
      <h3>Contact Us</h3>
      <p>Shubhankarpur, Darbhanga - 846005 Bihar India</p>
      <p>info@NeurafitNutrition.com</p>
      <p>+91 7739412888</p>
    </div>

    
    <div className="contact-card">
      <h3>Support</h3>
      <p>24/7 Customer Support Available</p>
    </div>

  </div> 
</div>


    <div>
        {!isAdmin && <Footer setSubscribers={setSubscribers} />}
      </div>
      </div>
    </AuthProvider>
  );
}

 

export default App;
