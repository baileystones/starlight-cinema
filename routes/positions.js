import { ensureAuthenticated } from "../middleware/authMiddleware.js";
import express from "express";
import {
  getAllPositions,
  getPositionById,
  createPosition,
  updatePosition,
  deletePosition
} from "../controllers/positions.js";

const router = express.Router();

router.get("/", ensureAuthenticated, getAllPositions);
router.get("/:id", ensureAuthenticated,  getPositionById);
router.post("/", ensureAuthenticated, createPosition);
router.put("/:id", ensureAuthenticated, updatePosition);
router.delete("/:id", ensureAuthenticated, deletePosition);

export default router;
