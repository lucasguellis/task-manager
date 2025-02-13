import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface ITask {
  name: string;
  description: string;
  status: string;
  dueDate: Date;
  userId: mongoose.Types.ObjectId;
}

const TaskSchema = new Schema<ITask>(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ['pending', 'doing', 'done'],
      required: true,
    },
    dueDate: { type: Date, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  },
  { timestamps: true },
);

export default mongoose.model<ITask>('Task', TaskSchema);
