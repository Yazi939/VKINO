const mongoose = require('mongoose');

const CinemaSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  halls: [{
    name: String,
    capacity: Number,
    seatsLayout: [[Number]] // 0 - нет места, 1 - обычное место, 2 - VIP место
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Cinema', CinemaSchema); 