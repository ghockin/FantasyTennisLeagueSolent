import express from "express";
import { NewsModel } from "../models/News.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
      const result = await NewsModel.find({});
      res.status(200).json(result);
  } catch (err) {
      res.status(500).json(err);
  }
});

export { router as newsRouter };