import { ensureAuthenticated } from "../middleware/authMiddleware.js";
import express from "express";
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from "../controllers/employees.js";

const router = express.Router();

router.get("/", ensureAuthenticated, getAllEmployees);
router.get("/:id", ensureAuthenticated, getEmployeeById);
router.post("/", ensureAuthenticated, createEmployee);
router.put("/:id", ensureAuthenticated, updateEmployee);
router.delete("/:id", ensureAuthenticated, deleteEmployee);

export default router;
