import express from 'express';
import cors from 'cors';
import { createClient } from '@supabase/supabase-js';

const app = express();
app.use(cors());
app.use(express.json());

// Supabase setup
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Chat endpoint
app.post('/chat', async (req, res) => {
  const { user_id, text } = req.body;

  // Save message to Supabase
  const { error } = await supabase
    .from('messages')
    .insert([{ user_id, text }]);

  if (error) return res.status(500).json({ error });

  // Dummy AI response
  const reply = `You said: "${text}". Here's a smart reply!`;

  res.json({ reply });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));