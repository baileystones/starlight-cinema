import Position from "../models/position.js";

export async function getAllPositions(req, res) {
  const positions = await Position.find();
  res.json(positions);
}

export async function createPosition(req, res) {
  const position = new Position(req.body);
  await position.save();
  res.status(201).json(position);
}
