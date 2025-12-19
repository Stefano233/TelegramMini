import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true }, // ID Firebase
  name: { type: String, default: "Utente" },
  // default static to avoid accessing uid when doc is null during upsert defaults
  email: { type: String, default: "" },
  imageURL: { type: String },
  online: { type: Boolean, default: false },
}, { timestamps: true });

export default mongoose.model("User", userSchema);
