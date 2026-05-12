import React, { useEffect, useState, useRef, useCallback } from "react";

const API = process.env.REACT_APP_API_URL || "http://localhost:5000/api";

const FontLink = () => (
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500&display=swap');`}</style>
);

const CSS = () => (
  <style>{`
    :root{--bg:#070e0a;--card:#111d14;--bdr:#1a2e1e;--acc:#22c55e;--acc2:#4ade80;--tx:#d1fae5;--mt:#4d7a59;--dng:#f87171;--warn:#fbbf24;--font:'Syne',sans-serif;--mono:'DM Mono',monospace;}
    *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
    .au{font-family:var(--font);background:var(--bg);min-height:100vh;color:var(--tx);padding:36px 32px}
    .au-hdr{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:32px;gap:16px;flex-wrap:wrap}
    .au-hdr h1{font-size:28px;font-weight:800;letter-spacing:-.5px;color:#bbf7d0}
    .au-hdr h1 span{color:var(--acc)}
    .au-hdr p{color:var(--mt);font-size:12px;font-family:var(--mono);margin-top:5px}
    .au-badge{display:inline-flex;align-items:center;gap:6px;background:rgba(164, 20, 37, 0.51);border:1px solid rgba(34,197,94,.28);color:var(--acc);border-radius:20px;padding:4px 12px;font-size:11px;font-family:var(--mono)}
    .au-dot{width:7px;height:7px;border-radius:50%;background:var(--acc);animation:pulse 1.8s infinite}
    @keyframes pulse{0%,100%{opacity:1}50%{opacity:.25}}
    /* search row */
    .au-srow{display:grid;grid-template-columns:1fr 1fr 1fr;gap:14px;margin-bottom:22px}
    @media(max-width:900px){.au-srow{grid-template-columns:1fr 1fr}}
    @media(max-width:600px){.au-srow{grid-template-columns:1fr}}
    .au-sbox{background:var(--card);border:1px solid var(--bdr);border-radius:12px;padding:16px 18px 14px;transition:border-color .2s}
    .au-sbox:focus-within{border-color:var(--acc)}
    .au-sbox label{display:block;font-size:10px;font-family:var(--mono);color:var(--mt);text-transform:uppercase;letter-spacing:1px;margin-bottom:9px}
    .au-sin{display:flex;align-items:center;gap:8px}
    .au-sin svg{flex-shrink:0;color:var(--mt)}
    .au-sin input,.au-sin select{flex:1;background:transparent;border:none;outline:none;color:var(--tx);font-family:var(--mono);font-size:13px}
    .au-sin select option{background:#0c1a0f}
    .au-sin input::placeholder{color:var(--mt)}
    .au-sbtn{background:var(--acc);color:#052e16;border:none;border-radius:7px;padding:6px 14px;font-family:var(--font);font-size:11px;font-weight:800;cursor:pointer;white-space:nowrap;transition:background .15s}
    .au-sbtn:hover{background:var(--acc2)}.au-sbtn:disabled{opacity:.5;cursor:not-allowed}
    .au-hint{font-size:10px;color:var(--mt);font-family:var(--mono);margin-top:7px}
    /* stats */
    .au-stats{display:flex;gap:10px;margin-bottom:20px;flex-wrap:wrap}
    .au-stat{background:var(--card);border:1px solid var(--bdr);border-radius:10px;padding:11px 18px}
    .au-sv{font-size:20px;font-weight:800;color:#86efac}
    .au-sl{font-size:10px;color:var(--mt);font-family:var(--mono);margin-top:2px}
    /* table wrap */
    .au-wrap{background:var(--card);border:1px solid var(--bdr);border-radius:14px;overflow:hidden}
    .au-tbar{display:flex;align-items:center;justify-content:space-between;padding:14px 20px;border-bottom:1px solid var(--bdr);flex-wrap:wrap;gap:10px}
    .au-ttl{font-size:11px;font-family:var(--mono);color:var(--mt);text-transform:uppercase;letter-spacing:1px}
    .au-rfbtn{background:transparent;border:1px solid var(--bdr);color:var(--mt);border-radius:7px;padding:5px 13px;font-family:var(--mono);font-size:11px;cursor:pointer;display:flex;align-items:center;gap:5px;transition:color .15s,border-color .15s}
    .au-rfbtn:hover{color:var(--acc);border-color:var(--acc)}
    .au-rfbtn.spin svg{animation:spin .7s linear infinite}
    @keyframes spin{to{transform:rotate(360deg)}}
    .au-found{display:inline-flex;align-items:center;gap:6px;background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.25);color:var(--acc2);border-radius:20px;padding:4px 12px;font-size:10px;font-family:var(--mono)}
    .au-clr{background:transparent;border:none;color:var(--mt);cursor:pointer;font-size:10px;font-family:var(--mono);text-decoration:underline;padding-left:6px}
    .au-scroll{overflow-x:auto}
    .au-tbl{width:100%;border-collapse:collapse}
    .au-tbl thead tr{background:rgba(34,197,94,.04)}
    .au-tbl th{padding:12px 16px;text-align:left;font-size:10px;font-family:var(--mono);text-transform:uppercase;letter-spacing:1px;color:var(--mt);border-bottom:1px solid var(--bdr);white-space:nowrap}
    .au-tbl td{padding:12px 16px;font-size:13px;border-bottom:1px solid rgba(26,46,30,.8);vertical-align:middle}
    .au-tbl tbody tr:last-child td{border-bottom:none}
    .au-tbl tbody tr{transition:background .12s;cursor:pointer}
    .au-tbl tbody tr:hover{background:rgba(34,197,94,.04)}
    .au-tbl tbody tr.au-hl{background:rgba(34,197,94,.09)}
    /* avatar */
    .au-avatar{width:34px;height:34px;border-radius:50%;object-fit:cover;border:1.5px solid var(--bdr)}
    .au-initials{width:34px;height:34px;border-radius:50%;background:rgba(34,197,94,.12);border:1.5px solid rgba(34,197,94,.25);display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:var(--acc);flex-shrink:0}
    .au-user-cell{display:flex;align-items:center;gap:10px}
    .au-nm{font-weight:700;color:#bbf7d0}
    .au-em{color:var(--acc);font-family:var(--mono);font-size:12px}
    .au-ph{font-family:var(--mono);font-size:12px;color:#86efac}
    .au-adr{color:var(--mt);font-size:12px;max-width:160px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
    .au-dt{font-family:var(--mono);font-size:11px;background:rgba(34,197,94,.1);color:var(--acc2);border-radius:6px;padding:3px 8px;display:inline-block;white-space:nowrap;border:1px solid rgba(34,197,94,.2)}
    .au-dash{color:var(--mt)}
    .au-tag{margin-left:7px;font-size:9px;background:rgba(34,197,94,.15);color:var(--acc);border-radius:4px;padding:2px 6px;font-family:var(--mono);border:1px solid rgba(34,197,94,.25)}
    /* role badges */
    .au-role{display:inline-flex;align-items:center;border-radius:5px;padding:2px 8px;font-size:10px;font-family:var(--mono);font-weight:500;white-space:nowrap}
    .au-role-admin{background:rgba(251,191,36,.1);color:#fbbf24;border:1px solid rgba(251,191,36,.2)}
    .au-role-moderator{background:rgba(99,102,241,.1);color:#818cf8;border:1px solid rgba(99,102,241,.2)}
    .au-role-user{background:rgba(34,197,94,.08);color:var(--mt);border:1px solid var(--bdr)}
    /* states */
    .au-loading{display:flex;align-items:center;justify-content:center;padding:80px;gap:12px;color:var(--mt);font-family:var(--mono);font-size:13px}
    .au-spinner{width:20px;height:20px;border:2px solid var(--bdr);border-top-color:var(--acc);border-radius:50%;animation:spin .7s linear infinite}
    .au-empty{text-align:center;padding:60px 20px;color:var(--mt);font-family:var(--mono);font-size:13px}
    .au-error{background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.2);color:var(--dng);border-radius:10px;padding:14px 20px;font-family:var(--mono);font-size:13px;margin-bottom:20px;display:flex;align-items:center;gap:10px}
    /* pagination */
    .au-pag{display:flex;align-items:center;justify-content:center;gap:8px;padding:18px;border-top:1px solid var(--bdr)}
    .au-pag button{background:transparent;border:1px solid var(--bdr);color:var(--mt);border-radius:6px;padding:5px 12px;font-family:var(--mono);font-size:12px;cursor:pointer;transition:all .15s}
    .au-pag button:hover:not(:disabled){border-color:var(--acc);color:var(--acc)}
    .au-pag button:disabled{opacity:.35;cursor:not-allowed}
    .au-pag button.active{background:rgba(34,197,94,.15);border-color:var(--acc);color:var(--acc2)}
    .au-pag-info{font-family:var(--mono);font-size:11px;color:var(--mt)}
    /* modal */
    .au-mbg{position:fixed;inset:0;background:rgba(0,0,0,.7);display:flex;align-items:center;justify-content:center;z-index:100;padding:16px}
    .au-mod{background:#0c1a0f;border:1px solid var(--bdr);border-radius:16px;padding:28px;width:520px;max-width:100%;max-height:90vh;overflow-y:auto}
    .au-mod-top{display:flex;align-items:center;gap:14px;margin-bottom:22px}
    .au-mod-avatar{width:56px;height:56px;border-radius:50%;object-fit:cover;border:2px solid rgba(34,197,94,.3)}
    .au-mod-initials{width:56px;height:56px;border-radius:50%;background:rgba(34,197,94,.1);border:2px solid rgba(34,197,94,.25);display:flex;align-items:center;justify-content:center;font-size:20px;font-weight:800;color:var(--acc);flex-shrink:0}
    .au-mod h3{font-size:18px;font-weight:800;color:#bbf7d0;line-height:1}
    .au-mod-sub{font-size:12px;color:var(--mt);font-family:var(--mono);margin-top:4px}
    /* tabs */
    .au-tabs{display:flex;gap:4px;margin-bottom:20px;border-bottom:1px solid var(--bdr);padding-bottom:0}
    .au-tab{background:transparent;border:none;border-bottom:2px solid transparent;color:var(--mt);font-family:var(--font);font-size:12px;font-weight:700;cursor:pointer;padding:8px 14px;margin-bottom:-1px;transition:color .15s,border-color .15s}
    .au-tab.active{color:var(--acc);border-bottom-color:var(--acc)}
    /* detail rows */
    .au-mrow{display:flex;gap:10px;margin-bottom:12px}
    .au-mkey{font-size:10px;font-family:var(--mono);color:var(--mt);text-transform:uppercase;width:90px;flex-shrink:0;padding-top:3px}
    .au-mval{font-size:13px;color:var(--tx);font-family:var(--mono);word-break:break-all}
    .au-msep{border:none;border-top:1px solid var(--bdr);margin:16px 0}
    /* edit form */
    .au-eform{display:flex;flex-direction:column;gap:12px}
    .au-efield label{display:block;font-size:10px;font-family:var(--mono);color:var(--mt);text-transform:uppercase;letter-spacing:1px;margin-bottom:6px}
    .au-efield input,.au-efield select{width:100%;background:rgba(34,197,94,.03);border:1px solid var(--bdr);border-radius:8px;padding:9px 12px;color:var(--tx);font-family:var(--mono);font-size:13px;outline:none;transition:border-color .2s}
    .au-efield input:focus,.au-efield select:focus{border-color:var(--acc)}
    .au-efield select option{background:#0c1a0f}
    /* orders */
    .au-orders-list{display:flex;flex-direction:column;gap:8px}
    .au-ocard{background:rgba(34,197,94,.03);border:1px solid var(--bdr);border-radius:8px;padding:10px 14px;font-family:var(--mono);font-size:12px}
    .au-oid{color:var(--acc);font-weight:600}
    .au-ostatus{display:inline-block;margin-left:8px;padding:2px 8px;border-radius:4px;font-size:10px}
    .s-pending{background:rgba(251,191,36,.1);color:#fbbf24;border:1px solid rgba(251,191,36,.2)}
    .s-processing{background:rgba(99,102,241,.1);color:#818cf8;border:1px solid rgba(99,102,241,.2)}
    .s-shipped{background:rgba(34,197,94,.1);color:var(--acc);border:1px solid rgba(34,197,94,.2)}
    .s-delivered{background:rgba(74,222,128,.12);color:var(--acc2);border:1px solid rgba(74,222,128,.25)}
    .s-cancelled{background:rgba(248,113,113,.1);color:var(--dng);border:1px solid rgba(248,113,113,.2)}
    /* modal buttons */
    .au-mbtns{display:flex;gap:10px;margin-top:22px;flex-wrap:wrap}
    .au-save-btn{background:var(--acc);color:#052e16;border:none;border-radius:8px;padding:8px 18px;font-family:var(--font);font-size:12px;font-weight:800;cursor:pointer;transition:background .15s}
    .au-save-btn:hover{background:var(--acc2)}.au-save-btn:disabled{opacity:.5;cursor:not-allowed}
    .au-dbtn{background:rgba(248,113,113,.1);border:1px solid rgba(248,113,113,.25);color:var(--dng);border-radius:8px;padding:8px 16px;font-family:var(--font);font-size:12px;font-weight:700;cursor:pointer;transition:background .15s}
    .au-dbtn:hover{background:rgba(248,113,113,.2)}.au-dbtn:disabled{opacity:.5;cursor:not-allowed}
    .au-cbtn{background:transparent;border:1px solid var(--bdr);color:var(--mt);border-radius:8px;padding:8px 16px;font-family:var(--font);font-size:12px;cursor:pointer;transition:border-color .15s,color .15s;margin-left:auto}
    .au-cbtn:hover{border-color:var(--acc);color:var(--acc)}
    /* toast */
    .au-toast{position:fixed;bottom:24px;right:24px;background:rgba(248,113,113,.15);border:1px solid rgba(248,113,113,.3);color:var(--dng);border-radius:10px;padding:12px 18px;font-family:var(--mono);font-size:12px;z-index:999;animation:slideUp .2s ease}
    .au-toast.ok{background:rgba(34,197,94,.12);border-color:rgba(34,197,94,.3);color:var(--acc2)}
    @keyframes slideUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:none}}
  `}</style>
);

