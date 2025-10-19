import Position from "../models/position.js";

// GET all positions
export const getAllPositions = async (req, res) => {
  try {
    const positions = await Position.find();
    res.status(200).json(positions);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET position by ID
export const getPositionById = async (req, res) => {
  try {
    const position = await Position.findById(req.params.id);
    if (!position) return res.status(404).json({ error: "Position not found" });
    res.status(200).json(position);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// POST create new position
export const createPosition = async (req, res) => {
  try {
    const position = new Position(req.body);
    await position.save();
    res.status(201).json({ id: position._id });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// PUT update position by ID
export const updatePosition = async (req, res) => {
  try {
    const updatedPosition = await Position.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPosition) return res.status(404).json({ error: "Position not found" });
    res.status(200).json(updatedPosition);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE position by ID
export const deletePosition = async (req, res) => {
  try {
    const deletedPosition = await Position.findByIdAndDelete(req.params.id);
    if (!deletedPosition) return res.status(404).json({ error: "Position not found" });
    res.status(200).json({ message: "Position deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
