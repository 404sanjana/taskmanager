const Budget = require('../models/Budget');

// UPSERT budget for a category in a month
// POST /api/budgets  { month:'2025-08', category:'Groceries', amount:300 }
exports.setBudget = async (req, res) => {
  try {
    const { month, category, amount } = req.body;
    const doc = await Budget.findOneAndUpdate(
      { userId: req.user.id, month, category },
      { $set: { amount } },
      { upsert: true, new: true, setDefaultsOnInsert: true }
    );
    res.status(201).json(doc);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/budgets?month=2025-08
exports.getBudgets = async (req, res) => {
  try {
    const { month } = req.query;
    const q = { userId: req.user.id };
    if (month) q.month = month;
    const items = await Budget.find(q).sort({ category: 1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/budgets/:id
exports.deleteBudget = async (req, res) => {
  try {
    const { id } = req.params;
    const doc = await Budget.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!doc) return res.status(404).json({ message: 'Budget not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
