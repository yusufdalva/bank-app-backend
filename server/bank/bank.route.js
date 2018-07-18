const express = require('express');
const validate = require('express-validation');
const paramValidation = require('./bank-validation');
const bankCtrl = require('./bank.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/banks - Get list of banks */
  .get(bankCtrl.list)

  /** POST /api/banks - Create new bank */
  .post(validate(paramValidation.createBank), bankCtrl.create);

router.route('/:bankId')
/** GET /api/banks/:bankId - Get bank */
  .get(bankCtrl.get)

  /** PUT /api/banks/:bankId - Update bank */
  .put(validate(paramValidation.updateBank), bankCtrl.update)

  /** DELETE /api/banks/:bankId - Delete bank */
  .delete(bankCtrl.remove);

/** Load bank when API with bankId route parameter is hit */
router.param('bankId', bankCtrl.load);

module.exports = router;
