import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

// Cofig
import config from './config/config';

// Database connection
import './config/database';

// Routes
import productRoutes from './routes/products.route';
import categoryRoutes from './routes/categories.route';
import searchRoutes from './routes/search.route';
import usersRoutes from './routes/users.route';
import authRoutes from './routes/auth.route';

import { errorHandler } from './middlewares/error-handler';

// Server initialization
const app = express();

// Midlewares
app.use(cors());
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/', productRoutes);
app.use('/', categoryRoutes);
app.use('/', searchRoutes);
app.use('/', usersRoutes);
app.use('/', authRoutes);

// Custom error handler middle
app.use(errorHandler);

// Mounting the server
app.listen(config.PORT, () => {
  console.log('Server listening on port', config.PORT);
});
