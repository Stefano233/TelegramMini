import React from "react";
import defaultImage from "../Image/defaultImage.png";

const ChatCard = ({ name = "Utente", subtitle = "Online", imageURL }) => {
  return (
    <div
      className="d-flex flex-column border rounded"
      style={{
        width: "100%",
        height: "100%",
        minHeight: "520px",
        backgroundColor: "transparent",
        borderColor: "#2b2b2b",
        overflow: "hidden",
      }}
    >
      <div
        className="d-flex align-items-center px-3 py-2"
        style={{
          backgroundColor: "#222",
          borderBottom: "1px solid #2b2b2b",
          gap: "12px",
        }}
      >
        <img
          src={imageURL || defaultImage}
          alt={name}
          width={48}
          height={48}
          className="rounded-circle"
          referrerPolicy="no-referrer"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = defaultImage;
          }}
        />
        <div>
          <div className="text-white fw-semibold">{name}</div>
          <small
            className={`status-text ${
              subtitle === "Online" ? "status-online" : "status-offline"
            }`}
          >
            {subtitle}
          </small>
        </div>
      </div>

      <div
        className="flex-fill px-3 py-3"
        style={{
          backgroundColor: "transparent",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <div
          style={{
            maxWidth: "70%",
            alignSelf: "flex-start",
            backgroundColor: "#2a2a2a",
            color: "#e8e8e8",
            padding: "10px 12px",
            borderRadius: "12px 12px 12px 4px",
            fontSize: "14px",
          }}
        >
          Ciao amore mi ami ?? mi pensi ?.
        </div>
        <div
          style={{
            maxWidth: "70%",
            alignSelf: "flex-end",
            backgroundColor: "#3b5bdb",
            color: "#ffffff",
            padding: "10px 12px",
            borderRadius: "12px 12px 4px 12px",
            fontSize: "14px",
          }}
        >
          No non ti amo più 
        </div>
        <div
          style={{
            maxWidth: "70%",
            alignSelf: "flex-start",
            backgroundColor: "#2a2a2a",
            color: "#e8e8e8",
            padding: "10px 12px",
            borderRadius: "12px 12px 12px 4px",
            fontSize: "14px",
          }}
        >
          😭
        </div>
      </div>

      <div
        className="d-flex align-items-center px-3 py-2"
        style={{
          backgroundColor: "transparent",
          borderTop: "1px solid #2b2b2b",
          gap: "10px",
        }}
      >
        <input
          type="text"
          className="form-control bg-dark text-white border border-secondary"
          placeholder="Scrivi un messaggio..."
          style={{ borderRadius: "20px" }}
        />
        <button
          type="button"
          className="btn btn-primary d-flex align-items-center justify-content-center"
          style={{ width: "44px", height: "38px", borderRadius: "12px" }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              d="M21.5 12L3 21L6 12L3 3L21.5 12Z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default ChatCard;
