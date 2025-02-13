import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { JWT_SECRET } from '../config/config';

interface AuthenticatedRequest extends Request {
  user?: any;
}

class AuthController {
  register = async (req: Request, res: Response): Promise<Response> => {
    const body = req.body;
    if (!body) {
      return res.status(400).json({ success: false, error: 'You must provide a user' });
    }

    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);
    const user = new User({ username, password: passwordHash });

    try {
      await user.save();
      return res.status(201).json({ success: true, id: user._id, message: 'User created!' });
    } catch (error) {
      return res.status(400).json({ error, message: 'User not created!' });
    }
  };

  login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ error: "User doesn't exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ username, userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    return res.json({ token });
  };

  authenticateJWT = (req: AuthenticatedRequest, res: Response, next: NextFunction): Response | void => {
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ error: 'Access denied' });
    }

    try {
      req.user = jwt.verify(token, JWT_SECRET);
      next();
    } catch {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
}

export default AuthController;
