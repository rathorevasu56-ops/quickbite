import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import twilio from 'twilio';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = twilio(accountSid, authToken);

app.post('/send-whatsapp', async (req, res) => {
  const { message } = req.body;

  try {
    await client.messages.create({
      body: message,
      from: process.env.TWILIO_WHATSAPP_FROM,
      to: process.env.TWILIO_WHATSAPP_TO,
    });

    console.log('WhatsApp sent!');
    res.json({ success: true });
  } catch (err) {
    console.error('WhatsApp error:', err.message);
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});