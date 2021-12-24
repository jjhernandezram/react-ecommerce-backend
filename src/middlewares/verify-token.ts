import { Request, Response, NextFunction } from 'express';
import User from '../models/user.model';

import { RequestError, UnhandledError } from '../errors/error-handlers';
import { verifyJwt } from '../utils/verify-jwt';

export const tokenVerification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.cookies;
    if (!token) return next(new RequestError('Login to get access to this resource.', 401));

    const id = verifyJwt(token);
    const user = await User.findById(id);
    if (!user) return next(new RequestError('Login to get access to this resource.', 401));

    req.user = user;

    next();
  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};
