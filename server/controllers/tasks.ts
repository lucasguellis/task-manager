import { HydratedDocument } from 'mongoose';
import Task, { ITask } from '../models/task';
import User, { IUser } from '../models/user';
import { Request, Response } from 'express';

class TaskController {
  getTasksByUserId = async (req: Request, res: Response): Promise<Response> => {
    try {
      const tasks: ITask[] = await Task.find({ userId: req.params.userId });

      return res.status(200).json({ success: true, data: tasks || [] });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  };

  createTask = async (req: Request, res: Response): Promise<Response> => {
    try {
      const task: HydratedDocument<ITask> = new Task(req.body);
      await task.save();

      const user: HydratedDocument<IUser> | null = await User.findById(task.userId);

      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: 'User not found' });
      }

      user.tasks.push(task._id);
      await user.save();

      return res.status(201).json({ success: true, data: task });
    } catch (error: any) {
      console.log(error.message);

      return res.status(400).json({ success: false, error: error.message });
    }
  };

  updateTask = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const task: ITask | null = await Task.findByIdAndUpdate(id, req.body);
      return res.status(200).json({ success: true, data: task });
    } catch (error) {
      return res.status(404).json({ success: false, error });
    }
  };

  deleteTask = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { id } = req.params;
      const task: ITask | null = await Task.findByIdAndDelete(id);
      return res.status(200).json({ success: true, data: task });
    } catch (error) {
      return res.status(404).json({ success: false, error });
    }
  };
}

export default TaskController;
