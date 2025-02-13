import { Shutdown } from '../../index';
import { closeDatabase } from '../../db/index';

export default async () => {
  await closeDatabase();
  await Shutdown();
};