/* ── Icons ── */
const IcoSearch  = () => <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>;
const IcoRefresh = () => <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>;
const IcoX       = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>;

const fmtDate = (d) =>
  new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });

const initials = (name) =>
  name?.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase() || "?";

function Avatar({ user, size = "sm" }) {
  const cls    = size === "lg" ? "au-mod-initials" : "au-initials";
  const imgCls = size === "lg" ? "au-mod-avatar"   : "au-avatar";
  return user.image
    ? <img src={user.image} alt={user.name} className={imgCls} />
    : <div className={cls}>{initials(user.name)}</div>;
}

const LIMIT = 20;

export default function AdminUsers() {
  /* ── List state ── */
  const [users,      setUsers]      = useState([]);
  const [pagination, setPagination] = useState({ total: 0, page: 1, totalPages: 1 });
  const [loading,    setLoading]    = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error,      setError]      = useState("");

  /* ── Search state ── */
  const [nameQ,   setNameQ]   = useState("");
  const [orderQ,  setOrderQ]  = useState("");
  const [roleF,   setRoleF]   = useState("");
  const [page,    setPage]    = useState(1);
  const [hlUser,  setHlUser]  = useState(null);
  const [orderLoading, setOrderLoading] = useState(false);
  const hlRef = useRef(null);

  /* ── Modal state ── */
  const [modal,      setModal]      = useState(null); // { user, orders }
  const [activeTab,  setActiveTab]  = useState("details"); // "details" | "edit" | "orders"
  const [editForm,   setEditForm]   = useState({});
  const [saving,     setSaving]     = useState(false);
  const [deleting,   setDeleting]   = useState(false);

  /* ── Toast ── */
  const [toast, setToast] = useState(null);

  /* ── Auth headers ── */
  const hdrs = useCallback(() => {
    const token = localStorage.getItem("token");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  }, []);

  const showToast = useCallback((msg, type = "err") => {
  setToast({ msg, type });
  setTimeout(() => setToast(null), 3200);
}, []);

  /* ── Fetch users ── */
  const fetchUsers = useCallback(async ({ search = "", role = "", p = 1, silent = false } = {}) => {
    try {
      if (!silent) setError("");
      const params = new URLSearchParams({
        page:  p,
        limit: LIMIT,
        sort:  "createdAt_desc",
      });
      if (search) params.set("search", search);
      if (role)   params.set("role",   role);

      const res  = await fetch(`${API}/users?${params}`, { headers: hdrs() });
      const data = await res.json();
      if (!res.ok) { setError(data.message || "Users fetch nahi hue."); return; }

      setUsers(data.users);
      setPagination(data.pagination);
    } catch {
      setError("Server se connect nahi ho pa raha. Backend chal raha hai?");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [hdrs]);

  /* Initial load */
  useEffect(() => { fetchUsers(); }, [fetchUsers]);

  /* Debounced name + role search — reset to page 1 */
  useEffect(() => {
    const t = setTimeout(() => {
      setLoading(true);
      setPage(1);
      fetchUsers({ search: nameQ, role: roleF, p: 1 });
    }, 380);
    return () => clearTimeout(t);
  }, [nameQ, roleF, fetchUsers]);

  /* Scroll to highlighted row */
  useEffect(() => {
    if (hlUser && hlRef.current)
      hlRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [hlUser]);

  /* ── Pagination ── */
  const goToPage = (p) => {
    setPage(p);
    setLoading(true);
    fetchUsers({ search: nameQ, role: roleF, p });
  };

  /* ── Order search ── */
  const handleOrderSearch = async () => {
    const q = orderQ.trim();
    if (!q) return;
    try {
      setOrderLoading(true);
      const res  = await fetch(`${API}/users/by-order/${encodeURIComponent(q)}`, { headers: hdrs() });
      const data = await res.json();
      if (!res.ok) { showToast(data.message || "Order nahi mila."); setHlUser(null); return; }

      // ✅ Guest order handle karo
      if (data.isGuest) {
        showToast(`Guest order — ${data.guestInfo?.name || "Unknown"} (${data.guestInfo?.email || ""})`, "ok");
        setHlUser(null);
        return;
      }

      // ✅ Registered user
      setHlUser(data);
      setUsers((prev) =>
        prev.find((u) => u._id === data.user._id) ? prev : [data.user, ...prev]
      );
    } catch { showToast("Order search fail hua."); }
    finally   { setOrderLoading(false); }
  };

  const clearOrder = () => { setHlUser(null); setOrderQ(""); };

  /* ── Open modal ── */
  const openModal = async (user) => {
    try {
      const res  = await fetch(`${API}/users/${user._id}`, { headers: hdrs() });
      const data = await res.json();
      if (!res.ok) { showToast(data.message); return; }
      setModal(data);
      setActiveTab("details");
      setEditForm({
        name:    data.user.name    || "",
        phone:   data.user.phone   || "",
        address: data.user.address || "",
        image:   data.user.image   || "",
        role:    data.user.role    || "user",
      });
    } catch { showToast("User detail fetch nahi hua."); }
  };

  /* ── Save edit ── */
  const saveEdit = async () => {
    try {
      setSaving(true);
      const res  = await fetch(`${API}/users/${modal.user._id}`, {
        method:  "PATCH",
        headers: hdrs(),
        body:    JSON.stringify(editForm),
      });
      const data = await res.json();
      if (!res.ok) { showToast(data.message); return; }

      // Update local list + modal
      setUsers((prev) => prev.map((u) => u._id === data.user._id ? data.user : u));
      setModal((prev) => ({ ...prev, user: data.user }));
      setActiveTab("details");
      showToast("User update ho gaya.", "ok");
    } catch { showToast("Save fail hua."); }
    finally   { setSaving(false); }
  };

  /* ── Delete user ── */
  const deleteUser = async (id) => {
    if (!window.confirm("Yeh user aur uske saare orders delete ho jayenge. Sure?")) return;
    try {
      setDeleting(true);
      const res  = await fetch(`${API}/users/${id}`, { method: "DELETE", headers: hdrs() });
      const data = await res.json();
      if (!res.ok) { showToast(data.message); return; }
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setPagination((prev) => ({ ...prev, total: prev.total - 1 }));
      setModal(null);
      showToast(data.message, "ok");
    } catch { showToast("Delete fail hua."); }
    finally   { setDeleting(false); }
  };

  /* ── Stats ── */
  const { total } = pagination;
  const admins    = users.filter((u) => u.role === "admin").length;

  /* ── Pagination buttons ── */
  const renderPagination = () => {
    const { page: curPage, totalPages } = pagination;
    if (totalPages <= 1) return null;
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      if (i === 1 || i === totalPages || Math.abs(i - curPage) <= 1) {
        pages.push(i);
      } else if (pages[pages.length - 1] !== "…") {
        pages.push("…");
      }
    }
    return (
      <div className="au-pag">
        <button disabled={curPage === 1} onClick={() => goToPage(curPage - 1)}>← Prev</button>
        {pages.map((p, i) =>
          p === "…"
            ? <span key={`e${i}`} className="au-pag-info">…</span>
            : <button key={p} className={curPage === p ? "active" : ""} onClick={() => goToPage(p)}>{p}</button>
        )}
        <button disabled={curPage === totalPages} onClick={() => goToPage(curPage + 1)}>Next →</button>
        <span className="au-pag-info">{total} total</span>
      </div>
    );
  };

  return (
    <>
      <FontLink /><CSS />
      <div className="au">

        {/* Header */}
        <div className="au-hdr">
          <div>
            <h1>User <span>Management</span></h1>
            <p>live database</p>
          </div>
          <span className="au-badge"><span className="au-dot" />{total} total users</span>
        </div>

        {/* Error */}
        {error && (
          <div className="au-error">
            ⚠ {error}
            <button onClick={() => setError("")} style={{ marginLeft: "auto", background: "none", border: "none", color: "inherit", cursor: "pointer" }}><IcoX /></button>
          </div>
        )}

        {/* Search row */}
        <div className="au-srow">
          <div className="au-sbox">
            <label>Search by Name / Email</label>
            <div className="au-sin">
              <IcoSearch />
              <input type="text" placeholder="Prem / prem@mail.com…" value={nameQ}
                onChange={(e) => setNameQ(e.target.value)} />
            </div>
           
          </div>

          <div className="au-sbox">
            <label>Filter by Role</label>
            <div className="au-sin">
              <select value={roleF} onChange={(e) => setRoleF(e.target.value)}>
                <option value="">All roles</option>
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
            
          </div>

          <div className="au-sbox">
            <label>Search by Order ID</label>
            <div className="au-sin">
              <IcoSearch />
              <input type="text" placeholder="ORD-1001" value={orderQ}
                onChange={(e) => { setOrderQ(e.target.value); if (!e.target.value) clearOrder(); }}
                onKeyDown={(e) => e.key === "Enter" && handleOrderSearch()}
              />
              <button className="au-sbtn" onClick={handleOrderSearch} disabled={orderLoading}>
                {orderLoading ? "…" : "Find"}
              </button>
            </div>
            
          </div>
        </div>

        {/* Stats */}
        {!loading && (
          <div className="au-stats">
            <div className="au-stat"><div className="au-sv">{total}</div><div className="au-sl">Total Users</div></div>
            <div className="au-stat"><div className="au-sv" style={{ color: "var(--warn)" }}>{admins}</div><div className="au-sl">Admins (this page)</div></div>
            {nameQ && <div className="au-stat"><div className="au-sv">{users.length}</div><div className="au-sl">Matched (page)</div></div>}
          </div>
        )}

        {/* Table */}
        <div className="au-wrap">
          <div className="au-tbar">
            <span className="au-ttl">All Users</span>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              {hlUser && (
                <span className="au-found">
                  ✓ {hlUser.order.orderId}
                  <button className="au-clr" onClick={clearOrder}>clear</button>
                </span>
              )}
              <button className={`au-rfbtn${refreshing ? " spin" : ""}`}
                onClick={() => { setRefreshing(true); fetchUsers({ search: nameQ, role: roleF, p: page, silent: true }); }}>
                <IcoRefresh /> Refresh
              </button>
            </div>
          </div>

          {loading ? (
            <div className="au-loading"><div className="au-spinner" /> Loading users…</div>
          ) : users.length === 0 ? (
            <div className="au-empty">User not found.</div>
          ) : (
            <div className="au-scroll">
              <table className="au-tbl">
                <thead>
                  <tr>
                    <th>#</th><th>User</th><th>Email</th><th>Phone</th>
                    <th>Address</th><th>Role</th><th>Registered</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, i) => {
                    const isHL = hlUser?.user?._id === user._id;
                    return (
                      <tr key={user._id} className={isHL ? "au-hl" : ""}
                        ref={isHL ? hlRef : null}
                        onClick={() => openModal(user)}
                        title="Click for full details">
                        <td style={{ color: "var(--mt)", fontFamily: "var(--mono)", fontSize: 11 }}>
                          {(page - 1) * LIMIT + i + 1}
                        </td>
                        <td>
                          <div className="au-user-cell">
                            <Avatar user={user} size="sm" />
                            <span className="au-nm">
                              {user.name}
                              {isHL && <span className="au-tag">ORDER MATCH</span>}
                            </span>
                          </div>
                        </td>
                        <td className="au-em">{user.email}</td>
                        <td className="au-ph">{user.phone || <span className="au-dash">—</span>}</td>
                        <td className="au-adr" title={user.address}>{user.address || <span className="au-dash">—</span>}</td>
                        <td>
                          <span className={`au-role au-role-${user.role || "user"}`}>
                            {user.role === "admin" ? "⭐ admin" : user.role || "user"}
                          </span>
                        </td>
                        <td><span className="au-dt">{fmtDate(user.createdAt)}</span></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {renderPagination()}
        </div>

        {/* ── Modal ── */}
        {modal && (
          <div className="au-mbg" onClick={(e) => e.target === e.currentTarget && setModal(null)}>
            <div className="au-mod">
              {/* Modal header */}
              <div className="au-mod-top">
                <Avatar user={modal.user} size="lg" />
                <div>
                  <h3>{modal.user.name}</h3>
                  <p className="au-mod-sub">
                    <span className={`au-role au-role-${modal.user.role || "user"}`}>
                      {modal.user.role === "admin" ? "⭐ admin" : modal.user.role || "user"}
                    </span>
                  </p>
                </div>
              </div>

              {/* Tabs */}
              <div className="au-tabs">
                {["details", "edit", "orders"].map((t) => (
                  <button key={t} className={`au-tab${activeTab === t ? " active" : ""}`}
                    onClick={() => setActiveTab(t)}>
                    {t === "details" ? "Details" : t === "edit" ? "✏ Edit" : `Orders (${modal.orders.length})`}
                  </button>
                ))}
              </div>

              {/* Tab: Details */}
              {activeTab === "details" && (
                <>
                  {[
                    ["User ID",  modal.user._id],
                    ["Email",    modal.user.email],
                    ["Phone",    modal.user.phone   || "—"],
                    ["Address",  modal.user.address || "—"],
                    ["Joined",   fmtDate(modal.user.createdAt)],
                  ].map(([k, v]) => (
                    <div className="au-mrow" key={k}>
                      <span className="au-mkey">{k}</span>
                      <span className="au-mval">{v}</span>
                    </div>
                  ))}
                </>
              )}

              {/* Tab: Edit */}
              {activeTab === "edit" && (
                <div className="au-eform">
                  {[
                    { key: "name",    label: "Name",        type: "text",  placeholder: "Full name" },
                    { key: "phone",   label: "Phone",       type: "tel",   placeholder: "+91 98765 43210" },
                    { key: "address", label: "Address",     type: "text",  placeholder: "City, State" },
                    { key: "image",   label: "Image URL",   type: "url",   placeholder: "https://…" },
                  ].map(({ key, label, type, placeholder }) => (
                    <div className="au-efield" key={key}>
                      <label>{label}</label>
                      <input type={type} placeholder={placeholder}
                        value={editForm[key] || ""}
                        onChange={(e) => setEditForm((p) => ({ ...p, [key]: e.target.value }))} />
                    </div>
                  ))}
                  <div className="au-efield">
                    <label>Role</label>
                    <select value={editForm.role || "user"}
                      onChange={(e) => setEditForm((p) => ({ ...p, role: e.target.value }))}>
                      <option value="user">User</option>
                      <option value="moderator">Moderator</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                </div>
              )}

              {/* Tab: Orders */}
              {activeTab === "orders" && (
                modal.orders.length === 0
                  ? <p style={{ color: "var(--mt)", fontFamily: "var(--mono)", fontSize: 12 }}>Koi order nahi hai.</p>
                  : <div className="au-orders-list">
                      {modal.orders.map((o) => (
                        <div className="au-ocard" key={o._id}>
                          <span className="au-oid">{o.orderId}</span>
                          <span className={`au-ostatus s-${o.status}`}>{o.status}</span>
                          <span style={{ float: "right", color: "var(--mt)" }}>₹{o.totalAmount?.toLocaleString("en-IN")}</span>
                          <div style={{ marginTop: 4, color: "var(--mt)", fontSize: 11 }}>{fmtDate(o.createdAt)}</div>
                        </div>
                      ))}
                    </div>
              )}

              {/* Modal footer buttons */}
              <div className="au-mbtns">
                <button className="au-dbtn" disabled={deleting}
                  onClick={() => deleteUser(modal.user._id)}>
                  {deleting ? "Deleting…" : "🗑 Delete User"}
                </button>
                {activeTab === "edit" && (
                  <button className="au-save-btn" disabled={saving} onClick={saveEdit}>
                    {saving ? "Saving…" : "💾 Save Changes"}
                  </button>
                )}
                <button className="au-cbtn" onClick={() => setModal(null)}>Close</button>
              </div>
            </div>
          </div>
        )}

        {/* Toast */}
        {toast && (
          <div className={`au-toast${toast.type === "ok" ? " ok" : ""}`}>{toast.msg}</div>
        )}
      </div>
    </>
  );
}