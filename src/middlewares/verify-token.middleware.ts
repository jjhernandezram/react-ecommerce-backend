import { Request, Response, NextFunction } from 'express';

export const tokenVerification = (req: Request, res: Response, next: NextFunction) => {
  console.log('token middleware', req.cookies);
  next();
};
