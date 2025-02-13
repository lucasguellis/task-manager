import express, { Request, Response, Express } from 'express';
import http from 'http';

import db from './db/index';
import tasks from './routes/tasks';
import users from './routes/users';
import auth from './routes/auth';

import { corsHandler } from './middlewares/cors';
import { loggingHandler } from './middlewares/logging';
import { ENVIRONMENT } from './config/config';

export const app: Express = express();
export let httpServer: ReturnType<typeof http.createServer>;
const apiPort = 3000;

export const Main = () => {
  app.use(express.urlencoded({ extended: true }));
  app.use(corsHandler);
  app.use(express.json());

  if (ENVIRONMENT !== 'test') {
    app.use(loggingHandler);
  }

  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

  app.use('/api', tasks);
  app.use('/api', users);
  app.use('/', auth);

  app.get('/', (req: Request, res: Response) => {
    return res.status(200).json({ success: true });
  });

  httpServer = http.createServer(app);

  if (ENVIRONMENT !== 'test') {
    httpServer.listen(apiPort, () =>
      console.log(`Server running on port ${apiPort}`),
    );
  }
};

export const Shutdown = async () => {
  if (httpServer && httpServer.listening) {
    await new Promise<void>((resolve, reject) => {
      httpServer.close((err) => (err ? reject(err) : resolve()));
    });
  }
  process.exit(0);
};

Main();
