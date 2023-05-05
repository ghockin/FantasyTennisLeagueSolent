import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  savedLocalPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Local Players" }],
  savedGlobalPlayers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Global Players" }],
});

export const UserModel = mongoose.model("users", UserSchema);