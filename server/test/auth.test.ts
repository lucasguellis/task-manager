import request from 'supertest';
import User from '../models/user';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { app } from '../index';

jest.mock('../models/user');
jest.mock('bcryptjs');
jest.mock('jsonwebtoken');

describe('AuthController', () => {
  describe('register', () => {
    it('should return 400 if no body is provided', async () => {
      const res = await request(app).post('/register').send({});
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Missing fields');
    });

    it('should return 400 if password is missing', async () => {
      const res = await request(app)
        .post('/register')
        .send({ username: 'test' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Missing fields');
    });

    it('should return 400 if username is missing', async () => {
      const res = await request(app)
        .post('/register')
        .send({ password: 'test' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('Missing fields');
    });

    it('should return 400 if user already exists', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(true);
      const res = await request(app)
        .post('/register')
        .send({ username: 'test', password: 'test' });
      expect(res.status).toBe(400);
      expect(res.body.error).toBe('User already exists');
    });

    it('should return 201 if user is created successfully', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(false);
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (User.prototype.save as jest.Mock).mockResolvedValue({});
      const res = await request(app)
        .post('/register')
        .send({ username: 'test', password: 'test' });
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.message).toBe('User created!');
    });

    it('should return 400 if there is an error creating the user', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(false);
      (bcrypt.genSalt as jest.Mock).mockResolvedValue('salt');
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashedPassword');
      (User.prototype.save as jest.Mock).mockRejectedValue(new Error('Error'));
      const res = await request(app)
        .post('/register')
        .send({ username: 'test', password: 'test' });
      expect(res.status).toBe(400);
      expect(res.body.message).toBe('User not created!');
    });
  });

  describe('login', () => {
    it('should return 401 if user does not exist', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);
      const res = await request(app)
        .post('/login')
        .send({ username: 'test', password: 'test' });
      expect(res.status).toBe(401);
      expect(res.body.error).toBe("User doesn't exist");
    });

    it('should return 401 if password is invalid', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        username: 'test',
        password: 'hashedPassword',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);
      const res = await request(app)
        .post('/login')
        .send({ username: 'test', password: 'test' });
      expect(res.status).toBe(401);
      expect(res.body.error).toBe('Invalid credentials');
    });

    it('should return a token if login is successful', async () => {
      (User.findOne as jest.Mock).mockResolvedValue({
        username: 'test',
        password: 'hashedPassword',
      });
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue('token');
      const res = await request(app)
        .post('/login')
        .send({ username: 'test', password: 'test' });
      expect(res.status).toBe(200);
      expect(res.body.token).toBe('token');
    });
  });
});
