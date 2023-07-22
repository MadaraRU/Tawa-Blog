import experss from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();

const app = experss();
const port = process.env.PORT || 5000;

connectDB();

app.use('/', (req, res) => {
  res.json('hello world');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
