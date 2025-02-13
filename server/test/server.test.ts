import request from 'supertest';
import { app } from '../index';

describe('Server', () => {
  it('should starts the server with proper environment', () => {
    expect(process.env.NODE_ENV).toBe('test');
    expect(app).toBeDefined();
  }, 10000);

  it('should return 200', async () => {
    const response = await request(app).get('/');
    expect(response.status).toBe(200);
  });
});
