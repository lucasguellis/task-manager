import { Status } from './Status.ts';

export type User = {
  name: string;
  description: string;
  status: Status;
  dueDate: string;
  userId: string;
};
