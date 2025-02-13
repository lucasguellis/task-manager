import express, { Router } from 'express';

import UserController from '../controllers/users';
import AuthController from '../controllers/auth';

const router: Router = express.Router();
const userController = new UserController();
const authController = new AuthController();

router.get(
  '/user/:id',
  authController.authenticateJWT,
  userController.getUserById,
);
router.get('/users', authController.authenticateJWT, userController.getUsers);

export default router;
