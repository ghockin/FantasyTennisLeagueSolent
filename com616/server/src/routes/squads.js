import express from "express";
import mongoose from "mongoose";
import { SquadsModel } from "../models/Squads.js";
import { UserModel } from "../models/Users.js";
import { verifyToken } from "./user.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const result = await SquadsModel.find({});
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Create a new squad
router.post("/", verifyToken, async (req, res) => {
  const squad = new SquadsModel({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    userOwner: req.body.userOwner,
  });
  console.log(squad);

  try {
    const result = await squad.save();
    res.status(201).json({
      createdSquad: {
        name: result.name,
        _id: result._id,
      },
    });
  } catch (err) {
    // console.log(err);
    res.status(500).json(err);
  }
});

// Get a recipe by ID
router.get("/:squadId", async (req, res) => {
  try {
    const result = await SquadsModel.findById(req.params.squadId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Save a squad
router.put("/", async (req, res) => {
  const squad = await SquadsModel.findById(req.body.squadID);
  const user = await UserModel.findById(req.body.userID);
  try {
    user.savedSquads.push(squad);
    await user.save();
    res.status(201).json({ savedSquads: user.savedSquads });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get id of saved squads
router.get("/savedSquads/ids/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    res.status(201).json({ savedSquads: user?.savedSquads });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Get saved recipes
router.get("/savedSquads/:userId", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.userId);
    const savedSquads = await SquadsModel.find({
      _id: { $in: user.savedSquads },
    });

    console.log(savedSquads);
    res.status(201).json({ savedSquads });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

export { router as squadsRouter };