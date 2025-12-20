import React, { useState } from "react";
import { FiMenu } from "react-icons/fi";
import { AiOutlineSearch } from "react-icons/ai";
import AvatarBox from "./AvatarBox";
import { IoMdClose } from "react-icons/io";
import Card from "./Card";

export default function Sidebar({
  user,
  logout,
  onlineUsers = [],
  onSelectUser,
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredUsers = onlineUsers.filter((u) =>
    (u.name || u.email || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        width: "450px",
        height: "100vh",
        backgroundColor: "#1e1e1e",
        padding: "16px",
      }}
    >
      {/* Header con menu e ricerca */}
      <div className="d-flex align-items-start w-100" style={{ gap: "10px" }}>
        {/* Icona menu minimal */}
        <div style={{ cursor: "pointer" }} onClick={() => setMenuOpen(!menuOpen)}>
          <FiMenu size={24} color="#fff" />
        </div>

        {/* Barra di ricerca lunga e sottile */}
        <div className="position-relative flex-fill mt-3">
          <div
            className="position-absolute"
            style={{ left: "12px", top: "50%", transform: "translateY(-50%)" }}
          >
            <AiOutlineSearch size={17} color="#fff" />
          </div>

          <input
            type="text"
            className="form-control bg-dark text-white border border-secondary rounded-pill"
            placeholder="Cerca..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            style={{
              height: "30px",
              paddingLeft: "2rem",
            }}
          />
          {search.length > 0 && (
            <button
              type="button"
              className="btn btn-link text-white position-absolute end-0 me-2"
              style={{ top: "50%", transform: "translateY(-50%)" }}
              onClick={() => setSearch("")}
            >
              <IoMdClose />
            </button>
          )}
        </div>
      </div>

      {/* Menu a comparsa */}
      {menuOpen && (
        <div style={{ marginTop: "10px" }}>
          <AvatarBox
            username={user?.displayName || user?.email}
            imageURL={user?.photoURL}
            onLogout={logout}
          />
        </div>
      )}
      <div className="overflow-auto bg-dark mt-3" style={{ height: "100vh" }}>
        {filteredUsers.length === 0 ? (
          <p className="text-white px-3">Nessun utente trovato</p>
        ) : (
          filteredUsers.map((u) => (
            <Card
              key={u.uid || u._id || u.id}
              name={u.name || u.email || "Utente"}
              subtitle={u.online ? "Online" : "Offline"}
              // Usa più sorgenti per l'immagine, con fallback gestito in Card
              imageURL={
                u.imageURL ||
                u.photoURL ||
                u.avatar ||
                (Array.isArray(u.photos) ? u.photos[0] : undefined)
              }
              onClick={() => onSelectUser?.(u)}
            />
          ))
        )}
      </div>
    
    </div>
  );
}
