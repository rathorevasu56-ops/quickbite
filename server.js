import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

// Test endpoint
app.post('/send-whatsapp', (req, res) => {
  const { message } = req.body;

  console.log("Message received:");
  console.log(message);

  res.status(200).json({
    success: true,
    message: "Message received successfully",
    data: message
  });
});

// Optional home route
app.get('/', (req, res) => {
  res.send('QuickBite Backend is running 🚀');
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});