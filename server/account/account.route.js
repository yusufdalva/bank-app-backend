const express = require('express');
const validate = require('express-validation');

const paramValidation = require('./account-validation');
const accountCtrl = require('./account.controller');

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
/** GET /api/accounts - Get list of accounts */
  .get(accountCtrl.list)

  /** POST /api/accounts - Create new account */
  .post(accountCtrl.create);

router.route('/:accountId')
/** GET /api/accounts/:accountId - Get account */
  .get(accountCtrl.get)

  /** PUT /api/accounts/:accountId - Update account */
  .put(accountCtrl.update)

  /** DELETE /api/accounts/:accountId - Delete account */
  .delete(accountCtrl.remove);

/** Load account when API with accountId route parameter is hit */
router.param('accountId', accountCtrl.load);

module.exports = router;
