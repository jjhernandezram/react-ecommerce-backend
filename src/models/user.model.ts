import { Document, model, Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import config from '../config/config';

import { NextFunction } from 'express';

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    maxLength: 30,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
    minLength: 6,
    select: false,
  },

  avatar: {
    public_id: {
      type: String,
      default: 'avatars/yufpv0jhdcjp5sv4qwgq.png',
    },
    url: {
      type: String,
      default:
        'https://res.cloudinary.com/dn6unzxco/image/upload/v1640281923/react-ecommerce/avatars/yufpv0jhdcjp5sv4qwgq.png',
    },
  },

  role: {
    type: String,
    default: 'USER_ROLE',
  },

  status: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: string;
  role: string;
  status: boolean;
  createdAt: Date;
  resetPasswordToken: string;
  resetPasswordExpire: Date;
  getJwtToken(): string;
  comparePassword(password: string): boolean;
}

userSchema.pre<IUser>('save', async function (next: NextFunction) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

userSchema.methods.getJwtToken = function () {
  return jwt.sign({ id: this.id }, config.JWT.SECRET, { expiresIn: config.JWT.EXPIRES });
};

userSchema.methods.comparePassword = function (password: string) {
  return bcrypt.compare(password, this.password);
};

export default model<IUser>('User', userSchema);
