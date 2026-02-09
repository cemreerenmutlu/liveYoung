const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Sequelize bağlantı dosyan

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: { isEmail: true }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true // Opsiyonel (Optional)
  }
});

module.exports = User;