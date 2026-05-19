/* eslint-disable*/
import React, { useState, useEffect, useRef } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";
import AdminUsers from "./AdminUsers";
import logo from "../../assets/logo-nav.png";
const API = process.env.REACT_APP_BASE_URL;

const DUMMY_CONTENT = {
  hero:     { heading:"GODMODE ENERGY", subheading:"Unleash Power | Focus | Performance", description:"Experience next-level energy, razor-sharp focus, and unstoppable performance with GodMode by IronFuel Nutrition.", btnText:"Explore Products" },
  about:    { heading:"About IronFuel Nutrition", body:"IronFuel Nutrition is a modern fitness and performance brand built for individuals who refuse to settle for average." },
  features: [
    { title:"High Energy",  desc:"Experience an instant surge of energy with our advanced formula." },
    { title:"Focus Boost",  desc:"Stay mentally sharp and focused during every workout." },
    { title:"Muscle Power", desc:"Improve strength, endurance, and muscle performance." },
    { title:"Sugar Free",   desc:"Enjoy clean energy without unnecessary sugar." },
  ],
  contact: { founder:"Ravi Prakash", address:"Shubhankarpur, Darbhanga - 846005 Bihar India", email:"info@ironfuelnutrition.com", phone:"+91 7739412888" },
};

const STATUS_META = {
  pending:   { label:"Pending",   color:"#f59e0b", bg:"rgba(245,158,11,0.12)" },
  confirmed: { label:"Confirmed", color:"#3b82f6", bg:"rgba(59,130,246,0.12)" },
  shipped:   { label:"Shipped",   color:"#a855f7", bg:"rgba(168,85,247,0.12)" },
  delivered: { label:"Delivered", color:"#00ff88", bg:"rgba(0,255,136,0.12)"  },
  cancelled: { label:"Cancelled", color:"#ef4444", bg:"rgba(239,68,68,0.12)"  },
};

function getImgSrc(img) {
  if (!img) return "/placeholder.png";
  if (img.startsWith("blob:") || img.startsWith("data:") || img.startsWith("http")) return img;
  return `${API}${img}`;
}

function StatusBadge({ status }) {
  const m = STATUS_META[status] || STATUS_META.pending;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:"5px", background:m.bg, color:m.color, fontSize:"11px", fontWeight:600, padding:"3px 10px", borderRadius:"20px", fontFamily:"Poppins,sans-serif" }}>
      <span style={{ width:"5px", height:"5px", borderRadius:"50%", background:m.color, flexShrink:0 }}/>
      {m.label}
    </span>
  );
}

function LiveClock() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const id = setInterval(() => setT(new Date()), 1000); return () => clearInterval(id); }, []);
  return <span style={{ fontSize:"11px", color:"rgba(255,255,255,0.25)", fontVariantNumeric:"tabular-nums" }}>
    {t.toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", second:"2-digit" })}
  </span>;
}

function RevenueChart({ orders }) {
  const today = new Date();
  const days = Array.from({ length: 30 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (29 - i));
    return d;
  });
  const data = days.map(d => {
    const dayStr = d.toDateString();
    const total = orders
      .filter(o => o.status === "delivered" && new Date(o.rawTime || o.time).toDateString() === dayStr)
      .reduce((s, o) => s + (o.amount || 0), 0);
    return { label: d.getDate(), total };
  });
  const maxVal = Math.max(...data.map(d => d.total), 1);
  const w = 560, h = 90, pad = 8;
  const points = data.map((d, i) => {
    const x = pad + (i / (data.length - 1)) * (w - pad * 2);
    const y = h - pad - (d.total / maxVal) * (h - pad * 2);
    return `${x},${y}`;
  }).join(" ");
  const areaPoints = `${pad},${h - pad} ` + points + ` ${w - pad},${h - pad}`;
  const tickIndices = [0, 6, 12, 18, 24, 29];
  return (
    <div style={{ overflowX:"auto" }}>
      <svg viewBox={`0 0 ${w} ${h + 20}`} style={{ width:"100%", minWidth:"300px" }}>
        <defs>
          <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00ff88" stopOpacity="0.25"/>
            <stop offset="100%" stopColor="#00ff88" stopOpacity="0"/>
          </linearGradient>
        </defs>
        <polygon points={areaPoints} fill="url(#revGrad)"/>
        <polyline points={points} fill="none" stroke="#00ff88" strokeWidth="1.5" strokeLinejoin="round"/>
        {tickIndices.map(i => {
          const x = pad + (i / (data.length - 1)) * (w - pad * 2);
          const d = days[i];
          const label = d.toLocaleDateString("en-IN", { month:"short", day:"numeric" });
          return <text key={i} x={x} y={h + 15} textAnchor="middle" fontSize="8" fill="rgba(255,255,255,0.25)" fontFamily="Poppins,sans-serif">{label}</text>;
        })}
      </svg>
    </div>
  );
}

function StatusBarChart({ orders }) {
  const statuses = ["cancelled", "delivered", "shipped", "confirmed", "pending"];
  const counts = statuses.map(s => ({ s, count: orders.filter(o => o.status === s).length }));
  const maxC = Math.max(...counts.map(c => c.count), 1);
  const colors = { cancelled:"#ef4444", delivered:"#00ff88", shipped:"#a855f7", confirmed:"#3b82f6", pending:"#f59e0b" };
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:"8px" }}>
      {counts.map(({ s, count }) => (
        <div key={s} style={{ display:"flex", alignItems:"center", gap:"10px" }}>
          <span style={{ fontSize:"10px", color:"rgba(255,255,255,0.4)", width:"64px", textTransform:"capitalize", flexShrink:0 }}>{s}</span>
          <div style={{ flex:1, height:"14px", background:"rgba(255,255,255,0.04)", borderRadius:"4px", overflow:"hidden" }}>
            <div style={{ width:`${(count/maxC)*100}%`, height:"100%", background:colors[s], borderRadius:"4px", transition:"width 0.6s ease" }}/>
          </div>
          <span style={{ fontSize:"11px", fontWeight:700, color:colors[s], width:"24px", textAlign:"right" }}>{count}</span>
        </div>
      ))}
    </div>
  );
}

