import mongoose from "mongoose";
import "dotenv/config";
import User from "./models/User.js";

const run = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    const result = await User.updateMany(
      { online: true },
      { $set: { online: false } }
    );
    console.log(`Reset online: ${result.modifiedCount || 0} utenti`);
  } catch (err) {
    console.error("Errore reset online:", err);
  } finally {
    await mongoose.connection.close();
  }
};

run();
