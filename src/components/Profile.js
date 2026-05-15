import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_BASE_URL;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  // 🔥 LOAD PROFILE
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(res => {
        if (!res.ok) {
          localStorage.clear();
          navigate("/login");
        }
        return res.json();
      })
      .then(data => setUser(data))
      .catch(err => console.log(err));
  }, [navigate]);

  // 🔥 SAVE FUNCTION
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    // NAME UPDATE
    await fetch(`${API}/auth/update`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ name: updatedName }),
    });

    // IMAGE UPLOAD
    if (image) {
      const formData = new FormData();
      formData.append("image", image);

      await fetch(`${API}/auth/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
    }

    // REFRESH USER
    const res = await fetch(`${API}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setUser(data);

    setEditMode(false);
  };

  if (!user) return <p style={{ color: "white" }}>Loading...</p>;

  return (
    <>
      {/* 🔥 CSS INLINE */}
      <style>{`
        .profile-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0a3c20, #001f0f);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .profile-card {
          width: 350px;
          padding: 30px;
          border-radius: 20px;
          text-align: center;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(15px);
          box-shadow: 0 0 25px rgba(0,255,136,0.3);
        }

        .profile-card h2 {
          color: #00ff88;
          margin-bottom: 20px;
        }

        .profile-img {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          object-fit: cover;
          border: 3px solid #00ff88;
          margin-bottom: 15px;
        }

        .profile-info {
          text-align: left;
          margin: 20px 0;
        }

        .profile-info span {
          color: #00ff88;
          font-weight: bold;
        }

        .btn {
          width: 100%;
          padding: 10px;
          border: none;
          border-radius: 10px;
          margin-top: 10px;
          cursor: pointer;
          font-weight: bold;
        }

        .edit {
          background: #00ff88;
          color: black;
        }

        .save {
          background: #00c3ff;
        }

        .logout {
          background: red;
          color: white;
        }

        .edit-box input {
          width: 100%;
          padding: 8px;
          margin-top: 10px;
          border-radius: 8px;
          border: none;
        }
      `}</style>

      <div className="profile-container">
        <div className="profile-card">

          <h2>👤 My Profile</h2>

          {/* IMAGE */}
          <img
            src={
  user.image
    ? `http://localhost:5000/${user.image.replace(/^\//, "")}`
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=003d1f&color=00ff88&size=120`
}
            alt="profile"
            className="profile-img"
          />

          <div className="profile-info">
            <p><span>Name:</span> {user.name}</p>
            <p><span>Email:</span> {user.email}</p>
          </div>

          <button
            className="btn edit"
            onClick={() => {
              setEditMode(true);
              setUpdatedName(user.name);
            }}
          >
            Edit Profile
          </button>

          {editMode && (
            <div className="edit-box">
              <input
                value={updatedName}
                onChange={(e) => setUpdatedName(e.target.value)}
                placeholder="Enter new name"
              />

              <input
                type="file"
                onChange={(e) => setImage(e.target.files[0])}
              />

              <button className="btn save" onClick={handleSave}>
                Save
              </button>
            </div>
          )}

          <button
            className="btn logout"
            onClick={() => {
              localStorage.clear();
              navigate("/login");
            }}
          >
            Logout 🚪
          </button>

        </div>
      </div>
    </>
  );
}
