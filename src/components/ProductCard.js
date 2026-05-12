import React, { useContext, useState, useEffect } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);
  const [index, setIndex] = useState(0);

  const images = product.images?.length > 0 ? product.images : ["/placeholder.png"];

  useEffect(() => {
    if (images.length <= 1) return; // ✅ sirf 1 image ho toh interval mat chalaao
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % images.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="card">
      <img
        src={images[index]}
        alt={product.name}
        className="product-img"
      />
      <h3>{product.name}</h3>
      <p className="desc">{product.desc}</p>
      <h2>₹{product.price}</h2>
      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
}