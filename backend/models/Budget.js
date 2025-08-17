const mongoose = require('mongoose');

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', index: true, required: true },
  month: { type: Number, min: 1, max: 12, required: true },
  year: { type: Number, min: 2000, required: true },
  category: { type: String, default: '__total__' }, // per-category budgets optional
  limit: { type: Number, min: 0, required: true }
}, { timestamps: true });

budgetSchema.index({ userId: 1, month: 1, year: 1, category: 1 }, { unique: true });
module.exports = mongoose.model('Budget', budgetSchema);
