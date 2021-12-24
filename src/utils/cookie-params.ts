import config from '../config/config';

export const saveToken = {
  expires: new Date(Date.now() + Number(config.COOKIES.EXPIRES) * 24 * 60 * 60 * 1000),
  httpOnly: true,
};

export const deleteToken = {
  expires: new Date(Date.now()),
  httpOnly: true,
};
