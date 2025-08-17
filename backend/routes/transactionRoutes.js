const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); // if you have auth; otherwise remove

const {
  createTransaction,
  getTransactions,
  getTransaction,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transactionController');

// Each controller is used on a specific HTTP verb/path — NOT with router.use
router.get('/', auth, getTransactions);         // GET /api/transactions
router.get('/:id', auth, getTransaction);       // GET /api/transactions/:id
router.post('/', auth, createTransaction);      // POST /api/transactions
router.put('/:id', auth, updateTransaction);    // PUT /api/transactions/:id
router.delete('/:id', auth, deleteTransaction); // DELETE /api/transactions/:id

module.exports = router;