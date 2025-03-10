const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Регистрация пользователя
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    
    // Проверка существования пользователя
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'Пользователь уже существует' });
    }
    
    // Создание нового пользователя
    user = new User({
      name,
      email,
      password,
      role: role || 'user'
    });
    
    await user.save();
    
    // Создание токена
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );
    
    res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

// Вход пользователя
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Проверка существования пользователя
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Неверные учетные данные' });
    }
    
    // Проверка пароля
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Неверные учетные данные' });
    }
    
    // Создание токена
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});

module.exports = router; 