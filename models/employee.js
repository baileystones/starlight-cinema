import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true, trim: true },
  lastName: { type: String, required: true, trim: true },
  email: { 
    type: String, 
    required: true, 
    trim: true,
    match: [/^\S+@\S+\.\S+$/, "Please use a valid email address"]
  },
  phone: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 7
  },
  employeeId: { type: String, required: true, unique: true },
  positionId: { type: mongoose.Schema.Types.ObjectId, ref: "Position" },
  hireDate: { type: Date, default: Date.now },
  isActive: { type: Boolean, default: true },
  address: {
    street: { type: String },
    city: { type: String },
    state: { type: String },
    zip: { type: String }
  }
});


const Employee = mongoose.model("Employee", employeeSchema);
export default Employee;
