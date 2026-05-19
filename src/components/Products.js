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
          <span className="products-hero__tag">Our Products</span>
          <h1 className="products-hero__title">Featured Products</h1>
          <p className="products-hero__desc">
            Discover our premium varieties, crafted with care and premium ingredients.
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
                  <span className="products-card__weight">50g</span>
                </div>

                {/* INFO */}
                <div className="products-card__body">
                  <span className="products-card__category">
                    {product.category || "Ironfuel Nutrition"}
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
            Neurafit Nutrition is built for those who refuse to settle for average. We are a performance driven nutrition brand dedicated to helping individuals unlock their true strength physically and mentally. Whether you're an athlete, a fitness enthusiast, or someone just starting your journey, IronFuel is designed to fuel your ambition.
            </p>
            <Link to="/about" className="products-about__btn">
              Learn More About Us →
            </Link>
          </div>
          <div className="products-about__badges">
            <div className="products-about__badge">🌿 100% Natural</div>
            <div className="products-about__badge">🚫 No Preservatives</div>
            <div className="products-about__badge">💚 Gluten Free</div>
            <div className="products-about__badge">⚡ High Protein</div>
          </div>
        </div>
      </div>

    </div>
  );
}
