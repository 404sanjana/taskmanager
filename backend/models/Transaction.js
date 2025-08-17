const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  type: { type: String, enum: ['income', 'expense'], required: true },
  amount: { type: Number, min: 0, required: true },
  category: { type: String, trim: true, required: true },
  date: { type: Date, default: Date.now, index: true },
  note: { type: String, trim: true }
}, { timestamps: true });

module.exports = mongoose.model('Transaction', transactionSchema);
