import request from 'supertest';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { app } from '../index';

jest.mock('../models/user');
jest.mock('jsonwebtoken');

describe('UserController', () => {
  beforeEach(() => {
    (jwt.verify as jest.Mock).mockReturnValue({ userId: '1' });
  });

  const authorizedRequest = (method: string, url: string) => {
    return (request(app) as any)
      [method](url)
      .set('Authorization', 'Bearer token');
  };

  describe('getUserById', () => {
    it('should return 200 and the user data if user is found', async () => {
      const mockUser = { _id: '1', name: 'user 1' };
      (User.findOne as jest.Mock).mockResolvedValue(mockUser);

      const res = await authorizedRequest('get', '/api/user/1').send();

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ success: true, data: mockUser });
    });

    it('should return 404 if user is not found', async () => {
      (User.findOne as jest.Mock).mockResolvedValue(null);

      const res = await authorizedRequest('get', '/api/user/1');

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ success: false, error: 'User not found' });
    });

    it('should return 400 if there is an error', async () => {
      (User.findOne as jest.Mock).mockRejectedValue(
        new Error('Database error'),
      );

      const res = await authorizedRequest('get', '/api/user/1');

      expect(res.status).toBe(400);
      expect(res.body).toEqual({ success: false, error: 'Database error' });
    });
  });

  describe('getUsers', () => {
    it('should return 200 and the users data if users are found', async () => {
      const mockUsers = [
        { _id: '1', name: 'user 1' },
        { _id: '2', name: 'user 2' },
      ];
      (User.find as jest.Mock).mockResolvedValue(mockUsers);

      const res = await authorizedRequest('get', '/api/users');

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ success: true, data: mockUsers });
    });

    it('should return 404 if no users are found', async () => {
      (User.find as jest.Mock).mockResolvedValue([]);

      const res = await authorizedRequest('get', '/api/users');

      expect(res.status).toBe(404);
      expect(res.body).toEqual({ success: false, error: 'Users not found' });
    });
  });
});
