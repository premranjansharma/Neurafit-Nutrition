import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const API_BASE =
import.meta.env.VITE_API_URL || "http://localhost:5000";

export default function ProductDetails() {
const { id } = useParams();
const navigate = useNavigate();

const [product, setProduct] = useState(null);

useEffect(() => {
fetch(`${API_BASE}/api/products/${id}`)
.then((res) => res.json())
.then((data) => {
setProduct(data.product || data);
})
.catch((err) => console.log(err));
}, [id]);

if (!product) {
return (
<div style={{ padding: "40px" }}>
Loading... </div>
);
}

const image =
product.images?.[0]?.startsWith("http")
? product.images[0]
: `${API_BASE}${product.images?.[0]}`;

return (
<div
style={{
minHeight: "100vh",
background: "#0b0f0c",
color: "white",
padding: "40px",
}}
>
<button
onClick={() => navigate(-1)}
style={{
marginBottom: "20px",
padding: "10px 20px",
cursor: "pointer",
}}
>
← Back </button>

```
  <div
    style={{
      display: "flex",
      gap: "40px",
      flexWrap: "wrap",
    }}
  >
    <img
      src={image}
      alt={product.name}
      style={{
        width: "350px",
        borderRadius: "20px",
      }}
    />

    <div>
      <h1>{product.name}</h1>

      <p>{product.desc}</p>

      <h2 style={{ color: "#00ff88" }}>
        ₹{product.price}
      </h2>

      <button
        style={{
          background: "#00ff88",
          color: "black",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          cursor: "pointer",
        }}
      >
        Add To Cart
      </button>
    </div>
  </div>
</div>


);
}
