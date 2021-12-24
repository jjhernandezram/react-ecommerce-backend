import { NextFunction, Request, Response } from 'express';

import User from '../models/user.model';
import { RequestError, UnhandledError } from '../errors/error-handlers';
import { deleteToken, saveToken } from '../utils/cookie-params';

export const authLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Getting inputs from the requests
    const email = req.body.email.toLowerCase();
    const { password } = req.body;

    // Validating if tue user emails exists on DB
    const user = await User.findOne({ email }).select('+password');
    if (!user) return next(new RequestError('User does not exist.', 400));

    // Validating if password match with the BD
    const validPassword = await user.comparePassword(password);
    if (!validPassword) return next(new RequestError('Credentials does not match.', 400));

    // Generating session token
    const token = user.getJwtToken();

    // Save token in cookies!
    res.status(200).cookie('token', token, saveToken).json({ msg: 'login successful.', token });

  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};

export const authLogout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).cookie('token', null, deleteToken).json({msg: 'logget out.'});

  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};
