import express, { Router } from 'express';

import AuthController from '../controllers/auth';

const router: Router = express.Router();
const authController = new AuthController();

router.post('/login', authController.login);
router.post('/register', authController.register);

export default router;
