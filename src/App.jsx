import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import background from "./Image/background.jpg";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";

export default function App() {
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  // Sincronizza l'utente autenticato su backend MongoDB
  useEffect(() => {
    if (!user) return;

    const syncUserToBackend = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: user.uid,
            name: user.displayName || "Utente",
            email: user.email || "",
            imageURL: user.photoURL || "",
            online: true,
          }),
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }

        console.log("Utente sincronizzato su backend Mongo");
      } catch (err) {
        console.error("Errore sync backend:", err);
      }
    };

    syncUserToBackend();
  }, [user]);

  // Marca offline quando la pagina viene chiusa o ricaricata
  useEffect(() => {
    if (!user) return;

    const sendOffline = () => {
      try {
        const payload = {
          uid: user.uid,
          name: user.displayName || "Utente",
          email: user.email || "",
          imageURL: user.photoURL || "",
          online: false,
        };
        const json = JSON.stringify(payload);

        if (navigator.sendBeacon) {
          const blob = new Blob([json], { type: "application/json" });
          const delivered = navigator.sendBeacon(
            "http://localhost:5000/api/users",
            blob
          );
          if (delivered) return;
        }

        fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: json,
          keepalive: true,
        }).catch(() => {});
      } catch (err) {
        console.error("Errore beacon offline:", err);
      }
    };

    const onVisibilityChange = () => {
      if (document.visibilityState === "hidden") sendOffline();
    };

    window.addEventListener("pagehide", sendOffline);
    window.addEventListener("beforeunload", sendOffline);
    window.addEventListener("visibilitychange", onVisibilityChange);
    window.addEventListener("unload", sendOffline);

    return () => {
      // tentativo finale di segnare offline in cleanup
      sendOffline();
      window.removeEventListener("pagehide", sendOffline);
      window.removeEventListener("beforeunload", sendOffline);
      window.removeEventListener("visibilitychange", onVisibilityChange);
      window.removeEventListener("unload", sendOffline);
    };
  }, [user]);

  // Mantiene aggiornato lo stato online finche' la pagina e' aperta
  useEffect(() => {
    if (!user) return;

    const pingOnline = async () => {
      try {
        await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            uid: user.uid,
            name: user.displayName || "Utente",
            email: user.email || "",
            imageURL: user.photoURL || "",
            online: true,
          }),
          keepalive: true,
        });
      } catch (err) {
        // silent: verra' ritentato al tick successivo
      }
    };

    pingOnline();
    const id = setInterval(pingOnline, 5000); // ogni 5s aggiorna updatedAt
    return () => clearInterval(id);
  }, [user]);

  // Recupera utenti dal backend MongoDB (polling semplice)
  useEffect(() => {
    if (!user) return;

    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/users?online=true&maxAgeSec=10"
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setOnlineUsers(data);
      } catch (err) {
        console.error("Errore fetch utenti backend:", err);
      }
    };

    fetchUsers();
    const id = setInterval(fetchUsers, 10000);
    return () => clearInterval(id);
  }, [user]);

  // Logout
  const handleLogout = async () => {
    try {
      if (user) {
        try {
          await fetch("http://localhost:5000/api/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              uid: user.uid,
              name: user.displayName || "Utente",
              email: user.email || "",
              imageURL: user.photoURL || "",
              online: false,
            }),
          });
        } catch (err) {
          console.error("Errore sync offline:", err);
        }
      }

      await signOut(auth);
      setUser(null);
      setOnlineUsers([]);
    } catch (err) {
      console.error("Errore logout:", err);
    }
  };

  // Se non c'e user, mostra Login
  if (!user) return <Login setUser={setUser} />;

  const isUserOnline = (val) =>
    val === true || val === "true" || val === 1 || val === "1";

  const visibleUsers = onlineUsers.filter(
    (u) => u.uid !== user?.uid && isUserOnline(u.online)
  );

  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        width: "100vw",
        backgroundImage: `url(${background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* Sidebar */}
      <Sidebar user={user} logout={handleLogout} onlineUsers={visibleUsers} />

      {/* Main content */}
      <main
        className="flex-fill p-4 text-white"
        style={{ backgroundColor: "rgba(0,0,0,0.05)" }}
      >
        <h2 style={{ textShadow: "1px 1px 3px rgba(0,0,0,0.7)" }}>
          Benvenuto {user.displayName || "Utente"}
        </h2>
        <p style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.7)" }}>
          Email: {user.email || "Non disponibile"}
        </p>

        {/* Lista utenti online */}
        <div className="mt-4 p-3 bg-dark rounded text-white">
          <h5>Utenti online:</h5>
          {visibleUsers.length === 0 ? (
            <p>Nessuno online</p>
          ) : (
            <ul>
              {visibleUsers.map((u, i) => (
                <li key={i}>{u.name || u.email}</li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
