import express from "express";
import { getAllEmployees, createEmployee } from "../controllers/employees.js";

const router = express.Router();

router.get("/", getAllEmployees);
router.post("/", createEmployee);

export default router;
