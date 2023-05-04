import mongoose from "mongoose";

const squadSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  userOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const SquadsModel = mongoose.model("squads", squadSchema);