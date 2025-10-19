import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  hireDate: Date,
  positionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Position"
  },
  training: {
    usher: Boolean,
    box: Boolean,
    door: Boolean,
    concessions: Boolean
  }
});

export default mongoose.model("Employee", employeeSchema);
