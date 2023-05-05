import mongoose from "mongoose";

const newsSchema = mongoose.Schema({
  articleDate1: {
    type: String,
    required: true,
  },
  article1: {
    type: String,
    required: true,
  },
  article2: {
    type: String,
    required: true,
  },
  articleDate2: {
    type: String,
    required: true,
  },
  article3: {
    type: String,
    required: true,
  },
});

export const NewsModel = mongoose.model("news", newsSchema);