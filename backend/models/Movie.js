const mongoose = require('mongoose');

const MovieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  duration: {
    type: Number, // в минутах
    required: true
  },
  genre: {
    type: [String],
    required: true
  },
  releaseDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  poster: {
    type: String
  },
  trailer: {
    type: String
  },
  rating: {
    type: Number,
    default: 0
  },
  director: {
    type: String
  },
  actors: {
    type: [String]
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Movie', MovieSchema); 