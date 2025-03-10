const mongoose = require('mongoose');

const ScreeningSchema = new mongoose.Schema({
  movie: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Movie',
    required: true
  },
  cinema: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cinema',
    required: true
  },
  hall: {
    type: String,
    required: true
  },
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date,
    required: true
  },
  price: {
    standard: {
      type: Number,
      required: true
    },
    vip: {
      type: Number,
      default: 0
    }
  },
  availableSeats: {
    type: [[Number]], // 0 - занято, 1 - свободно (обычное), 2 - свободно (VIP)
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Screening', ScreeningSchema); 