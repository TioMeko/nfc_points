import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import nfc from 'nfc-pcsc';
import connectDatabase from './config/connection';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('NFC Rewards System API');
});

const startServer = async () => {
    try {
      await connectDatabase();
      app.listen(PORT, () => {
        console.log(
          `${dateFormat} API server running on port ${PORT}`
        );
      });
    } catch (error) {
      console.error(
        `${dateFormat} Failed to connect to the server`,
        error
      );
      process.exit(1);
    }
  };
  
  startServer();