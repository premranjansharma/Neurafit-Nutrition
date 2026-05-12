import React, { useEffect, useState } from "react";

export default function About() {
  const [content, setContent] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/content/about")
      .then(res => res.json())
      .then(data => setContent(data));
  }, []);

  return (
    <div>
      {content.map(item => (
        <div key={item._id}>
          <h2>{item.section}</h2>
          <p>{item.text}</p>
          {item.image && <img src={item.image} width="200" />}
        </div>
      ))}
    </div>
  );
}