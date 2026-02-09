require('dotenv').config(); // En üstte olmalı
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');

const app = express();
app.use(cors());
app.use(express.json());

// 1. .env'den gelen verilerle Veritabanı Bağlantısı
const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
  }
);

// 2. User Modeli
const User = sequelize.define('User', {
  username: { type: Sequelize.STRING, unique: true, allowNull: false },
  email: { type: Sequelize.STRING, unique: true, allowNull: false },
  password_hash: { type: Sequelize.STRING, allowNull: false },
  phone_number: { type: Sequelize.STRING, allowNull: true }
});

// 3. Senkronizasyon
sequelize.sync()
  .then(() => console.log('PostgreSQL Veritabanı ve tablolar hazır.'))
  .catch(err => console.log('DB Bağlantı hatası:', err));

// 4. SIGNUP ENDPOINT
app.post('/api/signup', async (req, res) => {
  const { username, password, email, phone } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username: username,
      email: email,
      password_hash: hashedPassword,
      phone_number: phone
    });

    res.status(201).json({ 
      success: true,
      message: "Kullanıcı başarıyla oluşturuldu!", 
      user: { id: newUser.id, username: newUser.username } 
    });
  } catch (err) {
    res.status(400).json({ success: false, error: "E-posta veya kullanıcı adı zaten mevcut." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend ${PORT} portunda çalışıyor...`));