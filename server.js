const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const settingsRoutes = require('./routes/settings');

const app = express();
app.use(cors());
app.use(express.json());

// Routes
const predictionsRoutes = require('./routes/predictions');
app.use('/api/predictions', predictionsRoutes);
const authRoutes = require('./routes/auth');
app.use('/api/auth', authRoutes);
app.use('/api/settings', settingsRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err));
