const express = require('express');
const validate = require('express-validation');
const paramValidation = require('./transaction-validation');
const transactionCtrl = require('./transaction.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/transactions - Get list of transactions */
  .get(transactionCtrl.list)

  /** POST /api/transactions - Create new transaction */
  .post(validate(paramValidation.createTransaction), transactionCtrl.create);

router.route('/:transactionId')
/** GET /api/transactions/:transactionId - Get transaction */
  .get(transactionCtrl.get)

  /** PUT /api/transactions/:transactionId - Update transaction */
  .put(validate(paramValidation.updateTransaction), transactionCtrl.update)

  /** DELETE /api/transactions/:transactionId - Delete transaction */
  .delete(transactionCtrl.remove);

/** Load transaction when API with transactionId route parameter is hit */
router.param('transactionId', transactionCtrl.load);

module.exports = router;
