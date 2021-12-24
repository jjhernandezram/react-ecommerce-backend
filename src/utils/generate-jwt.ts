import jwt from 'jsonwebtoken';
import config from '../config/config';

export const generateJwt = (uid: string) => jwt.sign({ uid }, config.JWT.SECRET, { expiresIn: config.JWT.EXPIRES });
