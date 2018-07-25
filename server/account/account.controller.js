const Account = require('./account.model');
/**
 * Load account and append to req.
 */
function load(req, res, next, id) {
  Account.get(id)
    .then((account) => {
      req.account = account; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get account
 * @returns {Account}
 */
function get(req, res) {
  return res.json(req.account);
}

/**
 * Create new account
 * @property {string} req.body.bank - ID of the bank which the account will belong
 * @property {string} req.body.owner - ID of the customer which the account will belong
 * @property {Number} req.body.balance - The balance of the created account will have
 * @returns {Account}
 */
function create(req, res, next) {
  const account = new Account({
    owner: req.body.owner,
    bank: req.body.bank,
    balance: req.body.balance
  });
  account.save()
    .then(savedAccount => res.json(savedAccount))
    .catch(e => next(e));
}
/**
 * Update existing account
 * @property {Number} req.body.balance - The balance of account.
 * @returns {Account}
 */

// you can update account balance
function update(req, res, next) {
  const account = req.account;
  account.balance = req.body.balance;

  account.save()
    .then(savedAccount => res.json(savedAccount))
    .catch(e => next(e));
}

/**
 * Get account list.
 * @property {Number} req.query.skip - Number of accounts to be skipped.
 * @property {Number} req.query.limit - Limit number of accounts to be returned.
 * @returns {Account[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Account.list({ limit, skip })
    .then(accounts => res.json(accounts))
    .catch(e => next(e));
}

/**
 * Delete account.
 * @property {Account} req.account - The account that is going to be deleted
 * @returns {Account}
 */
function remove(req, res, next) {
  const account = req.account;
  account.remove()
    .then(deletedAccount => res.json(deletedAccount))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
