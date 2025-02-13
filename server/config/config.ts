import dotenv from 'dotenv';

dotenv.config();

export const JWT_SECRET: string = process.env.JWT_SECRET || 'default';
export const ENVIRONMENT: 'development' | 'production' | 'test' =
  (process.env.NODE_ENV as 'development' | 'production' | 'test') || 'test';
export const DB_DSN: 'localhost' | 'mongo_db' = [
  'development',
  'test',
].includes(ENVIRONMENT)
  ? 'localhost'
  : 'mongo_db';
