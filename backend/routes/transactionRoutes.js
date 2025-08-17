const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/transactionController');

router.use(auth); // all below require auth

router.post('/', ctrl.addTransaction);
router.get('/', ctrl.getTransactions);
router.patch('/:id', ctrl.updateTransaction);
router.delete('/:id', ctrl.deleteTransaction);

module.exports = router;
