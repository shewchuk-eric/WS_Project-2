const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/customers', require('./customers'));
router.use('/orders', require('./orders'));

module.exports = router;