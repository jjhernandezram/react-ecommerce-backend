import jwt from 'jsonwebtoken';
import config from '../config/config';

interface MyToken {
  id: string;
  iat: number;
  exp: number;
}

export const verifyJwt = (token: string): string => {
  const { id } = jwt.verify(token, config.JWT.SECRET) as MyToken;

  return id;
};
