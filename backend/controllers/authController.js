const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.signup = async (req, res) => {
  try {
    const { username, email, password, phone_number } = req.body;

    // Şifreyi güvenli hale getir
    const hashedPassword = await bcrypt.hash(password, 10);

    // Veritabanına kaydet
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      phone_number
    });

    res.status(201).json({ message: "Kayıt başarılı!", user: newUser.username });
  } catch (error) {
    res.status(400).json({ error: "Kayıt oluşturulamadı. Verileri kontrol edin." });
  }
};