import express from "express";
import User from "../models/User.js";

const router = express.Router();

// GET /api/users -> lista utenti (di default solo online)   {leggere}
router.get("/", async (req, res) => {
  try {
    const { online, maxAgeSec } = req.query;
    const filter = {}; //filtro per DB

    //logica online
    if (online === "true" || online === undefined) {
      // default 10s di inattività

      const age = Number(maxAgeSec);
      const maxAgeMs = Number.isFinite(age) ? age * 1000 : 10000;

      // setta lo stato offline se non si aggiorna da troppo 
      // problemi con il browser ecc ecc , si setta in maniera automatica 
      await User.updateMany(
        {
          online: true,
          updatedAt: { $lte: new Date(Date.now() - maxAgeMs) },
        },
        { $set: { online: false } }
      );

      filter.online = true;
      filter.updatedAt = { $gt: new Date(Date.now() - maxAgeMs) };
    }

    //user DB
    const users = await User.find(filter).sort({ updatedAt: -1 });
    res.json(users);

    //Test se qualcosa va storto 
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore server" });
  }
});

// POST /api/users -> crea o aggiorna un utente (gestisce online/offline) {inviare}
router.post("/", async (req, res) => {
  try {
    const { uid, name, email, imageURL, online } = req.body;

    // UID e' indispensabile, gli altri campi ricevono fallback(un qualcosa di riserva)
    if (!uid) {
      //controllo
      return res.status(400).json({ message: "UID mancante" });
    }

     //controlli 
    const safeName = name || email || "Utente";
    const safeEmail = email || `${uid}@placeholder.local`;
    const normalizedOnline =
      typeof online === "string"
        ? online.toLowerCase() === "true"
        : online;

    const user = await User.findOneAndUpdate(
      { uid },
      {
        name: safeName,
        email: safeEmail,
        imageURL,
        online: normalizedOnline !== undefined ? normalizedOnline : false,
      },
      { upsert: true, new: true }
    );

    res.json({ message: "Utente salvato", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Errore server" });
  }
});

export default router;
