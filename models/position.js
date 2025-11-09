import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  department: { type: String }
});

export default mongoose.model("Position", positionSchema);
