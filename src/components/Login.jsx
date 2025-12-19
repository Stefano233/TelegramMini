import React from "react";
import logo from "../Image/logo.png";
import google from "../Image/google.png";

import { auth, provider } from "../firebase";
import { signInWithPopup } from "firebase/auth";



export default function Login({ setUser }) {

  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
       // Serve per fare il login con un account esterno
       // auth → indica a Firebase che vogliamo fare autenticazione
       // provider → indica Google come metodo di login
      setUser(result.user);
      console.log("Utente loggato:", result.user.displayName, result.user.email);
    } catch (error) {
      console.error("Errore login:", error);
      alert(error.message);
    }
  };

  return (
    <div 
      className="d-flex justify-content-center align-items-center"
      style={{ 
        width: "100vw",
        height: "100vh",
        backgroundColor: "#252525"  // sfondo uniforme
      }}
    >
      <div className="bg-dark p-5 rounded shadow text-center" style={{ width: "100%", maxWidth: "400px" }}>
        
        {/* Logo */}
        <img src={logo} width={80} height={80} alt="Logo Telegram" className="mb-4" />

        {/* Titolo */}
        <h1 className="text-white mb-4">Telegram Web</h1>

        {/* Bottone Google */}
        <button
          onClick={handleGoogleLogin}
          className="btn btn-light d-flex align-items-center justify-content-center rounded-pill w-100"
          style={{ gap: "0.5rem" }}
        >
          <img src={google} width={25} height={25} alt="Google Logo" />
          <span className="fw-bold">Login with Google</span>
        </button>
      </div>
    </div>
  );
}
