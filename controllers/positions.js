import Position from "../models/position.js";
import mongoose from "mongoose";

// GET all positions
export const getAllPositions = async (req, res) => {
  try {
    const positions = await Position.find();
    res.status(200).json(positions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// GET position by ID
export const getPositionById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const position = await Position.findById(req.params.id);
    if (!position) {
      return res.status(404).json({ message: "Position not found" });
    }

    res.status(200).json(position);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// POST create new position
export const createPosition = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Missing required field: title" });
    }

    const position = new Position(req.body);
    await position.save();
    res.status(201).json(position);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Bad Request: " + err.message });
  }
};

// PUT update position by ID
export const updatePosition = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const updatedPosition = await Position.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedPosition) {
      return res.status(404).json({ message: "Position not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Bad Request: " + err.message });
  }
};

// DELETE position by ID
export const deletePosition = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const deletedPosition = await Position.findByIdAndDelete(req.params.id);
    if (!deletedPosition) {
      return res.status(404).json({ message: "Position not found" });
    }

    res.status(200).json({ message: "Position deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};
