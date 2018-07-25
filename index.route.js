const express = require('express');

const customerRoutes = require('./server/customer/customer.route');
const bankRoutes = require('./server/bank/bank.route');
const authRoutes = require('./server/auth/auth.route');
const accountRoutes = require('./server/account/account.route');

const router = express.Router(); // eslint-disable-line new-cap

// TODO: use glob to match *.route files

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) =>
  res.send('OK')
);


// mount user routes at /users
router.use('/accounts', accountRoutes);

// mount bank routes at /banks
router.use('/banks', bankRoutes);


// mount customer routes at /customerss
router.use('/customers', customerRoutes);

// mount auth routes at /auth
router.use('/auth', authRoutes);

module.exports = router;
