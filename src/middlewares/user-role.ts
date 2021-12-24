import { Request, Response, NextFunction } from 'express';
import { RequestError, UnhandledError } from '../errors/error-handlers';

export const validAdminRole = (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user.role !== "ADMIN_ROLE") return next(new RequestError("You don't have permission to access this.", 403));
    next();

  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};
