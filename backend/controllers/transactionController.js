const Transaction = require('../models/Transaction');

// POST /api/transactions
exports.addTransaction = async (req, res) => {
  try {
    const { type, amount, category, note, date } = req.body;
    const tx = await Transaction.create({
      userId: req.user.id,
      type,
      amount,
      category,
      note,
      date: date ? new Date(date) : new Date()
    });
    res.status(201).json(tx);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// GET /api/transactions?month=2025-08&type=expense&category=Groceries
exports.getTransactions = async (req, res) => {
  try {
    const { month, type, category } = req.query;
    const q = { userId: req.user.id };

    if (type) q.type = type;
    if (category) q.category = category;

    if (month) {
      // month is 'YYYY-MM'
      const [y, m] = month.split('-').map(Number);
      const start = new Date(Date.UTC(y, m - 1, 1, 0, 0, 0));
      const end = new Date(Date.UTC(y, m, 1, 0, 0, 0));
      q.date = { $gte: start, $lt: end };
    }

    const items = await Transaction.find(q).sort({ date: -1, createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// PATCH /api/transactions/:id
exports.updateTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const tx = await Transaction.findOne({ _id: id, userId: req.user.id });
    if (!tx) return res.status(404).json({ message: 'Transaction not found' });

    const { type, amount, category, note, date } = req.body;
    if (type !== undefined) tx.type = type;
    if (amount !== undefined) tx.amount = amount;
    if (category !== undefined) tx.category = category;
    if (note !== undefined) tx.note = note;
    if (date !== undefined) tx.date = new Date(date);

    await tx.save();
    res.json(tx);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE /api/transactions/:id
exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const tx = await Transaction.findOneAndDelete({ _id: id, userId: req.user.id });
    if (!tx) return res.status(404).json({ message: 'Transaction not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
