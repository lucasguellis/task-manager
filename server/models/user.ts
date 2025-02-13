import mongoose from 'mongoose';
const Schema = mongoose.Schema;

export interface IUser {
  username: string;
  password: string;
  tasks: mongoose.Types.ObjectId[];
}

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'Task' }],
  },
  { timestamps: true },
);

export default mongoose.model<IUser>('User', UserSchema);
