import mongoose from "mongoose";

const top20PlayersSolentSchema = new mongoose.Schema({
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
  birth: {
    type: String,
    required: true,
  },
});

export const top20PlayersSolentModel = mongoose.model("top20PlayersSolent", top20PlayersSolentSchema);