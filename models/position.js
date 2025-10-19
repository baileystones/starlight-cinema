import mongoose from "mongoose";

const positionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  salary: Number
});

export default mongoose.model("Position", positionSchema);
