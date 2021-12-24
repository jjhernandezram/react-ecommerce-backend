import mongoose from 'mongoose';
import config from './config';

mongoose.connect(config.MONGODB.URI);

const database = mongoose.connection;

database.once('open', () => {
  console.log('Connection to MongoDB established.');
});

database.on('error', (err) => {
  console.log(err.message);
  process.exit(0);
});
