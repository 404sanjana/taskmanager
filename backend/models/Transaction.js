const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    amount: { type: Number, min: 0, required: true },
    category: { type: String, required: true }, // e.g., Salary, Rent, Groceries, etc.
    note: { type: String },
    date: { type: Date, required: true },       // when it happened
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);
