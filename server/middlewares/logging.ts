import { Request, Response, NextFunction } from 'express';

export function loggingHandler(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  console.log(`${req.method} - ${req.url}`);

  res.on('finish', () => {
    console.log(`${req.method} - ${req.url} - ${res.statusCode}`);
  });

  next();
}
