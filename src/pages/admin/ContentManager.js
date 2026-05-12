import React, { useState } from "react";

export default function ContentManager() {

  const [form, setForm] = useState({
    page: "",
    section: "",
    text: "",
    image: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const saveContent = async () => {
    await fetch("http://localhost:5000/api/content", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(form)
    });

    alert("Saved!");
  };

  return (
    <div>
      <h2>Admin CMS</h2>

      <input name="page" placeholder="Page (about/home)" onChange={handleChange} />
      <input name="section" placeholder="Section" onChange={handleChange} />
      <textarea name="text" placeholder="Text" onChange={handleChange} />
      <input name="image" placeholder="Image URL" onChange={handleChange} />

      <button onClick={saveContent}>Save</button>
    </div>
  );
}