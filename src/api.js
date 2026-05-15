// src/api.js
// ── Paste this file in src/api.js ──
// Use these functions in your React components to call the backend

const BASE = `${process.env.REACT_APP_BASE_URL}/api`;

const getToken      = () => localStorage.getItem("token");
const getAdminToken = () => localStorage.getItem("adminToken");

const headers      = () => ({ "Content-Type": "application/json", Authorization: `Bearer ${getToken()}` });
const adminHeaders = () => ({ "Content-Type": "application/json", Authorization: `Bearer ${getAdminToken()}` });

// ════════════════════════════════════
//  AUTH
// ════════════════════════════════════
export const customerSignup = (data) =>
  fetch(`${BASE}/auth/signup`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());

export const customerLogin = (data) =>
  fetch(`${BASE}/auth/login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());

export const adminLogin = (username, password) =>
  fetch(`${BASE}/auth/admin-login`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ username, password }) }).then(r => r.json());

export const getMe = () =>
  fetch(`${BASE}/auth/me`, { headers: headers() }).then(r => r.json());

// ════════════════════════════════════
//  PRODUCTS
// ════════════════════════════════════
export const getProducts = () =>
  fetch(`${BASE}/products`).then(r => r.json());

export const getFeaturedProducts = () =>
  fetch(`${BASE}/products/featured`).then(r => r.json());

export const getProduct = (id) =>
  fetch(`${BASE}/products/${id}`).then(r => r.json());

export const addProduct = (formData) =>
  fetch(`${BASE}/products`, { method: "POST", headers: { Authorization: `Bearer ${getAdminToken()}` }, body: formData }).then(r => r.json());

export const updateProduct = (id, formData) =>
  fetch(`${BASE}/products/${id}`, { method: "PUT", headers: { Authorization: `Bearer ${getAdminToken()}` }, body: formData }).then(r => r.json());

export const updateStock = (id, stock) =>
  fetch(`${BASE}/products/${id}/stock`, { method: "PATCH", headers: adminHeaders(), body: JSON.stringify({ stock }) }).then(r => r.json());

export const deleteProduct = (id) =>
  fetch(`${BASE}/products/${id}`, { method: "DELETE", headers: adminHeaders() }).then(r => r.json());

// ════════════════════════════════════
//  ORDERS
// ════════════════════════════════════
export const placeOrder = (data) =>
  fetch(`${BASE}/orders`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) }).then(r => r.json());

export const getMyOrders = () =>
  fetch(`${BASE}/orders/my`, { headers: headers() }).then(r => r.json());

export const trackOrder = (id) =>
  fetch(`${BASE}/orders/track/${id}`).then(r => r.json());

export const getAllOrders = () =>
  fetch(`${BASE}/orders`, { headers: adminHeaders() }).then(r => r.json());

export const updateOrderStatus = (id, status, trackingId) =>
  fetch(`${BASE}/orders/${id}/status`, { method: "PATCH", headers: adminHeaders(), body: JSON.stringify({ status, trackingId }) }).then(r => r.json());

export const deleteOrder = (id) =>
  fetch(`${BASE}/orders/${id}`, { method: "DELETE", headers: adminHeaders() }).then(r => r.json());

// ════════════════════════════════════
//  OFFERS
// ════════════════════════════════════
export const getOffers = () =>
  fetch(`${BASE}/offers`).then(r => r.json());

export const getAllOffers = () =>
  fetch(`${BASE}/offers/all`, { headers: adminHeaders() }).then(r => r.json());

export const addOffer = (data) =>
  fetch(`${BASE}/offers`, { method: "POST", headers: adminHeaders(), body: JSON.stringify(data) }).then(r => r.json());

export const updateOffer = (id, data) =>
  fetch(`${BASE}/offers/${id}`, { method: "PUT", headers: adminHeaders(), body: JSON.stringify(data) }).then(r => r.json());

export const deleteOffer = (id) =>
  fetch(`${BASE}/offers/${id}`, { method: "DELETE", headers: adminHeaders() }).then(r => r.json());

// ════════════════════════════════════
//  CART
// ════════════════════════════════════
export const getCart = () =>
  fetch(`${BASE}/cart`, { headers: headers() }).then(r => r.json());

export const addToCart = (data) =>
  fetch(`${BASE}/cart`, { method: "POST", headers: headers(), body: JSON.stringify(data) }).then(r => r.json());

export const updateCartQty = (productId, quantity) =>
  fetch(`${BASE}/cart/${productId}`, { method: "PATCH", headers: headers(), body: JSON.stringify({ quantity }) }).then(r => r.json());

export const removeFromCart = (productId) =>
  fetch(`${BASE}/cart/${productId}`, { method: "DELETE", headers: headers() }).then(r => r.json());

export const clearCart = () =>
  fetch(`${BASE}/cart`, { method: "DELETE", headers: headers() }).then(r => r.json());
