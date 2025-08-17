const mongoose = require('mongoose');

// One document per user/category/month.
const budgetSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    month: { type: String, required: true }, // format: '2025-08'
    category: { type: String, required: true }, // e.g., Groceries, Rent, etc. Use 'ALL' for overall budget if you want
    amount: { type: Number, min: 0, required: true },
  },
  { timestamps: true }
);

budgetSchema.index({ userId: 1, month: 1, category: 1 }, { unique: true });

module.exports = mongoose.model('Budget', budgetSchema);

