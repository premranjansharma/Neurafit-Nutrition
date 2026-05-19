import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";

const API_BASE =
  process.env.REACT_APP_BASE_URL || "http://localhost:5000";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeImage, setActiveImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);



  useEffect(() => {
    fetch(`${API_BASE}/api/products/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Product fetch failed");
        }
        return res.json();
      })
      .then((data) => {
        setProduct(data.product || data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  useEffect(() => {
  fetch(`${API_BASE}/api/products`)
    .then((res) => res.json())
    .then((data) => {
      const list = Array.isArray(data)
        ? data
        : data.products || [];

      const filtered = list.filter(
        (p) => p._id !== id
      );

      setRelatedProducts(filtered.slice(0, 4));
    })
    .catch((err) => {
      console.log("Related products error:", err);
    });
}, [id]);



  if (loading) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#0b0f0c",
          color: "white",
          fontSize: "22px",
        }}
      >
        Loading Product...
      </div>
    );
  }

  if (!product) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#0b0f0c",
          color: "red",
          fontSize: "22px",
        }}
      >
        Product Not Found
      </div>
    );
  }

  const images =
    product.images?.length > 0
      ? product.images.map((img) =>
          img.startsWith("http")
            ? img
            : `${API_BASE}${img}`
        )
      : ["/placeholder.png"];

 return (
  <>
    <div
      style={{
        minHeight: "100vh",
        background: "#0b0f0c",
        color: "white",
        padding: "40px",
      }}
    >
      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        style={{
          marginBottom: "30px",
          padding: "10px 20px",
          borderRadius: "10px",
          border: "none",
          cursor: "pointer",
          background: "#1e1e1e",
          color: "white",
        }}
      >
        ← Back
      </button>

      {/* MAIN */}
      <div
        style={{
          display: "flex",
          gap: "50px",
          flexWrap: "wrap",
          alignItems: "flex-start",
        }}
      >
        {/* LEFT */}
        <div style={{ flex: "1", minWidth: "320px" }}>
          <img
            src={images[activeImage]}
            alt={product.name}
            style={{
              width: "100%",
              maxWidth: "500px",
              borderRadius: "20px",
              objectFit: "cover",
              background: "#111",
            }}
          />

          {/* THUMBNAILS */}
          <div
            style={{
              display: "flex",
              gap: "12px",
              marginTop: "20px",
              flexWrap: "wrap",
            }}
          >
            {images.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="thumb"
                onClick={() => setActiveImage(index)}
                style={{
                  width: "80px",
                  height: "80px",
                  objectFit: "cover",
                  borderRadius: "10px",
                  cursor: "pointer",
                  border:
                    activeImage === index
                      ? "2px solid #00ff88"
                      : "2px solid transparent",
                }}
              />
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div
          style={{
            flex: "1",
            minWidth: "320px",
          }}
        >
          {/* CATEGORY */}
          <p
            style={{
              color: "#00ff88",
              fontSize: "14px",
              letterSpacing: "1px",
              textTransform: "uppercase",
            }}
          >
            {product.category || "Neurafit Nutrition"}
          </p>

          {/* TITLE */}
          <h1
            style={{
              fontSize: "42px",
              marginTop: "10px",
              marginBottom: "20px",
            }}
          >
            {product.name}
          </h1>

          {/* PRICE */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "15px",
              marginBottom: "20px",
            }}
          >
            <h2
              style={{
                color: "#00ff88",
                fontSize: "36px",
                margin: 0,
              }}
            >
              ₹{product.price}
            </h2>

            {product.originalPrice && (
              <span
                style={{
                  textDecoration: "line-through",
                  color: "#888",
                  fontSize: "20px",
                }}
              >
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* STOCK */}
          <p
            style={{
              color:
                product.stock > 0 ? "#00ff88" : "red",
              marginBottom: "20px",
            }}
          >
            {product.stock > 0
              ? `In Stock (${product.stock} Available)`
              : "Out Of Stock"}
          </p>

          {/* DESCRIPTION */}
          <p
            style={{
              color: "#ccc",
              lineHeight: "1.8",
              marginBottom: "30px",
              fontSize: "16px",
            }}
          >
            {product.desc}
          </p>

          {/* FEATURES */}
          <div
            style={{
              marginBottom: "30px",
            }}
          >
            <h3>Key Benefits</h3>

            <ul
              style={{
                color: "#bbb",
                lineHeight: "2",
                paddingLeft: "20px",
              }}
            >
              <li>Boost Energy & Performance</li>
              <li>Improves Strength & Recovery</li>
              <li>Premium Quality Ingredients</li>
              <li>No Harmful Preservatives</li>
              <li>Scientifically Formulated</li>
            </ul>
          </div>

          {/* BUTTONS */}
          <div
            style={{
              display: "flex",
              gap: "20px",
              flexWrap: "wrap",
            }}
          >
            <button
              onClick={() => addToCart(product)}
              style={{
                background: "#00ff88",
                color: "black",
                border: "none",
                padding: "14px 28px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Add To Cart
            </button>

            <button
              onClick={() => navigate("/checkout")}
              style={{
                background: "transparent",
                color: "white",
                border: "1px solid #00ff88",
                padding: "14px 28px",
                borderRadius: "12px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "16px",
              }}
            >
              Buy Now
            </button>

            <button
  onClick={() => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.desc,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(
        window.location.href
      );

      alert("Product link copied!");
    }
  }}
  style={{
    background: "#1a1a1a",
    color: "white",
    border: "1px solid #444",
    padding: "14px 28px",
    borderRadius: "12px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "16px",
  }}
>
  Share Product
</button>

          </div>

          {/* EXTRA INFO */}
          <div
            style={{
              marginTop: "40px",
              borderTop: "1px solid #222",
              paddingTop: "20px",
              color: "#888",
              lineHeight: "2",
            }}
          >
            <p>✔ Secure Payment</p>
            <p>✔ Fast Delivery Available</p>
            <p>✔ Premium Quality Guaranteed</p>
            <p>✔ 24/7 Customer Support</p>
          </div>
        </div>
      </div>
       </div>

    {/* PREMIUM SHOPPING EXPERIENCE */}
    <div
      style={{
        marginTop: "70px",
        background: "#111",
        padding: "30px",
        borderRadius: "20px",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>
        Premium Shopping Experience
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
        }}
      >
        <div
          style={{
            background: "#181818",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h3>🚚 Free Premium Delivery</h3>
          <p>On orders above ₹599</p>
        </div>

        <div
          style={{
            background: "#181818",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h3>↩ 7 Day Hassle-Free Returns</h3>
          <p>No questions asked</p>
        </div>

        <div
          style={{
            background: "#181818",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h3>💵 Cash on Delivery</h3>
          <p>Available on all orders</p>
        </div>

        <div
          style={{
            background: "#181818",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <h3>✅ 100% Authentic Products</h3>
          <p>Quality guaranteed</p>
        </div>
      </div>

      <p
        style={{
          marginTop: "20px",
          color: "#aaa",
        }}
      >
        Experience the Neurafit Nutrition difference with our premium customer service.
      </p>
    </div>

    {/* RELATED PRODUCTS */}
    <div
      style={{
        marginTop: "80px",
      }}
    >
      <h2 style={{ marginBottom: "30px" }}>
        You May Also Like
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fit,minmax(220px,1fr))",
          gap: "25px",
        }}
      >
        {relatedProducts.map((item) => {
          const relatedImage =
            item.images?.[0]
              ? item.images[0].startsWith("http")
                ? item.images[0]
                : `${API_BASE}${item.images[0]}`
              : "/placeholder.png";

          return (
            <div
              key={item._id}
              onClick={() =>
                navigate(`/products/${item._id}`)
              }
              style={{
                background: "#111",
                borderRadius: "20px",
                padding: "20px",
                cursor: "pointer",
              }}
            >
              <img
                src={relatedImage}
                alt={item.name}
                style={{
                  width: "100%",
                  height: "220px",
                  objectFit: "cover",
                  borderRadius: "15px",
                  marginBottom: "15px",
                }}
              />

              <h3>{item.name}</h3>

              <p
                style={{
                  color: "#00ff88",
                  marginTop: "10px",
                }}
              >
                ₹{item.price}
              </p>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/products/${item._id}`);
                }}
                style={{
                  marginTop: "15px",
                  width: "100%",
                  background: "#00ff88",
                  color: "black",
                  border: "none",
                  padding: "12px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                View Details
              </button>
            </div>
          );
        })}
      </div>
    </div>
  </>
);
}