export default function Admin({ setProducts: setParentProducts, offers, setOffers }) {
  const { isAdmin, login, logout } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState(false);

  const [activeTab, setActiveTab]     = useState("overview");
  const [sidebarOpen, setSidebar]     = useState(true);
  const [orders, setOrders]           = useState([]);
  const [filterStatus, setFilter]     = useState("all");
  const [search, setSearch]           = useState("");
  const [selectedOrder, setSelected]  = useState(null);
  const [newStatus, setNewStatus]     = useState("");
  const [trackingId, setTracking]     = useState("");
  const [saving, setSaving]           = useState(false);

  const [products, setLocalProducts]  = useState([]);
  const [prodLoading, setProdLoading] = useState(false);
  const [prodError, setProdError]     = useState("");

  const [editingProduct, setEditProd] = useState(null);
  const [prodSaving, setProdSaving]   = useState(false);
  const [newImageFiles, setNewImageFiles] = useState([]);

  const [users, setUsers]             = useState([]);
  const [content, setContent]         = useState(DUMMY_CONTENT);
  const [contentSection, setCSect]    = useState("hero");
  const [contentSaved, setCntSaved]   = useState(false);
  const [newOffer, setNewOffer]       = useState({ text:"", time:"" });
  const [editId, setEditId]           = useState(null);
  const [editData, setEditData]       = useState({ text:"", time:"" });
  const [ordersRefreshing, setOrdersRefreshing] = useState(false);

  const [coupons, setCoupons]                 = useState([]);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [editingCoupon, setEditingCoupon]     = useState(null);
  const [coupon, setCoupon] = useState({
    code: "", discount: "", minOrderAmount: "", type: "percent", active: true, expiryDate: ""
  });

  const imgInputRef = useRef(null);

 const fetchOrders = () => {
  setOrdersRefreshing(true);

  // 👇 token nikaalo sahi jagah se
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  fetch(`${API}/api/orders`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
  },
})
    .then(res => res.json())
    .then(data => {
      const list = Array.isArray(data) ? data : data.orders || [];

      if (list.length >= 0) {
        const formatted = list.map(o => ({
          id: o._id,
          orderId: o.orderId,
          name: o.guestInfo?.name || o.user?.name || "Customer",
          phone: o.guestInfo?.phone || "N/A",
          address: o.guestInfo?.address || "N/A",
          amount: o.totalAmount,
          status: o.status || "pending",
          paymentMethod: o.paymentMethod || o.payment || "cod",
          paymentStatus: o.paymentStatus || "pending",
          item: o.items?.map(i => `${i.product?.name || "Product"} ×${i.quantity}`).join(", "),
          time: new Date(o.createdAt).toLocaleString("en-IN"),
          rawTime: o.createdAt,
          trackingId: o.trackingId || "",
        }));

        setOrders(formatted);
      }
    })
    .catch(err => console.error("Orders fetch error:", err))
    .finally(() => setOrdersRefreshing(false));
};

  useEffect(() => { fetchOrders(); }, []);

  useEffect(() => {
    setProdLoading(true);
    fetch(`${API}/api/products`)
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : data.products || [];
        setLocalProducts(list);
        if (setParentProducts) setParentProducts(list);
      })
      .catch(err => { console.error("Products fetch error:", err); setProdError("Products load nahi hue"); })
      .finally(() => setProdLoading(false));
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`${API}/api/offers/all`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setOffers(data); })
      .catch(err => console.error("Offers fetch error:", err));
  }, [isAdmin]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`${API}/api/coupons/admin`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setCoupons(data); })
      .catch(err => console.error("Coupons fetch error:", err));
  }, [isAdmin]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    fetch(`${API}/api/users`, { headers: { Authorization: `Bearer ${token}` } })
      .then(r => r.json())
      .then(data => { if (Array.isArray(data)) setUsers(data); })
      .catch(err => console.error("Users fetch error:", err));
  }, [isAdmin]);

  // ── Coupon handlers ──
  const openCreateCoupon = () => {
    setEditingCoupon(null);
    setCoupon({ code: "", discount: "", minOrderAmount: "", type: "percent", active: true, expiryDate: "" });
    setShowCouponModal(true);
  };

  const openEditCoupon = (c) => {
    setEditingCoupon(c);
    setCoupon({
      code: c.code, discount: c.discount, minOrderAmount: c.minOrderAmount || "",
      type: c.type || "percent", active: c.active, expiryDate: c.expiryDate ? c.expiryDate.slice(0,10) : "",
    });
    setShowCouponModal(true);
  };

  const createCoupon = async () => {
    const token = localStorage.getItem("token");
    try {
      const isEdit = !!editingCoupon;
      const url    = isEdit ? `${API}/api/coupons/admin/${editingCoupon._id}` : `${API}/api/coupons/admin`;
      const method = isEdit ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({
          code: coupon.code, discount: Number(coupon.discount),
          minOrderAmount: Number(coupon.minOrderAmount) || 0,
          type: coupon.type, active: coupon.active, expiryDate: coupon.expiryDate || null,
        }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.message || "Error"); return; }
      if (isEdit) { setCoupons(prev => prev.map(c => c._id === editingCoupon._id ? data : c)); }
      else        { setCoupons(prev => [data, ...prev]); }
      setShowCouponModal(false);
      setEditingCoupon(null);
    } catch (err) { alert("❌ Error: " + err.message); }
  };

  const toggleCouponStatus = async (id, currentActive) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/coupons/admin/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ active: !currentActive }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.message || "Error"); return; }
      setCoupons(prev => prev.map(c => c._id === id ? data : c));
    } catch (err) { alert("❌ Toggle failed: " + err.message); }
  };

  const deleteCouponById = async (id) => {
    if (!window.confirm("Is coupon ko delete karna chahte ho?")) return;
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/coupons/admin/${id}`, {
        method: "DELETE", headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setCoupons(prev => prev.filter(c => c._id !== id));
    } catch (err) { alert("❌ Delete failed: " + err.message); }
  };

  const handleLogin = async () => {
    const ok = await login(username, password);
    if (!ok) setLoginErr(true);
    else setLoginErr(false);
  };

  const handleAdd = async () => {
    if (!newOffer.text.trim()) return alert("Offer text required!");
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/offers`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text: newOffer.text.trim(), time: parseInt(newOffer.time) || null }),
      });
      const data = await res.json();
      setOffers(prev => [data, ...prev]);
      setNewOffer({ text: "", time: "" });
    } catch (err) { alert("Offer add failed: " + err.message); }
  };

  const handleOfferDel = async (id) => {
    const token = localStorage.getItem("token");
    try {
      await fetch(`${API}/api/offers/${id}`, { method: "DELETE", headers: { Authorization: `Bearer ${token}` } });
      setOffers(prev => prev.filter(o => (o._id || o.id) !== id));
    } catch (err) { alert("Delete failed: " + err.message); }
  };

  const handleEditStart = (o) => { setEditId(o._id || o.id); setEditData({ text: o.text, time: o.time || "" }); };

  const handleEditSave = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch(`${API}/api/offers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ text: editData.text, time: parseInt(editData.time) || null }),
      });
      const data = await res.json();
      setOffers(prev => prev.map(o => (o._id || o.id) === id ? data : o));
      setEditId(null);
    } catch (err) { alert("Save failed: " + err.message); }
  };

  const formatTimeFn = (s) => { if(!s) return "No timer"; return `${Math.floor(s/3600)}h ${Math.floor((s%3600)/60)}m ${s%60}s`; };

  const handleStatusUpdate = async () => {
    if (!selectedOrder || !newStatus) return;
    setSaving(true);
    try {
      const res = await fetch(`${API}/api/orders/${selectedOrder.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ status: newStatus, trackingId }),
      });
      if (!res.ok) throw new Error("Update failed");
      setOrders(prev => prev.map(o => o.id === selectedOrder.id ? { ...o, status: newStatus, trackingId } : o));
      setSelected(prev => ({ ...prev, status: newStatus, trackingId }));
    } catch (err) { alert("Status update failed"); }
    finally { setSaving(false); }
  };

  const openEditProduct = (p) => { setEditProd({ ...p }); setNewImageFiles([]); };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewImageFiles(prev => [...prev, ...files]);
    files.forEach(file => {
      const url = URL.createObjectURL(file);
      setEditProd(prev => ({ ...prev, images: [...(prev.images || []), url] }));
    });
  };

  const removeImage = (idx) => {
    const img = editingProduct.images[idx];
    if (img.startsWith("blob:")) {
      const blobUrls = (editingProduct.images || []).filter(i => i.startsWith("blob:"));
      const blobIdx = blobUrls.indexOf(img);
      if (blobIdx !== -1) setNewImageFiles(prev => prev.filter((_, i) => i !== blobIdx));
      URL.revokeObjectURL(img);
    }
    setEditProd(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== idx) }));
  };

  const saveProduct = async () => {
    if (!editingProduct) return;
    setProdSaving(true);
    try {
      const formData = new FormData();
      formData.append("name",       editingProduct.name        || "");
      formData.append("desc",       editingProduct.description || editingProduct.desc || "");
      formData.append("price",      editingProduct.price       || 0);
      formData.append("originalPrice", editingProduct.originalPrice || "");
      formData.append("stock",      editingProduct.stock       || 0);
      formData.append("category",   editingProduct.category    || "General");
      formData.append("isFeatured", editingProduct.isFeatured ? "true" : "false");
      newImageFiles.forEach(file => formData.append("images", file));

      const isNew  = !editingProduct._id && !editingProduct.id?.match(/^[a-f\d]{24}$/i);
      const prodId = editingProduct._id || editingProduct.id;
      const url    = isNew ? `${API}/api/products` : `${API}/api/products/${prodId}`;
      const method = isNew ? "POST" : "PUT";

      const res = await fetch(url, {
        method,
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: formData,
      });
      if (!res.ok) throw new Error(`Server error: ${res.status}`);
      const updated = await res.json();
      const savedProd = updated.product || updated;

      if (isNew) {
        setLocalProducts(prev => [savedProd, ...prev]);
        if (setParentProducts) setParentProducts(prev => [savedProd, ...prev]);
      } else {
        setLocalProducts(prev => prev.map(p => (p._id || p.id) === prodId ? savedProd : p));
        if (setParentProducts) setParentProducts(prev => prev.map(p => (p._id || p.id) === prodId ? savedProd : p));
      }
      setEditProd(null); setNewImageFiles([]); setProdError("");
    } catch (err) { alert("Save failed: " + err.message); }
    finally { setProdSaving(false); }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm("Product delete karna chahte ho?")) return;
    try {
      const res = await fetch(`${API}/api/products/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      if (!res.ok) throw new Error("Delete failed");
      setLocalProducts(prev => prev.filter(p => (p._id || p.id) !== id));
      if (setParentProducts) setParentProducts(prev => prev.filter(p => (p._id || p.id) !== id));
    } catch (err) { alert("Delete failed: " + err.message); }
  };

  const addNewProduct = () => {
    setEditProd({ _id: null, id: `new_${Date.now()}`, name:"", price:0, originalPrice:"", stock:0, description:"", images:[], category:"General", isFeatured:false });
    setNewImageFiles([]);
  };

  const updateStock = async (id, delta) => {
    const prod = products.find(p => (p._id || p.id) === id);
    if (!prod) return;
    const newStock = Math.max(0, (prod.stock || 0) + delta);
    setLocalProducts(prev => prev.map(p => (p._id || p.id) === id ? { ...p, stock: newStock } : p));
    try {
      await fetch(`${API}/api/products/${id}/stock`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ stock: newStock }),
      });
    } catch (err) { console.error("Stock update error:", err); }
  };

  const saveContent = () => { setCntSaved(true); setTimeout(() => setCntSaved(false), 2200); };

  // ── Computed stats ──
  const pendingCount    = orders.filter(o => o.status === "pending").length;
  const totalRevenue    = orders.filter(o => o.status === "delivered").reduce((s, o) => s + (o.amount || 0), 0);
  const totalPayments   = orders.reduce((s, o) => s + (o.amount || 0), 0);
  const completedAmt    = orders.filter(o => o.paymentStatus === "completed" || o.status === "delivered").reduce((s, o) => s + (o.amount || 0), 0);
  const pendingAmt      = orders.filter(o => o.paymentStatus === "pending"   || o.status === "pending").reduce((s, o) => s + (o.amount || 0), 0);
  const cancelledAmt    = orders.filter(o => o.status === "cancelled").reduce((s, o) => s + (o.amount || 0), 0);
  const failedAmt       = orders.filter(o => o.paymentStatus === "failed").reduce((s, o) => s + (o.amount || 0), 0);

  const filteredOrders  = orders.filter(o =>
    (filterStatus === "all" || o.status === filterStatus) &&
    (!search || o.name?.toLowerCase().includes(search.toLowerCase()) || o.id?.toLowerCase().includes(search.toLowerCase()))
  );

  const TABS = [
    { id:"overview", icon:"⊞", label:"Overview" },
    { id:"orders",   icon:"📦", label:"Orders", badge:pendingCount },
    { id:"products", icon:"🛍️", label:"Products & Stock" },
    { id:"content",  icon:"✏️", label:"Content" },
    { id:"offers",   icon:"🏷️", label:"Offers" },
    { id:"coupon",   icon:"🎟️", label:"Coupon" },
    { id:"carousel", icon:"🎞️", label:"Carousel" },
    { id:"messages", icon:"💬", label:"Messages" },
    { id:"sales",    icon:"💰", label:"Sales" },
    { id:"users",    icon:"👥", label:"Users" }
  ];

  // ── LOGIN GATE ──
  if (!isAdmin) return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;700;800&display=swap');
        .alp{min-height:100vh;background:linear-gradient(160deg,#0a0a09 0%,#040d08 60%,#001a0a 100%);display:flex;align-items:center;justify-content:center;font-family:'Poppins',sans-serif;padding:32px 24px;}
        .alc{background:#0d0d0b;border:1px solid rgba(0,255,136,0.25);border-radius:18px;padding:48px 40px;width:100%;max-width:400px;text-align:center;}
        .al-ic{font-size:44px;margin-bottom:12px;display:block;}
        .al-t{font-size:22px;font-weight:900;background:linear-gradient(135deg,#fff,#00ff88);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;font-family:'Impact','Arial Black',sans-serif;text-transform:uppercase;letter-spacing:3px;margin-bottom:4px;}
        .al-s{font-size:11px;color:rgba(255,255,255,0.25);letter-spacing:2px;margin-bottom:32px;}
        .al-div{height:1px;background:rgba(0,255,136,0.12);margin-bottom:28px;}
        .al-lbl{display:block;text-align:left;font-size:11px;font-weight:700;color:rgba(0,255,136,0.6);letter-spacing:2px;text-transform:uppercase;margin-bottom:7px;}
        .al-inp{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(0,255,136,0.15);border-radius:8px;padding:13px 16px;color:#fff;font-size:14px;margin-bottom:18px;outline:none;transition:border-color 0.2s;box-sizing:border-box;font-family:'Poppins',sans-serif;}
        .al-inp:focus{border-color:rgba(0,255,136,0.55);}
        .al-err{background:rgba(255,69,69,0.08);border:1px solid rgba(255,69,69,0.25);color:#ff6b6b;font-size:12px;padding:10px 14px;border-radius:7px;margin-bottom:16px;}
        .al-btn{width:100%;background:linear-gradient(135deg,#2e875d,#00cc6a);color:#0a0a09;font-weight:800;font-size:14px;letter-spacing:2px;text-transform:uppercase;padding:14px;border-radius:8px;border:none;cursor:pointer;transition:opacity 0.2s,transform 0.15s;font-family:'Poppins',sans-serif;}
        .al-btn:hover{opacity:0.88;transform:translateY(-2px);}
      `}</style>
      <div className="alp"><div className="alc">
        <span className="al-ic">⚙️</span>
        <div className="al-t">Admin Panel</div>
        <div className="al-s">IronFuel Nutrition</div>
        <div className="al-div"/>
        <label className="al-lbl">Email</label>
        <input className="al-inp" placeholder="Enter email" value={username} onChange={e=>setUsername(e.target.value)}/>
        <label className="al-lbl">Password</label>
        <input className="al-inp" type="password" placeholder="Enter password" value={password} onChange={e=>setPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()}/>
        {loginErr && <div className="al-err">❌ Invalid email or password</div>}
        <button className="al-btn" onClick={handleLogin}>Login to Admin</button>
      </div></div>
    </>
  );

  // ── DASHBOARD ──
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');
        *{box-sizing:border-box;}
        .adm{display:flex;min-height:100vh;background:#060d09;font-family:'Poppins',sans-serif;color:#e8f5ee;}
        .adm-sb{width:${sidebarOpen?230:64}px;min-height:100vh;background:rgba(0,20,10,0.98);border-right:1px solid rgba(0,255,136,0.08);display:flex;flex-direction:column;padding:20px 0;flex-shrink:0;transition:width 0.25s;overflow:hidden;}
        .adm-logo{display:flex;align-items:center;justify-content:center;padding:10px 0;}
        .adm-logo-img{width:210px;height:auto;object-fit:contain;}
        .adm-mark{width:30px;height:30px;border-radius:7px;background:linear-gradient(135deg,#00ff88,#00994d);display:flex;align-items:center;justify-content:center;font-size:14px;flex-shrink:0;}
        .adm-brand{font-family:'Syne',sans-serif;font-size:14px;font-weight:800;color:#fff;white-space:nowrap;}
        .adm-brand span{color:#00ff88;}
        .adm-nav{display:flex;align-items:center;gap:10px;padding:9px 16px;cursor:pointer;font-size:12px;font-weight:500;color:rgba(255,255,255,0.4);transition:all 0.15s;border-left:2px solid transparent;white-space:nowrap;}
        .adm-nav:hover{color:#fff;background:rgba(34,151,96,0.04);}
        .adm-nav.act{color:#00ff88;background:rgba(0,255,136,0.08);border-left-color:#00ff88;}
        .adm-nav-ic{font-size:15px;flex-shrink:0;}
        .adm-badge{margin-left:auto;background:#f59e0b;color:#000;font-size:9px;font-weight:700;padding:1px 5px;border-radius:8px;}
        .adm-foot{margin-top:auto;padding:14px 16px 0;border-top:1px solid rgba(0,255,136,0.07);}
        .adm-user{display:flex;align-items:center;gap:8px;margin-bottom:8px;}
        .adm-av{width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,#00ff88,#006633);display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;color:#001a0a;flex-shrink:0;}
        .adm-uname{font-size:11px;color:rgba(255,255,255,0.5);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
        .adm-logout{width:100%;padding:7px;border-radius:7px;background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.18);color:#f87171;font-size:11px;cursor:pointer;font-family:'Poppins',sans-serif;}
        .adm-main{flex:1;display:flex;flex-direction:column;overflow-x:hidden;}
        .adm-top{display:flex;align-items:center;justify-content:space-between;padding:14px 24px;border-bottom:1px solid rgba(0,255,136,0.06);background:rgba(6,13,9,0.95);position:sticky;top:0;z-index:50;}
        .adm-page-title{font-family:'Syne',sans-serif;font-size:17px;font-weight:700;color:#fff;}
        .adm-top-r{display:flex;align-items:center;gap:10px;}
        .adm-notif{width:30px;height:30px;border-radius:7px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.4);display:flex;align-items:center;justify-content:center;font-size:13px;cursor:pointer;position:relative;}
        .adm-dot{position:absolute;top:5px;right:5px;width:6px;height:6px;border-radius:50%;background:#f59e0b;border:1.5px solid #060d09;}
        .adm-col-btn{width:28px;height:28px;border-radius:6px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.4);font-size:11px;cursor:pointer;display:flex;align-items:center;justify-content:center;}
        .adm-content{padding:20px 24px;flex:1;}
        .adm-stats{display:grid;grid-template-columns:repeat(4,1fr);gap:12px;margin-bottom:20px;}
        .adm-stat{background:rgba(0,20,10,0.8);border:1px solid rgba(0,255,136,0.09);border-radius:12px;padding:16px;position:relative;overflow:hidden;cursor:pointer;transition:transform 0.2s,border-color 0.2s;}
        .adm-stat:hover{transform:translateY(-2px);border-color:rgba(0,255,136,0.22);}
        .adm-stat::before{content:'';position:absolute;top:0;left:0;right:0;height:2px;background:var(--ac,#00ff88);opacity:0.65;}
        .adm-stat-ic{font-size:20px;margin-bottom:10px;display:block;}
        .adm-stat-val{font-family:'Syne',sans-serif;font-size:22px;font-weight:800;color:#fff;line-height:1;}
        .adm-stat-lbl{font-size:10px;color:rgba(255,255,255,0.28);margin-top:3px;letter-spacing:0.06em;text-transform:uppercase;}
        .adm-stat-d{font-size:10px;margin-top:6px;font-weight:500;}
        .adm-panel{background:rgba(0,20,10,0.8);border:1px solid rgba(0,255,136,0.07);border-radius:12px;padding:18px;}
        .adm-ptitle{font-size:12px;font-weight:600;color:rgba(255,255,255,0.55);letter-spacing:0.04em;margin-bottom:14px;display:flex;justify-content:space-between;align-items:center;}
        .adm-ptitle span,.adm-ptitle a{font-size:10px;color:#00ff88;cursor:pointer;text-decoration:none;font-weight:400;}
        .adm-row2{display:grid;grid-template-columns:1.6fr 1fr;gap:14px;margin-bottom:16px;}
        .adm-row3{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
        .adm-tbl{width:100%;border-collapse:collapse;}
        .adm-tbl th{text-align:left;font-size:9px;font-weight:600;color:rgba(255,255,255,0.2);letter-spacing:0.1em;text-transform:uppercase;padding:0 10px 8px 0;border-bottom:1px solid rgba(0,255,136,0.05);}
        .adm-tbl td{padding:10px 10px 10px 0;border-bottom:1px solid rgba(0,255,136,0.03);font-size:11px;color:rgba(255,255,255,0.65);vertical-align:middle;}
        .adm-tbl tr:last-child td{border-bottom:none;}
        .adm-tbl tr{cursor:pointer;}
        .adm-tbl tr:hover td{background:rgba(0,255,136,0.025);}
        .oname{font-size:12px;color:#fff;font-weight:500;}
        .oid{font-size:10px;color:rgba(255,255,255,0.28);}
        .adm-filters{display:flex;gap:6px;margin-bottom:14px;flex-wrap:wrap;}
        .adm-ftab{padding:4px 12px;border-radius:16px;font-size:10px;font-weight:500;cursor:pointer;transition:all 0.15s;border:1px solid rgba(255,255,255,0.07);color:rgba(255,255,255,0.35);background:transparent;font-family:'Poppins',sans-serif;}
        .adm-ftab.act{background:rgba(0,255,136,0.1);border-color:rgba(0,255,136,0.3);color:#00ff88;}
        .adm-search{width:100%;padding:9px 14px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:8px;color:#fff;font-size:12px;outline:none;margin-bottom:12px;font-family:'Poppins',sans-serif;transition:border-color 0.2s;}
        .adm-search:focus{border-color:rgba(0,255,136,0.3);}
        .adm-search::placeholder{color:rgba(255,255,255,0.2);}
        .adm-inp{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(0,255,136,0.15);border-radius:8px;padding:10px 14px;color:#fff;font-size:12px;outline:none;margin-bottom:10px;font-family:'Poppins',sans-serif;box-sizing:border-box;transition:border-color 0.2s;}
        .adm-inp:focus{border-color:rgba(0,255,136,0.4);}
        .adm-inp::placeholder{color:rgba(255,255,255,0.2);}
        .adm-ta{width:100%;background:rgba(255,255,255,0.04);border:1px solid rgba(0,255,136,0.15);border-radius:8px;padding:10px 14px;color:#fff;font-size:12px;outline:none;margin-bottom:10px;font-family:'Poppins',sans-serif;box-sizing:border-box;resize:vertical;min-height:72px;}
        .adm-ta:focus{border-color:rgba(0,255,136,0.4);}
        .adm-btn-g{padding:8px 18px;border-radius:8px;background:#00ff88;color:#001a0a;font-weight:700;font-size:12px;border:none;cursor:pointer;font-family:'Poppins',sans-serif;transition:background 0.2s;}
        .adm-btn-g:hover{background:#00e87a;}
        .adm-btn-g:disabled{opacity:0.5;cursor:not-allowed;}
        .adm-btn-o{padding:7px 14px;border-radius:7px;background:transparent;border:1px solid rgba(255,255,255,0.1);color:rgba(255,255,255,0.5);font-size:11px;cursor:pointer;font-family:'Poppins',sans-serif;transition:all 0.15s;text-align:left;width:100%;margin-bottom:7px;}
        .adm-btn-o:hover{border-color:rgba(0,255,136,0.2);color:#00ff88;}
        .adm-btn-sm{padding:5px 12px;border-radius:6px;font-size:11px;font-weight:600;cursor:pointer;border:none;font-family:'Poppins',sans-serif;}
        .btn-edit{background:rgba(59,130,246,0.15);color:#3b82f6;}
        .btn-del{background:rgba(239,68,68,0.12);color:#ef4444;}
        .btn-save{background:rgba(0,255,136,0.15);color:#00ff88;}
        .btn-cancel{background:rgba(255,255,255,0.06);color:rgba(255,255,255,0.5);}
        .prod-card{background:rgba(255,255,255,0.03);border:1px solid rgba(0,255,136,0.08);border-radius:10px;padding:16px;margin-bottom:12px;}
        .prod-card-top{display:flex;align-items:center;gap:12px;margin-bottom:12px;}
        .prod-thumb{width:44px;height:44px;border-radius:9px;background:rgba(0,255,136,0.07);border:1px solid rgba(0,255,136,0.1);object-fit:cover;flex-shrink:0;}
        .prod-thumb-ph{width:44px;height:44px;border-radius:9px;background:rgba(0,255,136,0.07);border:1px solid rgba(0,255,136,0.1);display:flex;align-items:center;justify-content:center;font-size:20px;flex-shrink:0;}
        .prod-name{font-size:13px;color:#fff;font-weight:600;}
        .prod-cat{font-size:10px;color:rgba(255,255,255,0.3);margin-top:2px;}
        .prod-acts{display:flex;gap:6px;margin-left:auto;}
        .stock-ctrl{display:flex;align-items:center;gap:8px;}
        .stock-btn{width:26px;height:26px;border-radius:6px;background:rgba(255,255,255,0.06);border:1px solid rgba(255,255,255,0.1);color:#fff;font-size:16px;cursor:pointer;display:flex;align-items:center;justify-content:center;line-height:1;}
        .stock-num{font-size:14px;font-weight:700;min-width:32px;text-align:center;}
        .img-grid{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:10px;}
        .img-tw{position:relative;display:inline-block;}
        .img-th{width:68px;height:68px;border-radius:8px;object-fit:cover;border:1px solid rgba(0,255,136,0.15);}
        .img-del{position:absolute;top:-5px;right:-5px;width:18px;height:18px;border-radius:50%;background:#ef4444;border:none;color:#fff;font-size:10px;cursor:pointer;display:flex;align-items:center;justify-content:center;font-weight:700;}
        .img-add{width:68px;height:68px;border-radius:8px;border:1.5px dashed rgba(0,255,136,0.25);display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer;color:rgba(0,255,136,0.5);font-size:10px;gap:3px;transition:border-color 0.2s;}
        .img-add:hover{border-color:rgba(0,255,136,0.5);}
        .cnt-tabs{display:flex;gap:6px;margin-bottom:18px;flex-wrap:wrap;}
        .cnt-tab{padding:6px 16px;border-radius:20px;font-size:11px;font-weight:500;cursor:pointer;border:1px solid rgba(255,255,255,0.08);color:rgba(255,255,255,0.4);background:transparent;font-family:'Poppins',sans-serif;transition:all 0.15s;}
        .cnt-tab.act{background:rgba(0,255,136,0.1);border-color:rgba(0,255,136,0.3);color:#00ff88;}
        .f-lbl{font-size:10px;font-weight:600;color:rgba(0,255,136,0.5);letter-spacing:0.1em;text-transform:uppercase;margin-bottom:6px;display:block;}
        .cnt-saved{display:inline-flex;align-items:center;gap:5px;background:rgba(0,255,136,0.1);color:#00ff88;font-size:11px;padding:4px 12px;border-radius:6px;margin-left:10px;}
        .offer-item{background:rgba(255,255,255,0.03);border:1px solid rgba(0,255,136,0.08);border-radius:8px;padding:12px 14px;margin-bottom:8px;}
        .offer-text{font-size:12px;color:#fff;}
        .offer-timer{font-size:10px;color:rgba(0,255,136,0.5);margin-top:3px;}
        .offer-acts{display:flex;gap:6px;margin-top:10px;}
        .leg-row{display:flex;align-items:center;gap:8px;margin-bottom:8px;font-size:11px;}
        .leg-dot{width:7px;height:7px;border-radius:50%;flex-shrink:0;}
        .prow{display:flex;align-items:center;gap:10px;padding:9px 0;border-bottom:1px solid rgba(0,255,136,0.04);}
        .prow:last-child{border-bottom:none;}
        .pimg{width:36px;height:36px;border-radius:7px;object-fit:cover;border:1px solid rgba(0,255,136,0.1);flex-shrink:0;}
        .pimg-ph{width:36px;height:36px;border-radius:7px;background:rgba(0,255,136,0.07);border:1px solid rgba(0,255,136,0.1);display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0;}
        .pname{font-size:12px;color:#fff;font-weight:500;}
        .pprice{font-size:10px;color:rgba(255,255,255,0.3);margin-top:1px;}
        .adm-overlay{position:fixed;inset:0;background:rgba(0,0,0,0.5);z-index:199;opacity:0;pointer-events:none;transition:opacity 0.3s;}
        .adm-overlay.open{opacity:1;pointer-events:all;}
        .adm-drawer{position:fixed;top:0;right:0;width:340px;height:100vh;background:#081408;border-left:1px solid rgba(0,255,136,0.1);z-index:200;padding:24px;transform:translateX(100%);transition:transform 0.3s cubic-bezier(.4,0,.2,1);overflow-y:auto;}
        .adm-drawer.open{transform:translateX(0);}
        .d-close{position:absolute;top:14px;right:14px;width:26px;height:26px;border-radius:5px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.09);color:rgba(255,255,255,0.4);cursor:pointer;font-size:12px;display:flex;align-items:center;justify-content:center;}
        .d-id{font-size:10px;color:rgba(0,255,136,0.45);letter-spacing:0.1em;margin-bottom:3px;}
        .d-name{font-family:'Syne',sans-serif;font-size:18px;font-weight:700;color:#fff;margin-bottom:12px;}
        .d-row{display:flex;justify-content:space-between;padding:9px 0;border-bottom:1px solid rgba(0,255,136,0.05);font-size:11px;}
        .d-k{color:rgba(255,255,255,0.3);}
        .d-v{color:rgba(255,255,255,0.8);font-weight:500;text-align:right;max-width:180px;}
        .d-sec{margin:16px 0 8px;font-size:9px;font-weight:600;color:rgba(0,255,136,0.35);letter-spacing:0.12em;text-transform:uppercase;}
        .d-select{width:100%;padding:8px 10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);border-radius:7px;color:#fff;font-size:12px;outline:none;margin-bottom:8px;font-family:'Poppins',sans-serif;}
        .d-input{width:100%;padding:8px 10px;background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.09);border-radius:7px;color:#fff;font-size:12px;outline:none;margin-bottom:12px;font-family:'Poppins',sans-serif;box-sizing:border-box;}
        .d-input::placeholder{color:rgba(255,255,255,0.18);}
        .sec-div{height:1px;background:rgba(0,255,136,0.06);margin:14px 0;}
        .prod-loading{text-align:center;padding:40px;color:rgba(255,255,255,0.25);font-size:13px;}
        .prod-err{background:rgba(239,68,68,0.08);border:1px solid rgba(239,68,68,0.2);color:#f87171;font-size:12px;padding:10px 14px;border-radius:8px;margin-bottom:14px;}
        .pay-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin-bottom:14px;}
        .pay-card{background:rgba(255,255,255,0.03);border:1px solid rgba(0,255,136,0.07);border-radius:10px;padding:14px;}
        .pay-card-lbl{font-size:9px;color:rgba(255,255,255,0.3);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:4px;}
        .pay-card-val{font-family:'Syne',sans-serif;font-size:16px;font-weight:800;}
        .pay-card-sub{font-size:9px;color:rgba(255,255,255,0.2);margin-top:3px;}
        .pay-sum-row{display:flex;justify-content:space-between;align-items:center;padding:8px 0;border-bottom:1px solid rgba(0,255,136,0.04);font-size:11px;}
        .pay-sum-row:last-child{border-bottom:none;}
        .recent-order-card{background:rgba(255,255,255,0.025);border:1px solid rgba(0,255,136,0.06);border-radius:9px;padding:13px 14px;margin-bottom:8px;}
        .roc-top{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;}
        .roc-id{font-size:11px;font-weight:700;color:#00ff88;}
        .roc-time{font-size:10px;color:rgba(255,255,255,0.25);}
        .roc-grid{display:grid;grid-template-columns:1fr 1fr;gap:6px;}
        .roc-field-lbl{font-size:9px;color:rgba(255,255,255,0.25);text-transform:uppercase;letter-spacing:0.06em;}
        .roc-field-val{font-size:11px;color:rgba(255,255,255,0.8);font-weight:500;margin-top:1px;}
        .shiprocket-box{background:rgba(0,20,10,0.8);border:1px solid rgba(0,255,136,0.12);border-radius:12px;padding:20px;display:flex;justify-content:space-between;align-items:center;gap:16px;flex-wrap:wrap;}
        .sr-left{display:flex;align-items:center;gap:14px;}
        .sr-ic{width:44px;height:44px;border-radius:10px;background:linear-gradient(135deg,rgba(0,255,136,0.15),rgba(0,200,100,0.08));border:1px solid rgba(0,255,136,0.2);display:flex;align-items:center;justify-content:center;font-size:22px;flex-shrink:0;}
        .sr-title{font-family:'Syne',sans-serif;font-size:15px;font-weight:700;color:#fff;}
        .sr-sub{font-size:11px;color:rgba(255,255,255,0.35);margin-top:3px;}
        .sr-desc{font-size:11px;color:rgba(255,255,255,0.25);margin-top:6px;max-width:480px;line-height:1.5;}
        @media(max-width:860px){
          .adm-stats,.pay-grid{grid-template-columns:repeat(2,1fr);}
          .adm-row2,.adm-row3{grid-template-columns:1fr;}
          .adm-sb{width:60px!important;}
          .adm-brand,.adm-uname,.adm-logout{display:none;}
          .adm-nav>span:last-of-type{display:none;}
          .adm-drawer{width:100%;}
          .shiprocket-box{flex-direction:column;align-items:flex-start;}
        }
      `}</style>

      <div className="adm">

        {/* SIDEBAR */}
        <aside className="adm-sb">
          <div className="adm-logo">
            <img src={logo} alt="IronFuel Nutrition Logo" className="adm-logo-img"/>
          </div>
          {TABS.map(tab=>(
            <div key={tab.id} className={`adm-nav ${activeTab===tab.id?"act":""}`} onClick={()=>setActiveTab(tab.id)}>
              <span className="adm-nav-ic">{tab.icon}</span>
              <span>{tab.label}</span>
              {tab.badge>0 && <span className="adm-badge">{tab.badge}</span>}
            </div>
          ))}
          <div style={{marginTop:"8px",borderTop:"1px solid rgba(0,255,136,0.05)",paddingTop:"8px"}}>
            <Link to="/" style={{textDecoration:"none"}}>
              <div className="adm-nav"><span className="adm-nav-ic">🌐</span><span>View Site</span></div>
            </Link>
          </div>
          <div className="adm-foot">
            <div className="adm-user"><div className="adm-av">A</div><div className="adm-uname">Admin</div></div>
            <button className="adm-logout" onClick={logout}>🚪 Logout</button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="adm-main">
          <div className="adm-top">
            <div style={{display:"flex",alignItems:"center",gap:"10px"}}>
              <button className="adm-col-btn" onClick={()=>setSidebar(p=>!p)}>{sidebarOpen?"◀":"▶"}</button>
              <div className="adm-page-title">{{overview:"Dashboard",orders:"Orders",products:"Products & Stock",content:"Content Manager",offers:"Offers",coupon:"Coupon",carousel:"Carousel",messages:"Messages",sales:"Sales",users:"Users"}[activeTab]}</div>
            </div>
            <div className="adm-top-r">
              <LiveClock/>
              <div className="adm-notif">🔔{pendingCount>0&&<div className="adm-dot"/>}</div>
            </div>
          </div>

          <div className="adm-content">

            {/* ── OVERVIEW ── */}
            {activeTab==="overview" && <>
              <div className="adm-stats">
                {[
                  { ic:"📦", val:orders.length,                                    lbl:"Total Orders",    d:`${pendingCount} pending`,         ac:"#3b82f6" },
                  { ic:"💰", val:`₹${totalRevenue.toLocaleString("en-IN")}`,       lbl:"Total Revenue",   d:"Delivered orders",                 ac:"#00ff88" },
                  { ic:"🛍️", val:products.length,                                 lbl:"Products",        d:`${products.filter(p=>p.stock===0).length} out of stock`, ac:"#a855f7" },
                  { ic:"👥", val:users.length,                                     lbl:"Users",           d:"Registered",                       ac:"#f59e0b" },
                ].map((s,i)=>(
                  <div className="adm-stat" key={i} style={{"--ac":s.ac}}>
                    <span className="adm-stat-ic">{s.ic}</span>
                    <div className="adm-stat-val">{s.val}</div>
                    <div className="adm-stat-lbl">{s.lbl}</div>
                    <div className="adm-stat-d" style={{color:s.ac}}>{s.d}</div>
                  </div>
                ))}
              </div>

              <div className="adm-panel" style={{marginBottom:"16px"}}>
                <div className="adm-ptitle">💳 Payment Overview</div>
                <div className="pay-grid">
                  {[
                    { lbl:"Total Payments",  val:`₹${totalPayments.toLocaleString("en-IN")}`,  sub:"Total payment amount",    color:"#fff" },
                    { lbl:"Completed",       val:`₹${completedAmt.toLocaleString("en-IN")}`,   sub:"Successfully processed",  color:"#00ff88" },
                    { lbl:"Pending",         val:`₹${pendingAmt.toLocaleString("en-IN")}`,     sub:"Pending status",           color:"#f59e0b" },
                    { lbl:"Cancelled",       val:`₹${cancelledAmt.toLocaleString("en-IN")}`,   sub:"Refunded/cancelled",       color:"#ef4444" },
                  ].map((c,i)=>(
                    <div className="pay-card" key={i}>
                      <div className="pay-card-lbl">{c.lbl}</div>
                      <div className="pay-card-val" style={{color:c.color}}>{c.val}</div>
                      <div className="pay-card-sub">{c.sub}</div>
                    </div>
                  ))}
                </div>
                <div style={{borderTop:"1px solid rgba(0,255,136,0.06)",paddingTop:"12px"}}>
                  <div style={{fontSize:"10px",fontWeight:600,color:"rgba(255,255,255,0.3)",letterSpacing:"0.08em",marginBottom:"8px"}}>PAYMENT STATUS SUMMARY</div>
                  {[
                    { lbl:"Completed Amount",   val:`₹${completedAmt.toLocaleString("en-IN")}`,  color:"#00ff88" },
                    { lbl:"Pending Amount",     val:`₹${pendingAmt.toLocaleString("en-IN")}`,    color:"#f59e0b" },
                    { lbl:"Cancelled/Refunded", val:`₹${cancelledAmt.toLocaleString("en-IN")}`,  color:"#ef4444" },
                    { lbl:"Failed Amount",      val:`₹${failedAmt.toLocaleString("en-IN")}`,     color:"#6b7280" },
                  ].map((r,i)=>(
                    <div className="pay-sum-row" key={i}>
                      <span style={{color:"rgba(255,255,255,0.4)"}}>{r.lbl}</span>
                      <span style={{color:r.color,fontWeight:700}}>{r.val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="adm-row2" style={{marginBottom:"16px"}}>
                <div className="adm-panel">
                  <div className="adm-ptitle">
                    Recent Orders
                    <span onClick={fetchOrders} style={{display:"inline-flex",alignItems:"center",gap:"4px",cursor:"pointer",opacity:ordersRefreshing?0.5:1}}>
                      {ordersRefreshing ? "⏳" : "🔄"} Refresh
                    </span>
                  </div>
                  {orders.slice(0, 5).map(o => (
                    <div className="recent-order-card" key={o.id} onClick={()=>{setSelected(o);setNewStatus(o.status);setTracking(o.trackingId||"");}}>
                      <div className="roc-top">
                        <span className="roc-id">Order #{o.orderId}</span>
                        <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
                          <span className="roc-time">{o.time}</span>
                          <StatusBadge status={o.status}/>
                        </div>
                      </div>
                      <div className="roc-grid">
                        <div><div className="roc-field-lbl">Customer</div><div className="roc-field-val">{o.name}</div></div>
                        <div><div className="roc-field-lbl">Amount</div><div className="roc-field-val" style={{color:"#00ff88"}}>₹{o.amount?.toLocaleString("en-IN")}</div></div>
                        <div><div className="roc-field-lbl">Contact</div><div className="roc-field-val">{o.phone}</div></div>
                        <div><div className="roc-field-lbl">Payment</div><div className="roc-field-val" style={{textTransform:"uppercase",fontSize:"10px"}}>{o.paymentMethod}</div></div>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && <p style={{color:"rgba(255,255,255,0.2)",fontSize:"12px",textAlign:"center",padding:"20px 0"}}>Koi order nahi mila</p>}
                </div>
                <div className="adm-panel">
                  <div className="adm-ptitle">Orders by Status <span style={{color:"rgba(255,255,255,0.25)",fontSize:"9px",fontWeight:400}}>* count</span></div>
                  <StatusBarChart orders={orders}/>
                </div>
              </div>

              <div className="adm-panel" style={{marginBottom:"16px"}}>
                <div className="adm-ptitle">
                  📈 Revenue (Last 30 Days)
                  <span style={{color:"rgba(255,255,255,0.25)",fontSize:"10px",fontWeight:400}}>Daily revenue from delivered orders</span>
                </div>
                <RevenueChart orders={orders}/>
              </div>

              <div className="shiprocket-box" style={{marginBottom:"16px"}}>
                <div className="sr-left">
                  <div className="sr-ic">🚀</div>
                  <div>
                    <div className="sr-title">Shiprocket Integration</div>
                    <div className="sr-sub">Manage shipping, track orders, and configure Shiprocket settings</div>
                    <div className="sr-desc">Integrate with Shiprocket to automate your shipping workflow, generate labels, and provide real-time tracking information to customers.</div>
                  </div>
                </div>
                <a href="https://app.shiprocket.in" target="_blank" rel="noreferrer" style={{padding:"10px 22px",borderRadius:"8px",background:"linear-gradient(135deg,#2e875d,#00cc6a)",color:"#001a0a",fontWeight:700,fontSize:"12px",textDecoration:"none",whiteSpace:"nowrap",fontFamily:"Poppins,sans-serif",display:"inline-flex",alignItems:"center",gap:"6px"}}>
                  🚢 Manage Shipping
                </a>
              </div>
            </>}

            {/* ── ORDERS ── */}
            {activeTab==="orders" && (
              <div className="adm-panel">
                <input className="adm-search" placeholder="🔍  Customer name ya Order ID..." value={search} onChange={e=>setSearch(e.target.value)}/>
                <div className="adm-filters">
                  {["all","pending","confirmed","shipped","delivered","cancelled"].map(s=>(
                    <button key={s} className={`adm-ftab ${filterStatus===s?"act":""}`} onClick={()=>setFilter(s)}>
                      {s==="all"?`All (${orders.length})`:`${STATUS_META[s].label} (${orders.filter(o=>o.status===s).length})`}
                    </button>
                  ))}
                </div>
                <table className="adm-tbl">
                  <thead><tr><th>Order ID</th><th>Customer</th><th>Item</th><th>Amount</th><th>Status</th><th>Time</th></tr></thead>
                  <tbody>
                    {filteredOrders.length===0
                      ? <tr><td colSpan={6} style={{textAlign:"center",padding:"32px",color:"rgba(255,255,255,0.2)"}}>Koi order nahi mila</td></tr>
                      : filteredOrders.map(o=>(
                        <tr key={o.id} onClick={()=>{setSelected(o);setNewStatus(o.status);setTracking(o.trackingId||"");}}>
                         <td style={{color:"rgba(0,255,136,0.55)",fontSize:"10px"}}> ORDER #{o.orderId || o.id} </td>
                          <td><div className="oname">{o.name}</div><div className="oid">{o.phone}</div></td>
                          <td style={{color:"rgba(255,255,255,0.45)"}}>{o.item}</td>
                          <td style={{color:"#00ff88",fontWeight:600}}>₹{o.amount?.toLocaleString("en-IN")}</td>
                          <td><StatusBadge status={o.status}/></td>
                          <td style={{color:"rgba(255,255,255,0.28)"}}>{o.time}</td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            )}



            {/* ── PRODUCTS & STOCK ── */}



            {activeTab==="products" && (
              <div className="adm-panel">
                <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"10px"}}>
                  <div>
                    <div style={{fontSize:"16px",fontWeight:700,color:"#fff"}}>Product Management</div>
                    <div style={{fontSize:"11px",color:"rgba(255,255,255,0.3)",marginTop:"2px"}}>A list of your products.</div>
                  </div>
                  <div style={{display:"flex",gap:"8px"}}>
                    <button className="adm-btn-g" style={{background:"transparent",border:"1px solid rgba(0,255,136,0.3)",color:"#00ff88"}} onClick={()=>{setProdLoading(true);fetch(`${API}/api/products`).then(r=>r.json()).then(d=>{const l=Array.isArray(d)?d:d.products||[];setLocalProducts(l);if(setParentProducts)setParentProducts(l);}).finally(()=>setProdLoading(false));}}>🔄 Refresh Products</button>
                    <button className="adm-btn-g" onClick={addNewProduct}>➕ Add Product</button>
                  </div>
                </div>
                {prodError && <div className="prod-err">⚠️ {prodError}</div>}
                {prodLoading
                  ? <div className="prod-loading">⏳ Products load ho rahe hain...</div>
                  : <div style={{overflowX:"auto"}}>
                      <table className="adm-tbl" style={{minWidth:"700px"}}>
                        <thead>
                          <tr>
                            <th style={{width:"60px"}}>Image</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Stock</th>
                            <th style={{width:"120px"}}>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {products.length===0
                            ? <tr><td colSpan={7} style={{textAlign:"center",padding:"32px",color:"rgba(255,255,255,0.2)"}}>Koi product nahi mila</td></tr>
                            : products.map(p => {
                              const pid = p._id || p.id;
                              const hasDiscount = p.originalPrice && p.originalPrice > p.price;
                              const discountPct = hasDiscount ? Math.round((1 - p.price/p.originalPrice)*100) : 0;
                              return (
                                <tr key={pid}>
                                  <td>
                                    {p.images?.[0]
                                      ? <img src={getImgSrc(p.images[0])} alt={p.name} style={{width:"44px",height:"44px",borderRadius:"8px",objectFit:"cover",border:"1px solid rgba(0,255,136,0.15)"}} onError={e=>e.target.style.opacity="0.2"}/>
                                      : <div style={{width:"44px",height:"44px",borderRadius:"8px",background:"rgba(0,255,136,0.07)",border:"1px solid rgba(0,255,136,0.1)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"20px"}}>📦</div>
                                    }
                                  </td>
                                  <td>
                                    <div style={{fontSize:"13px",color:"#fff",fontWeight:600}}>{p.name}</div>
                                    <div style={{fontSize:"10px",color:"rgba(255,255,255,0.3)",marginTop:"2px"}}>{p.desc?.slice(0,40)}{p.desc?.length>40?"...":""}</div>
                                  </td>
                                  <td><span style={{background:"rgba(0,255,136,0.08)",color:"#00ff88",padding:"2px 8px",borderRadius:"10px",fontSize:"10px",fontWeight:600}}>{p.category||"General"}</span></td>
                                  <td>
                                    <div style={{color:"#00ff88",fontWeight:700,fontSize:"13px"}}>₹{p.price}</div>
                                    {hasDiscount && <div style={{color:"rgba(255,255,255,0.3)",fontSize:"10px",textDecoration:"line-through"}}>₹{p.originalPrice}</div>}
                                  </td>
                                  <td>
                                    {hasDiscount
                                      ? <span style={{background:"rgba(239,68,68,0.15)",color:"#ef4444",padding:"2px 8px",borderRadius:"10px",fontSize:"10px",fontWeight:700}}>{discountPct}% OFF</span>
                                      : <span style={{color:"rgba(255,255,255,0.25)",fontSize:"10px"}}>No discount</span>
                                    }
                                  </td>
                                  <td>
                                    <div style={{display:"flex",alignItems:"center",gap:"6px"}}>
                                      <button className="stock-btn" onClick={()=>updateStock(pid,-1)}>−</button>
                                      <span style={{fontSize:"13px",fontWeight:700,minWidth:"28px",textAlign:"center",color:p.stock>10?"#00ff88":p.stock>0?"#f59e0b":"#ef4444"}}>{p.stock}</span>
                                      <button className="stock-btn" onClick={()=>updateStock(pid,+1)}>+</button>
                                    </div>
                                    <div style={{fontSize:"9px",marginTop:"3px",color:p.stock>10?"#00ff88":p.stock>0?"#f59e0b":"#ef4444"}}>{p.stock>10?"In Stock":p.stock>0?"Low Stock":"Out of Stock"}</div>
                                  </td>
                                  <td>
                                    <div style={{display:"flex",gap:"6px"}}>
                                      <button className="adm-btn-sm btn-edit" onClick={()=>openEditProduct({...p,id:pid})}>✏️ Edit</button>
                                      <button className="adm-btn-sm btn-del" onClick={()=>deleteProduct(pid)}>🗑 Delete</button>
                                    </div>
                                  </td>
                                </tr>
                              );
                            })
                          }
                        </tbody>
                      </table>
                    </div>
                }
              </div>
            )}




            {/* ── CONTENT MANAGER ── */}





            {activeTab==="content" && (
              <div className="adm-panel">
                <div style={{display:"flex",alignItems:"center",marginBottom:"16px",flexWrap:"wrap",gap:"8px"}}>
                  <div className="adm-ptitle" style={{marginBottom:0}}>Homepage Sections Edit Karo</div>
                  {contentSaved && <span className="cnt-saved">✅ Saved!</span>}
                </div>
                <div className="cnt-tabs">
                  {[{id:"hero",label:"🦸 Hero"},{id:"features",label:"⚡ Features"},{id:"about",label:"ℹ️ About"},{id:"contact",label:"📬 Contact"}].map(t=>(
                    <button key={t.id} className={`cnt-tab ${contentSection===t.id?"act":""}`} onClick={()=>setCSect(t.id)}>{t.label}</button>
                  ))}
                </div>
                <div className="sec-div"/>
                {contentSection==="hero" && <>
                  <label className="f-lbl">Main Heading</label>
                  <input className="adm-inp" value={content.hero.heading} onChange={e=>setContent(c=>({...c,hero:{...c.hero,heading:e.target.value}}))}/>
                  <label className="f-lbl">Sub Heading</label>
                  <input className="adm-inp" value={content.hero.subheading} onChange={e=>setContent(c=>({...c,hero:{...c.hero,subheading:e.target.value}}))}/>
                  <label className="f-lbl">Description</label>
                  <textarea className="adm-ta" value={content.hero.description} onChange={e=>setContent(c=>({...c,hero:{...c.hero,description:e.target.value}}))}/>
                  <label className="f-lbl">Button Text</label>
                  <input className="adm-inp" value={content.hero.btnText} onChange={e=>setContent(c=>({...c,hero:{...c.hero,btnText:e.target.value}}))}/>
                </>}
                {contentSection==="features" && content.features.map((f,i)=>(
                  <div key={i} style={{marginBottom:"14px",padding:"12px",background:"rgba(255,255,255,0.02)",borderRadius:"8px",border:"1px solid rgba(0,255,136,0.06)"}}>
                    <label className="f-lbl">Feature {i+1} — Title</label>
                    <input className="adm-inp" value={f.title} onChange={e=>{const u=[...content.features];u[i]={...u[i],title:e.target.value};setContent(c=>({...c,features:u}));}}/>
                    <label className="f-lbl">Description</label>
                    <textarea className="adm-ta" style={{minHeight:"56px"}} value={f.desc} onChange={e=>{const u=[...content.features];u[i]={...u[i],desc:e.target.value};setContent(c=>({...c,features:u}));}}/>
                  </div>
                ))}
                {contentSection==="about" && <>
                  <label className="f-lbl">Heading</label>
                  <input className="adm-inp" value={content.about.heading} onChange={e=>setContent(c=>({...c,about:{...c.about,heading:e.target.value}}))}/>
                  <label className="f-lbl">Body Text</label>
                  <textarea className="adm-ta" value={content.about.body} onChange={e=>setContent(c=>({...c,about:{...c.about,body:e.target.value}}))}/>
                </>}
                {contentSection==="contact" && [{key:"founder",label:"Founder Name"},{key:"address",label:"Address"},{key:"email",label:"Email"},{key:"phone",label:"Phone"}].map(({key,label})=>(
                  <div key={key}>
                    <label className="f-lbl">{label}</label>
                    <input className="adm-inp" value={content.contact[key]} onChange={e=>setContent(c=>({...c,contact:{...c.contact,[key]:e.target.value}}))}/>
                  </div>
                ))}
                <div className="sec-div"/>
                <button className="adm-btn-g" onClick={saveContent}>💾 Save Changes</button>
                <span style={{fontSize:"11px",color:"rgba(255,255,255,0.2)",marginLeft:"10px"}}>Backend connect hone ke baad live honge</span>
              </div>
            )}




            {/* ── OFFERS ── */}






            {activeTab==="offers" && (
              <div className="adm-panel">
                <div className="adm-ptitle">Offer Bar Manager</div>
                <input className="adm-inp" placeholder="🔥 Offer text..." value={newOffer.text} onChange={e=>setNewOffer({...newOffer,text:e.target.value})}/>
                <input className="adm-inp" type="number" placeholder="Timer in seconds (3600 = 1hr)" value={newOffer.time} onChange={e=>setNewOffer({...newOffer,time:e.target.value})}/>
                <button className="adm-btn-g" style={{marginBottom:"20px"}} onClick={handleAdd}>+ Add Offer</button>
                {offers.length===0
                  ? <p style={{color:"rgba(255,255,255,0.25)",fontSize:"12px"}}>Koi offer nahi hai.</p>
                  : offers.map(offer => {
                    const oid = offer._id || offer.id;
                    return (
                      <div className="offer-item" key={oid}>
                        {editId===oid ? <>
                          <input className="adm-inp" value={editData.text} onChange={e=>setEditData({...editData,text:e.target.value})}/>
                          <input className="adm-inp" type="number" value={editData.time} onChange={e=>setEditData({...editData,time:e.target.value})} placeholder="Timer in seconds"/>
                          <div className="offer-acts">
                            <button className="adm-btn-sm btn-save" onClick={()=>handleEditSave(oid)}>Save</button>
                            <button className="adm-btn-sm btn-cancel" onClick={()=>setEditId(null)}>Cancel</button>
                          </div>
                        </> : <>
                          <div className="offer-text">{offer.text}</div>
                          <div className="offer-timer">⏱ {formatTimeFn(offer.time)}</div>
                          <div className="offer-acts">
                            <button className="adm-btn-sm btn-edit" onClick={()=>handleEditStart(offer)}>✏️ Edit</button>
                            <button className="adm-btn-sm btn-del" onClick={()=>handleOfferDel(oid)}>🗑 Delete</button>
                          </div>
                        </>}
                      </div>
                    );
                  })
                }
              </div>
            )}





            {/* ── CAROUSEL ── */}






            {activeTab==="carousel" && (
              <div className="adm-panel">
                <h2>🎞️ Carousel Manager</h2>
                <input className="adm-inp" placeholder="Enter banner text" />
                <button className="adm-btn-g">➕ Add Slide</button>
                <p style={{marginTop:"10px", color:"#aaa"}}>Homepage slider ke liye yaha se text manage karo</p>
              </div>
            )}









            {/* ── MESSAGES ── */}





            {activeTab==="messages" && (
              <div className="adm-panel">
                <h2>💬 Sales Messages</h2>
                <p>Flash sale / banner messages yaha add karo</p>
              </div>
            )}









            {/* ── COUPON ── */}





            {activeTab === "coupon" && (
              <div className="adm-panel">
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:"20px", flexWrap:"wrap", gap:"10px" }}>
                  <div>
                    <div style={{ fontSize:"16px", fontWeight:700, color:"#fff" }}>Coupon Management</div>
                    <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.3)", marginTop:"3px" }}>Manage discount coupons for your customers</div>
                  </div>
                  <button className="adm-btn-g" onClick={openCreateCoupon}>+ Add Coupon</button>
                </div>

                <div style={{ overflowX:"auto" }}>
                  <table className="adm-tbl" style={{ minWidth:"640px" }}>
                    <thead>
                      <tr>
                        <th>Code</th><th>Discount</th><th>Status</th><th>Expires</th><th>Created</th><th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {coupons.length === 0
                        ? <tr><td colSpan={6} style={{ textAlign:"center", padding:"36px", color:"rgba(255,255,255,0.2)" }}>Koi coupon nahi mila. "Add Coupon" se banao.</td></tr>
                        : coupons.map(c => (
                          <tr key={c._id}>
                            <td>
                              <span style={{ fontFamily:"monospace", fontWeight:700, color:"#00ff88", background:"rgba(0,255,136,0.08)", border:"1px solid rgba(0,255,136,0.15)", padding:"3px 10px", borderRadius:"6px", letterSpacing:"0.04em", fontSize:"12px" }}>
                                {c.code}
                              </span>
                            </td>
                            <td style={{ color:"#fff", fontWeight:600 }}>{c.type === "flat" ? `₹${c.discount}` : `${c.discount}%`}</td>
                            <td>
                              <span style={{ display:"inline-flex", alignItems:"center", gap:"5px", background: c.active ? "rgba(0,255,136,0.1)" : "rgba(255,255,255,0.06)", color: c.active ? "#00ff88" : "rgba(255,255,255,0.35)", fontSize:"10px", fontWeight:600, padding:"3px 10px", borderRadius:"20px" }}>
                                <span style={{ width:"5px", height:"5px", borderRadius:"50%", background: c.active ? "#00ff88" : "rgba(255,255,255,0.35)", flexShrink:0 }}/>
                                {c.active ? "Active" : "Disabled"}
                              </span>
                            </td>
                            <td style={{ color:"rgba(255,255,255,0.35)", fontSize:"11px" }}>
                              {c.expiryDate ? new Date(c.expiryDate).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" }) : "Never"}
                            </td>
                            <td style={{ color:"rgba(255,255,255,0.35)", fontSize:"11px" }}>
                              {new Date(c.createdAt).toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" })}
                            </td>
                            <td>
                              <button className="adm-btn-sm btn-edit" style={{ marginRight:"5px" }} onClick={() => openEditCoupon(c)}>✏️ Edit</button>
                              <button className={`adm-btn-sm ${c.active ? "btn-del" : "btn-save"}`} style={{ marginRight:"5px" }} onClick={() => toggleCouponStatus(c._id, c.active)}>
                                {c.active ? "Disable" : "Enable"}
                              </button>
                              <button className="adm-btn-sm" style={{ background:"rgba(255,255,255,0.05)", color:"rgba(255,255,255,0.3)" }} onClick={() => deleteCouponById(c._id)}>Delete</button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </table>
                </div>

                {showCouponModal && (
                  <>
                    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:199 }} onClick={() => { setShowCouponModal(false); setEditingCoupon(null); }}/>
                    <div style={{ position:"fixed", top:"50%", left:"50%", transform:"translate(-50%,-50%)", background:"#0d1a11", border:"1px solid rgba(0,255,136,0.15)", borderRadius:"14px", padding:"28px", width:"90%", maxWidth:"460px", zIndex:200, maxHeight:"90vh", overflowY:"auto" }}>
                      <button className="d-close" onClick={() => { setShowCouponModal(false); setEditingCoupon(null); }}>✕</button>
                      <div style={{ display:"inline-block", fontSize:"9px", fontWeight:700, padding:"2px 10px", borderRadius:"20px", letterSpacing:"0.08em", marginBottom:"8px", background: editingCoupon ? "rgba(59,130,246,0.12)" : "rgba(0,255,136,0.12)", color: editingCoupon ? "#3b82f6" : "#00ff88" }}>
                        {editingCoupon ? "EDITING" : "NEW COUPON"}
                      </div>
                      <div style={{ fontSize:"16px", fontWeight:700, color:"#fff", marginBottom:"4px" }}>{editingCoupon ? "Edit Coupon" : "Create Coupon"}</div>
                      <div style={{ fontSize:"11px", color:"rgba(255,255,255,0.3)", marginBottom:"20px" }}>{editingCoupon ? "Update the details of this coupon." : "Add a new discount coupon code for your customers."}</div>
                      <div className="sec-div"/>

                      <label className="f-lbl">Coupon Code</label>
                      <div style={{ display:"flex", gap:"8px", marginBottom:"14px" }}>
                        <input className="adm-inp" style={{ marginBottom:0, flex:1, textTransform:"uppercase", letterSpacing:"0.05em" }} placeholder="e.g. SAVE20"
                          value={coupon.code} onChange={e => setCoupon({ ...coupon, code: e.target.value.toUpperCase() })}/>
                        {!editingCoupon && (
                          <button className="adm-btn-g" style={{ background:"rgba(0,255,136,0.1)", border:"1px solid rgba(0,255,136,0.25)", color:"#00ff88", whiteSpace:"nowrap" }}
                            onClick={() => { const chars="ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; setCoupon({ ...coupon, code: Array.from({ length:8 }, () => chars[Math.floor(Math.random() * chars.length)]).join("") }); }}>
                            Generate
                          </button>
                        )}
                      </div>

                      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"12px", marginBottom:"14px" }}>
                        <div>
                          <label className="f-lbl">Discount</label>
                          <div style={{ position:"relative" }}>
                            <input className="adm-inp" style={{ marginBottom:0, paddingRight:"28px" }} type="number" min="1" max="100" placeholder="20"
                              value={coupon.discount} onChange={e => setCoupon({ ...coupon, discount: e.target.value })}/>
                            <span style={{ position:"absolute", right:"12px", top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.35)", fontSize:"13px", pointerEvents:"none" }}>%</span>
                          </div>
                        </div>
                        <div>
                          <label className="f-lbl">Type</label>
                          <select className="adm-inp" style={{ marginBottom:0, cursor:"pointer" }} value={coupon.type} onChange={e => setCoupon({ ...coupon, type: e.target.value })}>
                            <option value="percent">Percentage</option>
                            <option value="flat">Flat Amount</option>
                          </select>
                        </div>
                      </div>

                      <label className="f-lbl">Min Order Value <span style={{ color:"rgba(255,255,255,0.25)", fontWeight:400, textTransform:"none", letterSpacing:0 }}>(Optional)</span></label>
                      <div style={{ position:"relative", marginBottom:"5px" }}>
                        <span style={{ position:"absolute", left:"12px", top:"50%", transform:"translateY(-50%)", color:"rgba(255,255,255,0.35)", fontSize:"13px", pointerEvents:"none" }}>₹</span>
                        <input className="adm-inp" style={{ marginBottom:0, paddingLeft:"26px" }} type="number" min="0" placeholder="0"
                          value={coupon.minOrderAmount} onChange={e => setCoupon({ ...coupon, minOrderAmount: e.target.value })}/>
                      </div>
                      <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.2)", marginBottom:"14px", lineHeight:1.5 }}>Coupon will only apply when cart total meets or exceeds this amount</div>

                      <label className="f-lbl">Expiry Date <span style={{ color:"rgba(255,255,255,0.25)", fontWeight:400, textTransform:"none", letterSpacing:0 }}>(Optional)</span></label>
                      <input className="adm-inp" type="date" style={{ colorScheme:"dark" }} value={coupon.expiryDate || ""} onChange={e => setCoupon({ ...coupon, expiryDate: e.target.value })}/>

                      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", background:"rgba(255,255,255,0.03)", border:"1px solid rgba(0,255,136,0.08)", borderRadius:"8px", padding:"11px 14px", marginBottom:"20px", cursor:"pointer" }}
                        onClick={() => setCoupon({ ...coupon, active: !coupon.active })}>
                        <div>
                          <div style={{ fontSize:"13px", color:"rgba(255,255,255,0.7)", fontWeight:500 }}>Active</div>
                          <div style={{ fontSize:"10px", color:"rgba(255,255,255,0.25)", marginTop:"2px" }}>Coupon usable by customers immediately</div>
                        </div>
                        <div style={{ position:"relative", width:"40px", height:"22px", flexShrink:0 }}>
                          <div style={{ position:"absolute", inset:0, borderRadius:"22px", background: coupon.active ? "rgba(0,255,136,0.35)" : "rgba(255,255,255,0.1)", transition:"background 0.2s" }}/>
                          <div style={{ position:"absolute", width:"16px", height:"16px", top:"3px", left: coupon.active ? "21px" : "3px", background: coupon.active ? "#00ff88" : "rgba(255,255,255,0.4)", borderRadius:"50%", transition:"left 0.2s" }}/>
                        </div>
                      </div>

                      <div style={{ display:"flex", gap:"10px", justifyContent:"flex-end" }}>
                        <button className="adm-btn-sm btn-cancel" style={{ padding:"9px 18px", fontSize:"12px" }} onClick={() => { setShowCouponModal(false); setEditingCoupon(null); }}>Cancel</button>
                        <button style={{ padding:"9px 22px", borderRadius:"8px", border:"none", fontSize:"12px", fontWeight:700, cursor:"pointer", fontFamily:"Poppins,sans-serif", background: editingCoupon ? "#3b82f6" : "#00ff88", color: editingCoupon ? "#fff" : "#001a0a" }} onClick={createCoupon}>
                          {editingCoupon ? "Save Changes" : "Create Coupon"}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            )}







            {/* ── SALES ── */}






            {activeTab==="sales" && (
              <div className="adm-panel">
                <h2>💰 Sales</h2>
                <p>Flash sale / banner messages yaha add karo</p>
              </div>
            )}






            {/* ── USERS ── */}




            {activeTab==="users" && (
              <div className="adm-panel">
                <AdminUsers/>
              </div>
            )}

          </div>
        </main>




        {/* ORDER DETAIL DRAWER */}


        
        <div className={`adm-overlay ${selectedOrder?"open":""}`} onClick={()=>setSelected(null)}/>
        <div className={`adm-drawer ${selectedOrder?"open":""}`}>
          {selectedOrder && <>
            <button className="d-close" onClick={()=>setSelected(null)}>✕</button>
            <div className="d-id">ORDER #{selectedOrder.id}</div>
            <div className="d-name">{selectedOrder.name}</div>
            <StatusBadge status={selectedOrder.status}/>
            <div className="d-sec">Order Details</div>
            {[["Phone",selectedOrder.phone],["Amount",`₹${selectedOrder.amount?.toLocaleString("en-IN")}`],["Payment",selectedOrder.paymentMethod||"COD"],["Item",selectedOrder.item],["Address",selectedOrder.address],["Placed",selectedOrder.time]].map(([k,v])=>(
              <div className="d-row" key={k}><span className="d-k">{k}</span><span className="d-v">{v}</span></div>
            ))}
            <div className="d-sec" style={{marginTop:"16px"}}>Update Status</div>
            <select className="d-select" value={newStatus} onChange={e=>setNewStatus(e.target.value)}>
              {Object.entries(STATUS_META).map(([k,m])=><option key={k} value={k} style={{background:"#0a1a0f"}}>{m.label}</option>)}
            </select>
            <input className="d-input" placeholder="Tracking ID (optional)" value={trackingId} onChange={e=>setTracking(e.target.value)}/>
            <button className="adm-btn-g" style={{width:"100%"}} onClick={handleStatusUpdate} disabled={saving}>{saving?"Saving...":"✅ Status Update Karo"}</button>
          </>}
        </div>

        {/* PRODUCT EDIT DRAWER */}
        <div className={`adm-overlay ${editingProduct?"open":""}`} onClick={()=>{ setEditProd(null); setNewImageFiles([]); }}/>
        <div className={`adm-drawer ${editingProduct?"open":""}`}>
          {editingProduct && <>
            <button className="d-close" onClick={()=>{ setEditProd(null); setNewImageFiles([]); }}>✕</button>
            <div className="d-id">PRODUCT EDIT</div>
            <div className="d-name">{editingProduct.name || "New Product"}</div>
            <label className="f-lbl">Product Name</label>
            <input className="d-input" value={editingProduct.name||""} onChange={e=>setEditProd(p=>({...p,name:e.target.value}))}/>
            <label className="f-lbl">Price (₹)</label>
            <input className="d-input" type="number" value={editingProduct.price||0} onChange={e=>setEditProd(p=>({...p,price:Number(e.target.value)}))}/>
            <label className="f-lbl">Original Price (₹)</label>
            <input className="d-input" type="number" placeholder="Discount ke liye (optional)" value={editingProduct.originalPrice||""} onChange={e=>setEditProd(p=>({...p,originalPrice:e.target.value?Number(e.target.value):""}))}/>
            {editingProduct.originalPrice && editingProduct.originalPrice > editingProduct.price && (
              <div style={{background:"rgba(239,68,68,0.12)",border:"1px solid rgba(239,68,68,0.2)",borderRadius:"7px",padding:"7px 12px",fontSize:"11px",color:"#ef4444",marginBottom:"10px",display:"flex",alignItems:"center",gap:"6px"}}>
                <span style={{fontWeight:700}}>{Math.round((1 - editingProduct.price / editingProduct.originalPrice) * 100)}% OFF</span>
                <span style={{color:"rgba(255,255,255,0.35)"}}>Customer saves ₹{Math.round(editingProduct.originalPrice - editingProduct.price).toLocaleString("en-IN")}</span>
              </div>
            )}
            <label className="f-lbl">Category</label>
            <input className="d-input" value={editingProduct.category||""} onChange={e=>setEditProd(p=>({...p,category:e.target.value}))} placeholder="e.g. Pre-Workout, Protein"/>
            <label className="f-lbl">Description</label>
            <textarea style={{width:"100%",background:"rgba(255,255,255,0.04)",border:"1px solid rgba(0,255,136,0.15)",borderRadius:"7px",padding:"8px 10px",color:"#fff",fontSize:"12px",outline:"none",fontFamily:"Poppins,sans-serif",boxSizing:"border-box",resize:"vertical",minHeight:"68px",marginBottom:"10px"}}
              value={editingProduct.description||editingProduct.desc||""} onChange={e=>setEditProd(p=>({...p,description:e.target.value}))}/>
            <label className="f-lbl">Stock</label>
            <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"14px"}}>
              <button className="stock-btn" onClick={()=>setEditProd(p=>({...p,stock:Math.max(0,(p.stock||0)-1)}))}>−</button>
              <span style={{fontSize:"20px",fontWeight:700,minWidth:"40px",textAlign:"center",color:(editingProduct.stock||0)>10?"#00ff88":(editingProduct.stock||0)>0?"#f59e0b":"#ef4444"}}>{editingProduct.stock||0}</span>
              <button className="stock-btn" onClick={()=>setEditProd(p=>({...p,stock:(p.stock||0)+1}))}>+</button>
              <input type="number" style={{background:"rgba(255,255,255,0.04)",border:"1px solid rgba(255,255,255,0.09)",borderRadius:"7px",padding:"7px 10px",color:"#fff",fontSize:"12px",outline:"none",width:"70px",fontFamily:"Poppins,sans-serif"}}
                value={editingProduct.stock||0} onChange={e=>setEditProd(p=>({...p,stock:Math.max(0,Number(e.target.value))}))}/>
            </div>
            <label className="f-lbl">
              Product Images
              {newImageFiles.length > 0 && <span style={{color:"#00ff88",fontWeight:400,marginLeft:"8px",textTransform:"none",letterSpacing:0}}>({newImageFiles.length} nai files ready)</span>}
            </label>
            <div className="img-grid">
              {(editingProduct.images||[]).map((img,i)=>(
                <div className="img-tw" key={i}>
                  <img src={getImgSrc(img)} alt="" className="img-th" onError={e=>e.target.style.opacity="0.2"}/>
                  <button className="img-del" onClick={()=>removeImage(i)}>✕</button>
                </div>
              ))}
              <div className="img-add" onClick={()=>imgInputRef.current?.click()}>
                <span style={{fontSize:"22px"}}>+</span>
                <span>Image</span>
              </div>
            </div>
            <input ref={imgInputRef} type="file" accept="image/*" multiple style={{display:"none"}} onChange={handleImageUpload}/>
            <p style={{fontSize:"10px",color:"rgba(255,255,255,0.2)",marginBottom:"16px"}}>JPG, PNG, WebP — multiple select kar sakte ho</p>
            <button className="adm-btn-g" style={{width:"100%"}} onClick={saveProduct} disabled={prodSaving}>
              {prodSaving ? "⏳ Saving..." : "💾 Save Product"}
            </button>
          </>}
        </div>

      </div>
    </>
  );
}
