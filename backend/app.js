import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import connectDatabase from './config/connection.js';
import userRoutes from './api/routes/users.js';
import dateFormat from './utils/helper/dateFormat.js';
import './utils/nfcReader/nfcHandler.js'; // This ensures the NFC handler is initialized

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use('/api/users', userRoutes);

app.get('/', (req, res) => {
  res.send('NFC Rewards System API');
});

const startServer = async () => {
    try {
      await connectDatabase();
      app.listen(PORT, () => {
        console.log(
          `${dateFormat()} API server running on port ${PORT}`
        );
      });
    } catch (error) {
      console.error(
        `${dateFormat()} Failed to connect to the server`,
        error
      );
      process.exit(1);
    }
  };
  
  startServer();