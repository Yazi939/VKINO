const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Загрузка переменных окружения
dotenv.config();

// Инициализация приложения
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Подключение к базе данных
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/vkino')
  .then(() => console.log('Подключение к MongoDB успешно'))
  .catch(err => console.error('Ошибка подключения к MongoDB:', err));

// Маршруты
app.use('/api/auth', require('./routes/auth'));
app.use('/api/movies', require('./routes/movies'));
app.use('/api/cinemas', require('./routes/cinemas'));
app.use('/api/screenings', require('./routes/screenings'));
app.use('/api/tickets', require('./routes/tickets'));

// Базовый маршрут
app.get('/', (req, res) => {
  res.send('API для VKino работает');
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`)); 