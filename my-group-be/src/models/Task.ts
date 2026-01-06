import mongoose, { Schema, Document } from "mongoose"

export interface ITask extends Document {
  title: string
  due: string
  status: "Pending" | "In Progress" | "Completed"
  userId: string 
  assignedTo?: string
}

const taskSchema = new Schema<ITask>({
  title: { type: String, required: true },
  due: { type: String, required: true },
  userId: { type: String, required: true },
  assignedTo: { type: String },
  status: { type: String, default: "Pending" },
})
export default mongoose.model<ITask>("Task", taskSchema)
