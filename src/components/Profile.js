import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = process.env.REACT_APP_BASE_URL;

export default function Profile() {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedName, setUpdatedName] = useState("");
  const [image, setImage] = useState(null);

  const navigate = useNavigate();

  // LOAD PROFILE
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login");
      return;
    }

    fetch(`${API}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.clear();
          navigate("/login");
        }
        return res.json();
      })
      .then((data) => setUser(data))
      .catch((err) => console.log(err));
  }, [navigate]);

  // SAVE PROFILE
  const handleSave = async () => {
    const token = localStorage.getItem("token");

    try {
      // UPDATE NAME
      await fetch(`${API}/api/auth/update`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: updatedName,
        }),
      });

      // IMAGE UPLOAD
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        await fetch(`${API}/api/auth/upload`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        });
      }

      // REFRESH USER
      const res = await fetch(`${API}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      setUser(data);
      setEditMode(false);

    } catch (err) {
      console.log(err);
    }
  };

  if (!user)
    return (
      <p style={{ color: "white", textAlign: "center" }}>
        Loading...
      </p>
    );

  return (
    <>
      <style>{`
        .profile-container {
          min-height: 100vh;
          background:
            radial-gradient(circle at top, rgba(0,120,255,0.15), transparent 40%),
            linear-gradient(135deg, #040b16, #07192e, #0b1020);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 30px 20px;
          overflow: hidden;
        }

        .profile-card {
          width: 100%;
          max-width: 380px;
          padding: 35px 28px;
          border-radius: 24px;
          text-align: center;
          background: rgba(255,255,255,0.05);
          backdrop-filter: blur(16px);
          border: 1px solid rgba(0,140,255,0.15);
          box-shadow:
            0 0 30px rgba(0,120,255,0.15),
            inset 0 0 20px rgba(255,255,255,0.02);
          position: relative;
        }

        .profile-card::before {
          content: "";
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(
            90deg,
            transparent,
            #3ea6ff,
            transparent
          );
        }

        .profile-card h2 {
          color: #ffffff;
          margin-bottom: 25px;
          font-size: 30px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .profile-img-wrap {
          position: relative;
          width: 130px;
          margin: 0 auto 20px;
        }

        .profile-img {
          width: 130px;
          height: 130px;
          border-radius: 50%;
          object-fit: cover;
          border: 4px solid #3ea6ff;
          box-shadow: 0 0 30px rgba(0,140,255,0.35);
        }

        .profile-status {
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: 18px;
          height: 18px;
          background: #00ff88;
          border-radius: 50%;
          border: 3px solid #07192e;
        }

        .profile-info {
          text-align: left;
          margin: 25px 0;
          background: rgba(255,255,255,0.03);
          padding: 18px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,0.05);
        }

        .profile-info p {
          margin-bottom: 14px;
          color: rgba(255,255,255,0.85);
          font-size: 14px;
          line-height: 1.6;
        }

        .profile-info p:last-child {
          margin-bottom: 0;
        }

        .profile-info span {
          color: #3ea6ff;
          font-weight: 700;
          margin-right: 6px;
        }

        .btn {
          width: 100%;
          padding: 13px;
          border: none;
          border-radius: 14px;
          margin-top: 12px;
          cursor: pointer;
          font-weight: 700;
          font-size: 14px;
          transition: all 0.25s ease;
        }

        .edit {
          background: linear-gradient(135deg, #3ea6ff, #0059ff);
          color: white;
          box-shadow: 0 0 18px rgba(0,120,255,0.35);
        }

        .edit:hover {
          transform: translateY(-2px);
        }

        .save {
          background: linear-gradient(135deg, #00ff88, #00c96b);
          color: #04120c;
          box-shadow: 0 0 18px rgba(0,255,136,0.25);
        }

        .save:hover {
          transform: translateY(-2px);
        }

        .logout {
          background: linear-gradient(135deg, #ff3b3b, #d60000);
          color: white;
        }

        .logout:hover {
          transform: translateY(-2px);
        }

        .edit-box {
          margin-top: 20px;
          text-align: left;
        }

        .edit-box input {
          width: 100%;
          padding: 12px 14px;
          margin-top: 12px;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          background: rgba(255,255,255,0.04);
          color: white;
          outline: none;
          font-size: 14px;
        }

        .edit-box input::placeholder {
          color: rgba(255,255,255,0.4);
        }

        .edit-box input[type="file"] {
          padding: 10px;
          cursor: pointer;
        }

        @media (max-width: 480px) {
          .profile-card {
            padding: 28px 20px;
          }

          .profile-card h2 {
            font-size: 26px;
          }

          .profile-img {
            width: 115px;
            height: 115px;
          }
        }
      `}</style>

      <div className="profile-container">
        <div className="profile-card">

          <h2>👤 My Profile</h2>

          {/* IMAGE */}
          <div className="profile-img-wrap">
            <img
              src={
                user.image
                  ? `${API}/${user.image.replace(/^\//, "")}`
                  : `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.name
                    )}&background=001122&color=3ea6ff&size=120`
              }
              alt="profile"
              className="profile-img"
            />

            <div className="profile-status" />
          </div>

          {/* INFO */}
          <div className="profile-info">
            <p>
              <span>Name:</span>
              {user.name}
            </p>

            <p>
              <span>Email:</span>
              {user.email}
            </p>
          </div>

          {/* EDIT BUTTON */}
          <button
            className="btn edit"
            onClick={() => {
              setEditMode(true);
              setUpdatedName(user.name);
            }}
          >
            Edit Profile
          </button>

          {/* EDIT BOX */}
          {editMode && (
            <div className="edit-box">

              <input
                value={updatedName}
                onChange={(e) =>
                  setUpdatedName(e.target.value)
                }
                placeholder="Enter new name"
              />

              <input
                type="file"
                onChange={(e) =>
                  setImage(e.target.files[0])
                }
              />

              <button
                className="btn save"
                onClick={handleSave}
              >
                Save Changes
              </button>
            </div>
          )}

          {/* LOGOUT */}
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
