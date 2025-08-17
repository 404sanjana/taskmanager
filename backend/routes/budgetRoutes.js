const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/budgetController');

router.use(auth);

router.post('/', ctrl.setBudget);      // upsert
router.get('/', ctrl.getBudgets);
router.delete('/:id', ctrl.deleteBudget);

module.exports = router;
