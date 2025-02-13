import mongoose, { Mongoose, Connection } from 'mongoose';
import { DB_DSN } from '../config/config';

const db: Promise<Mongoose> = mongoose
  .connect(`mongodb://${DB_DSN}:1521/taskManager`)
  .catch((e: Error) => {
    console.error('Connection error', e.message);
    throw e;
  });

export const closeDatabase = async (): Promise<void> => {
  await mongoose.connection.close();
};

const connection: Connection = mongoose.connection;
export default connection;
