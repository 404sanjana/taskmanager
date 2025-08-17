const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const ctrl = require('../controllers/reportController');

router.use(auth);

router.get('/monthly', ctrl.monthlySummary);

module.exports = router;
