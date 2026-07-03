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

app.post("/send-whatsapp", async (req, res) => {
  const { customerName, phone, address, items, total } = req.body;

  const orderItems = items
    .map(
      (item) =>
        `• ${item.name} x${item.quantity} - ₹${item.price * item.quantity}`
    )
    .join("\n");

  const message = `🍔 *New QuickBite Order*

👤 *Customer:* ${customerName}
📞 *Phone:* ${phone}

🍽️ *Order Items:*
${orderItems}

💰 *Total:* ₹${total}

📍 *Address:*
${address}

🕒 ${new Date().toLocaleString("en-IN")}`;

  try {
    const response = await axios.post(
      `https://api.ultramsg.com/${process.env.ULTRAMSG_INSTANCE_ID}/messages/chat`,
      {
        token: process.env.ULTRAMSG_TOKEN,
        to: process.env.MY_WHATSAPP,
        body: message,
      }
    );

    res.json({
      success: true,
      data: response.data,
    });
  } catch (error) {
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