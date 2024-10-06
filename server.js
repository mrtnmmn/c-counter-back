const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const mongoURI = process.env.MONGO_URI

const authRoutes = require('./routes/auth');
const caloriesEntriesRoutes = require('./routes/caloriesEntries')
const userRoutes = require('./routes/user')

mongoose.connect(mongoURI)
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log('Error connecting to MongoDB:', err));

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.send('OK');
});

app.use('/api/auth', authRoutes);
app.use('/api/calories-entries', caloriesEntriesRoutes)
app.use('/api/user', userRoutes)

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
