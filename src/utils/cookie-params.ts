import config from '../config/config';

export const options = {
  expires: new Date(Date.now() + Number(config.COOKIES.EXPIRES) * 24 * 60 * 60 * 1000),
  httpOnly: true,
};
