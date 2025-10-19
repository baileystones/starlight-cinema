import Employee from "../models/employee.js";

export async function getAllEmployees(req, res) {
  const employees = await Employee.find().populate("positionId");
  res.json(employees);
}

export async function createEmployee(req, res) {
  const employee = new Employee(req.body);
  await employee.save();
  res.status(201).json(employee);
}
