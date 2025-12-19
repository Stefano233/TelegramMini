import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import "dotenv/config";
import userRoutes from "./routes/userRoutes.js";
import User from "./models/User.js";

const app = express();

// Middleware, Senza , il server non capirebbe il contenuto delle richieste.
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/api/users", userRoutes);

// Endpoint di test rapido
app.get("/api/test", (req, res) => {
  res.json({ message: "API funzionante e pronta per ricevere dati!" });
});

// Connessione a MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("Connesso a MongoDB");

    // job di pulizia: marca offline gli utenti stantii
    const STALE_MS = 10000; // 10s
    setInterval(async () => {
      try {
        await User.updateMany(
          {
            online: true,
            updatedAt: { $lte: new Date(Date.now() - STALE_MS) },
          },
          { $set: { online: false } }
        );
      } catch (err) {
        console.error("Errore reset online:", err);
      }
    }, 5000); // ogni 5s
  })
  .catch((err) => console.error("Errore MongoDB:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server avviato su http://localhost:${PORT}`));
