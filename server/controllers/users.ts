import { HydratedDocument } from 'mongoose';
import User, { IUser } from '../models/user';
import { Request, Response } from 'express';

class UserController {
  getUserById = async (req: Request, res: Response): Promise<Response> => {
    try {
      const user: IUser | null = await User.findOne({ _id: req.params.id });
      if (!user) {
        return res
          .status(404)
          .json({ success: false, error: 'User not found' });
      }
      return res.status(200).json({ success: true, data: user });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: error.message });
    }
  };

  getUsers = async (req: Request, res: Response): Promise<Response> => {
    try {
      const users: IUser[] = await User.find({});
      if (!users.length) {
        return res
          .status(404)
          .json({ success: false, error: 'Users not found' });
      }
      return res.status(200).json({ success: true, data: users });
    } catch (error: any) {
      return res.status(400).json({ success: false, error: error.message });
    }
  };
}

export default UserController;
