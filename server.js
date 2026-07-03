import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('QuickBite Backend is Running 🚀');
});

app.post('/send-whatsapp', async (req, res) => {
  const { message } = req.body;

  try {
    const response = await axios.post(
      `https://api.ultramsg.com/${process.env.ULTRAMSG_INSTANCE_ID}/messages/chat`,
      {
        token: process.env.ULTRAMSG_TOKEN,
        to: process.env.MY_WHATSAPP,
        body: message,
      }
    );

    console.log('WhatsApp sent:', response.data);

    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error) {
    console.error(
      'UltraMsg Error:',
      error.response?.data || error.message
    );

    res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});