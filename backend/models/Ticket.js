const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  screening: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Screening',
    required: true
  },
  seats: [{
    row: Number,
    seat: Number,
    type: {
      type: String,
      enum: ['standard', 'vip'],
      default: 'standard'
    }
  }],
  totalPrice: {
    type: Number,
    required: true
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'cancelled'],
    default: 'pending'
  },
  paymentId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Ticket', TicketSchema); 