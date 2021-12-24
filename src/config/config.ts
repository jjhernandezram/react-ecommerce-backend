import dotenv from 'dotenv';
dotenv.config();

export default {
  // App
  PORT: process.env.PORT || 8000,

  // Database
  MONGODB: {
    URI:
      process.env.MONGODB_URI ||
      'mongodb+srv://usernode:mymongodbpassword@jjhernandezram.eyzlr.mongodb.net/react-ecommerce',
  },

  // JWT
  JWT: {
    SECRET: process.env.JWT_SECRET || 'thisISaSECRETkey',
    EXPIRES: process.env.JWT_EXPIRES || '7d',
  },

  // Cookies
  COOKIES: {
    EXPIRES: process.env.COOKIES_EXPIRES || 7,
  },
};
