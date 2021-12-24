import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof CustomError) {
      res.status(err.statusCode).json({ ok: false, errors: err.serializeErrors() });
      next();
    }
};
