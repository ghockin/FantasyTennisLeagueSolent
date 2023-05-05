import express from "express";
import mongoose from "mongoose";
import { top20PlayersGlobalModel } from "../models/top20PlayersGlobal.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await top20PlayersGlobalModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a squad by ID
router.get("/:playersId", async (req, res) => {
  try {
    const result = await top20PlayersGlobalModel.findById(req.params.playersId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Save a squad
router.put("/", async (req, res) => {
  const players = await top20PlayersGlobalModel.findById(req.body.playersID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedGlobalPlayers.push(players);
    await user.save();
    res.status(201).json({ savedPlayers: user.savedGlobalPlayers });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get id of saved squads
router.get("/savedPlayers/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedPlayers: user?.savedGlobalPlayers });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get saved recipes
router.get("/savedPlayers/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedPlayers = await top20PlayersGlobalModel.find({
      _id: { $in: user.savedGlobalPlayers },
    });

    res.status(201).json({ savedPlayers });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export { router as top20PlayersGlobalRouter };