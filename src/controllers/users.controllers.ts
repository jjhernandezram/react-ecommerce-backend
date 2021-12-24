import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import { RequestError, UnhandledError } from '../errors/error-handlers';
import { generateJwt } from '../utils/generate-jwt';

export const newUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    const emailExist = await User.findOne({ email: RegExp(email, 'i') });

    if (emailExist) return next(new RequestError('Email already registered.', 400));
    const newUser = await new User(req.body).save();
    const token = generateJwt(newUser.id);

    res.status(201).json({ msg: 'User created successfully!.', user: newUser, token });
  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};

export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { id } = req.params;
    // const user = await User.findOne({ id });
    // if (user) return next(new RequestError('Email already registered.', 400));

  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  try {
  } catch (err) {
    console.log(err);
    next(new UnhandledError());
  }
};