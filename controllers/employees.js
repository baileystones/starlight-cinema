import Employee from "../models/employee.js";
import mongoose from "mongoose";

// GET all employees
export const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// GET employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// POST create new employee
export const createEmployee = async (req, res) => {
  try {
    const { firstName, lastName, email, employeeId } = req.body;

    if (!firstName || !lastName || !email || !employeeId) {
      return res
        .status(400)
        .json({ message: "Missing required fields: firstName, lastName, email, employeeId" });
    }

    const exists = await Employee.findOne({ employeeId });
    if (exists) {
      return res.status(400).json({ message: "Employee with that ID already exists." });
    }

    const employee = new Employee(req.body);
    const newEmployee = await employee.save();
    res.status(201).json(newEmployee);
  } catch (err) {
    console.error(err);
    if (err.name === "ValidationError") {
      return res.status(400).json({ message: "Bad Request: " + err.message });
    }
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// PUT update employee
export const updateEmployee = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Bad Request: " + err.message });
  }
};

// DELETE employee
export const deleteEmployee = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID format." });
    }

    const deleted = await Employee.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};
