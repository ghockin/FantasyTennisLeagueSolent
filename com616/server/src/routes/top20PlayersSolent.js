import express from "express";
import mongoose from "mongoose";
import { top20PlayersSolentModel } from "../models/top20PlayersSolent.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await top20PlayersSolentModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a squad by ID
router.get("/:playersId", async (req, res) => {
  try {
    const result = await top20PlayersSolentModel.findById(req.params.playersId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Save a squad
router.put("/", async (req, res) => {
  const players = await top20PlayersSolentModel.findById(req.body.playersID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedLocalPlayers.push(players);
    await user.save();
    res.status(201).json({ savedPlayers: user.savedLocalPlayers });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get id of saved players
router.get("/savedPlayers/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedPlayers: user?.savedLocalPlayers });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get saved Players
router.get("/savedPlayers/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedPlayers = await top20PlayersSolentModel.find({
      _id: { $in: user.savedLocalPlayers },
    });

    res.status(201).json({ savedPlayers });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export { router as top20PlayersSolentRouter };