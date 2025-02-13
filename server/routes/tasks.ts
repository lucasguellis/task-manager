import express, { Router } from 'express';

import AuthController from '../controllers/auth';
import TaskController from '../controllers/tasks';

const router: Router = express.Router();
const taskController = new TaskController();
const authController = new AuthController();

router.get(
  '/tasks/:userId',
  authController.authenticateJWT,
  taskController.getTasksByUserId,
);
router.post(
  '/tasks',
  authController.authenticateJWT,
  taskController.createTask,
);
router.put(
  '/tasks/:id',
  authController.authenticateJWT,
  taskController.updateTask,
);
router.delete(
  '/tasks/:id',
  authController.authenticateJWT,
  taskController.deleteTask,
);

export default router;
