import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

export default function Products({ products }) {
  const { addToCart } = useContext(CartContext);
  const [addedId, setAddedId] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const navigate = useNavigate();


if (!Array.isArray(products)) return <div style={{textAlign:"center",padding:"80px",color:"#aaa"}}>⏳ Loading...</div>;
  const filters = ["All", ...new Set(products.map((p) => p.category || "Neurafit Nutrition"))];

  const filtered = activeFilter === "All"
    ? products
    : products.filter((p) => (p.category || "Neurafit Nutrition") === activeFilter);

  const handleAdd = (product) => {
    addToCart(product);
    setAddedId(product._id);
    setTimeout(() => setAddedId(null), 1500);
  };

  return (
    <div className="products-page">

      {/* HERO */}
      <div className="products-hero">
        <div className="products-hero__inner">
          <span className="products-hero__tag">Our Goodmod</span>
          <h1 className="products-hero__title">Featured Products</h1>
          <p className="products-hero__desc">
            Explore premium pre-workout and performance supplements
        designed to support energy, focus, endurance, and workout intensity.
          </p>
        </div>
      </div>

      {/* FILTER */}
      <div className="products-filter-bar">
        <div className="products-filter-inner">
          {filters.map((f) => (
            <button
              key={f}
              className={`products-filter-btn ${activeFilter === f ? "products-filter-btn--active" : ""}`}
              onClick={() => setActiveFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* PRODUCTS GRID */}
      <div className="products-outer">
        <div className="products-section">
          <div className="products-grid">
            {filtered.map((product) => (
     <div
  className="products-card"
  key={product._id}
  onClick={() => navigate(`/products/${product._id}`)}
  style={{
    cursor: "pointer",
    position: "relative",
    zIndex: 10,
  }}
>

                {/* IMAGE */}
              <div
  className="products-card__img-wrap"
  style={{ pointerEvents: "none" }}
>
                  {product.images?.[0] ? (
                    <img
               src={product.images?.[0] || "/placeholder.png"}
                      alt={product.name}
                      className="products-card__img"
                    />
                  ) : (
                    <div className="products-card__img-placeholder">🌾</div>
                  )}
                  <span className="products-card__weight"> 250g</span>
                </div>

                {/* INFO */}
                <div className="products-card__body">
                  <span className="products-card__category">
                    {product.category || "Neurafit Nutrition"}
                  </span>
                  <h3 className="products-card__name">{product.name}</h3>
                  <p className="products-card__desc">{product.desc}</p>

                  <div className="products-card__footer">
                    <span className="products-card__price">₹{product.price}</span>

                    {product.stock === 0 ? (
                      <span className="products-card__oos">Out of Stock</span>
                    ) : (
                      <button
                        className={`products-card__btn ${addedId === product._id ? "products-card__btn--added" : ""}`}  
                        onClick={(e) => {
                        e.stopPropagation();
                       handleAdd(product);
                           }}
                      >
                        {addedId === product._id ? "✓ Added!" : "Add to Cart"} 
                      </button>
                    )}
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ABOUT STRIP */}
      <div className="products-about">
        <div className="products-about__inner">
          <div className="products-about__text">
            <h2>About Neurafit Nutrition</h2>
                   <p>
          Neurafit Nutrition is built for individuals who
          refuse to settle for average. We are a performance-driven
          nutrition brand focused on helping athletes, gym enthusiasts,
          and fitness-focused individuals unlock their true potential.
          <br /><br />
          Our advanced formulas are designed to support energy,
          focus, endurance, strength, and workout performance
          using carefully selected ingredients and modern nutrition science.
        </p>

            <Link to="/about" className="products-about__btn">
              Learn More About Us →
            </Link>
          </div>
          <div className="products-about__badges">
            <div className="products-about__badge">⚡ Performance Driven</div>
            <div className="products-about__badge">🔥 Workout Energy</div>
            <div className="products-about__badge">💪 Muscle Support</div>
            <div className="products-about__badge">🧠 Focus & Endurance</div>
          </div>
        </div>
      </div>

    </div>
  );
}
