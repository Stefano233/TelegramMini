import { useState, useEffect } from "react";
import Sidebar from "./components/Sidebar";
import Login from "./components/Login";
import background from "./Image/background.jpg";
import { signOut } from "firebase/auth";
import { auth } from "./firebase";
import ChatCard from "./components/ChatCard";

export default function App() {
  const [user, setUser] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  // Sincronizza l'utente autenticato su backend MongoDB
  useEffect(() => {
    if (!user) return;


    //invio dati al DB in maniera POST
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

        //errore 
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
       //test server
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

        //Qui creiamo un messaggio veloce con URLSearchParams e lo inviamo con navigator.sendBeacon
        //mentre il browser si chiude.Il messaggio dice: “questo utente è offline
        const body = new URLSearchParams({
          uid: user.uid,
          name: user.displayName || "Utente",
          email: user.email || "",
          imageURL: user.photoURL || "",
          online: "false",
        });

        if (navigator.sendBeacon) {
          navigator.sendBeacon("http://localhost:5000/api/users", body);
          return;
        }

        fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8",
          },
          body,
          keepalive: true,
        }).catch(() => {});
      } catch (err) {
        console.error("Errore beacon offline:", err);
      }
    };

    window.addEventListener("pagehide", sendOffline);
    window.addEventListener("beforeunload", sendOffline);
    
    //togli i listener , per dublicazione 
    return () => {
      window.removeEventListener("pagehide", sendOffline);
      window.removeEventListener("beforeunload", sendOffline);
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
    const id = setInterval(pingOnline, 5000);
    return () => clearInterval(id);
  }, [user]);

  // Recupera utenti dal backend MongoDB (polling semplice) e aggiorna la lista ogni 10 secondi 
  // una spia 
  useEffect(() => {
    if (!user) return;

    const fetchUsers = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/users?online=false&maxAgeSec=10"
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

  // Se non c'� user, mostra Login
  if (!user) return <Login setUser={setUser} />;

  const isUserOnline = (val) =>
    val === true || val === "true" || val === 1 || val === "1";

  const isCurrentUser = (candidate) => {
    const sameUid = user?.uid && candidate?.uid && candidate.uid === user.uid;
    const sameEmail =
      user?.email &&
      candidate?.email &&
      candidate.email.toLowerCase() === user.email.toLowerCase();
    return sameUid || sameEmail;
  };

  const visibleUsers = onlineUsers.filter((u) => !isCurrentUser(u));
  const activeChatUser = selectedUser || visibleUsers[0];
  const activeStatus = activeChatUser
    ? isUserOnline(activeChatUser.online)
      ? "Online"
      : "Offline"
    : "Offline";
  const activeImageURL = activeChatUser
    ? activeChatUser.imageURL ||
      activeChatUser.photoURL ||
      activeChatUser.avatar ||
      (Array.isArray(activeChatUser.photos)
        ? activeChatUser.photos[0]
        : undefined)
    : undefined;

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
      <Sidebar
        user={user}
        logout={handleLogout}
        onlineUsers={visibleUsers}
        onSelectUser={setSelectedUser}
      />

      {/* Main content */}
      <main
        className="flex-fill text-white"
        style={{ backgroundColor: "rgba(0,0,0,0.05)", padding: 0 }}
      >
        <div style={{ width: "100%", height: "100%" }}>
          <ChatCard
            name={activeChatUser?.name || activeChatUser?.email || "Utente"}
            subtitle={activeStatus}
            imageURL={activeImageURL}
          />
        </div>
      </main>
    </div>
  );
}
