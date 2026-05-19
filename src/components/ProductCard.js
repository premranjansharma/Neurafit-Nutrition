import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const API_BASE = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  
  const [index, setIndex] = useState(0);
  const [isImageError, setIsImageError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Generate image array with fallback
  const images = React.useMemo(() => {
    if (!product || !product.images || product.images.length === 0) {
      return ["/placeholder.png"];
    }
    
    return product.images.map((img) =>
      typeof img === "string" && img.startsWith("http") ? img : `${API_BASE}${img}`
    );
  }, [product]);

  // Auto-rotate images
  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);

    return () => clearInterval(interval);
  }, [images.length]);

  // Reset index when images change
  useEffect(() => {
    setIndex(0);
    setIsImageError(false);
  }, [images]);

  const handleImageError = () => {
    setIsImageError(true);
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    if (!product || !product._id) {
      console.error("Invalid product data");
      return;
    }
    
    addToCart(product);
  };

  const handleCardClick = () => {
    if (product?._id) {
      navigate(`/products/${product._id}`);
    }
  };

  // Validation checks
  if (!product) {
    return null;
  }

  const currentImage = isImageError ? "/placeholder.png" : images[index];

  return (
    <div
      className="card"
      onClick={handleCardClick}
      style={{ cursor: "pointer" }}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleCardClick();
        }
      }}
    >
      {/* Image Container */}
      <div className="image-container" style={{ position: "relative", overflow: "hidden" }}>
        {isLoading && (
          <div style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1
          }}>
            Loading...
          </div>
        )}
        
        <img
          src={currentImage}
          alt={product.name || "Product"}
          className="product-img"
          onError={handleImageError}
          onLoad={handleImageLoad}
          style={{
            width: "100%",
            height: "250px",
            objectFit: "cover",
            display: isLoading ? "none" : "block"
          }}
        />
      </div>

      {/* Product Info */}
      <div style={{ padding: "15px" }}>
        <h3 style={{ margin: "10px 0", fontSize: "18px", fontWeight: "600" }}>
          {product.name || "Unnamed Product"}
        </h3>

        <p className="desc" style={{
          margin: "8px 0",
          fontSize: "14px",
          color: "#666",
          overflow: "hidden",
          textOverflow: "ellipsis",
          display: "-webkit-box",
          WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical"
        }}>
          {product.desc || "No description available"}
        </p>

        <h2 style={{
          margin: "12px 0",
          fontSize: "20px",
          color: "#e74c3c",
          fontWeight: "bold"
        }}>
          ₹{product.price?.toFixed(2) || "0.00"}
        </h2>

        <button
          onClick={handleAddToCart}
          style={{
            width: "100%",
            padding: "10px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "14px",
            fontWeight: "600",
            transition: "background-color 0.3s ease"
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#2980b9"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#3498db"}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
