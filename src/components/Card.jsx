import React, { useState } from "react";
import defaultImage from "../Image/defaultImage.png";

const Card = ({ name = "Utente", subtitle = "Online", imageURL }) => {
  const [hover, setHover] = useState(false);

  return (
    <div
      className="d-flex align-items-center p-2 px-4 border rounded"
      style={{
        width: "418px",
        borderColor: "#2b2b2b",
        cursor: "pointer",
        backgroundColor: hover ? "#343a40" : "transparent",
        boxShadow: hover ? "0 4px 15px rgba(0,0,0,0.3)" : "none",
        transition: "background-color 0.3s, box-shadow 0.3s",
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={imageURL || defaultImage}
        alt={name}
        width={60}
        height={60}
        className="rounded-circle me-3"
        referrerPolicy="no-referrer"
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = defaultImage; // fallback when remote avatar fails
        }}
      />
      <div>
        <h6 className="mb-0">{name}</h6>
        <small className="text-muted">{subtitle}</small>
      </div>
    </div>
  );
};

export default Card;
