import mongoose from "mongoose";

const top20PlayersGlobalSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  points: {
    type: String,
    required: true,
  },
  localRank: {
    type: String,
    required: true,
  },
  nationalRank: {
    type: String,
    required: true,
  },
  age: {
    type: String,
    required: true,
  },
});

export const top20PlayersGlobalModel = mongoose.model("top20PlayersGlobal", top20PlayersGlobalSchema);