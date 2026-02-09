const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { Sequelize } = require('sequelize');

const app = express();
app.use(cors());
app.use(express.json());

// 1. Database Connection
const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false, // Clean console
});

// 2. Test Connection
const startServer = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ PostgreSQL Connection established successfully.');
    
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
  }
};

// 3. Basic Health Check Route
app.get('/api/status', (req, res) => {
  res.json({ message: "liveYoung API is active" });
});

startServer();