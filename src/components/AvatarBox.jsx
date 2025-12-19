import React from "react";
import profilo from "../Image/profilo.jpg";

export default function AvatarBox({ username, onLogout }) {
  return (
    <div
      className="bg-dark border border-secondary shadow m-4 d-flex flex-column align-items-center p-4"
      style={{
        width: "300px",
        height: "250px",
        borderRadius: "12px",
        backgroundColor: "#4f4f4f92",
      }}
    >
      <img
        src={profilo}
        alt="Avatar utente"
        className="rounded-circle mb-3"
        style={{ width: "120px", height: "120px" }}
      />

      <h5 className="text-white mb-3">{username || "Nome Utente"}</h5>

      <button
        className="btn btn-outline-light"
        style={{
          width: "100%",
          borderRadius: "8px",
          fontWeight: "bold",
        }}
        onClick={onLogout} // 🔥 usa la funzione passata da App
      >
        Logout
      </button>
    </div>
  );
}
