import request from 'supertest';
import Task from '../models/task';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { app } from '../index';

jest.mock('../models/task');
jest.mock('../models/user');
jest.mock('jsonwebtoken');

describe('TaskController', () => {
  beforeEach(() => {
    (jwt.verify as jest.Mock).mockReturnValue({ userId: '1' });
  });

  const authorizedRequest = (method: string, url: string) => {
    return (request(app) as any)
      [method](url)
      .set('Authorization', 'Bearer token');
  };

  describe('getTasksByUserId', () => {
    it('should return tasks for a given user', async () => {
      const mockUser = { _id: '1', name: 'user 1' };
      const mockTasks = [{ _id: '1', title: 'Test Task', userId: '1' }];
      (User.findById as jest.Mock).mockResolvedValue(mockUser);
      (Task.find as jest.Mock).mockResolvedValue(mockTasks);

      const res = await authorizedRequest('get', `/api/tasks/${mockUser._id}`);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.length).toBe(1);
      expect(res.body.data[0]._id).toBe(mockTasks[0]._id);
    });
  });

  describe('createTask', () => {
    it('should create a new task', async () => {
      const mockUser = { _id: '1', tasks: [], name: 'user 1', save: jest.fn() };
      const mockTask = {
        _id: '1',
        name: 'New Task',
        userId: '1',
        save: jest.fn(),
      };
      (User.findById as jest.Mock).mockResolvedValue(mockUser);
      (Task.create as jest.Mock).mockResolvedValue(mockTask);

      const taskData = {
        name: 'New Task',
        description: 'New Task Description',
        status: 'New Task Status',
        dueDate: new Date(),
        userId: '1',
      };

      const res = await authorizedRequest('post', '/api/tasks').send(taskData);

      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
    });

    it('should return 404 if user not found', async () => {
      (User.findById as jest.Mock).mockResolvedValue(null);

      const taskData = { title: 'New Task', userId: 'nonexistentUserId' };

      const res = await authorizedRequest('post', '/api/tasks').send(taskData);

      expect(res.status).toBe(404);
      expect(res.body.success).toBe(false);
      expect(res.body.error).toBe('User not found');
    });
  });

  describe('updateTask', () => {
    it('should update an existing task', async () => {
      const mockTask = { _id: '1', title: 'Old Task' };
      const updatedTaskData = { title: 'Updated Task' };
      (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue({
        ...mockTask,
        ...updatedTaskData,
      });

      const res = await authorizedRequest(
        'put',
        `/api/tasks/${mockTask._id}`,
      ).send(updatedTaskData);

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(updatedTaskData.title);
    });
  });

  describe('deleteTask', () => {
    it('should delete an existing task', async () => {
      const mockTask = { _id: '1', title: 'Task to be deleted' };
      (Task.findByIdAndDelete as jest.Mock).mockResolvedValue(mockTask);

      const res = await authorizedRequest(
        'delete',
        `/api/tasks/${mockTask._id}`,
      );

      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe(mockTask._id);
    });


  });
});
