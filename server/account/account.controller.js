const Account = require('./account.model');
const Customer = require('../customer/customer.model');
const Bank = require('../bank/bank.model');
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
 * @property {string} req.body.owner - The owner of account.
 * @property {Number} req.body.balance - The balance of account.
 * @returns {Account}
 */
function create(req, res, next) {
  let bankId;
  Bank.findOne({ name: req.body.bank })
    .then((bank) => {
      bankId = bank._id;
      });
  Customer.findOne({ customername: req.body.name })
    .then ((customer) =>  {
      const account = new Account({
        owner: customer._id,
        bank: bankId,
        balance: req.body.balance
      });

      account.save(function (err) {
        if (err) console.log(err);
      });
    });
}
/**
 * Update existing account
 * @property {string} req.body.owner - The owner of account.
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
 * @property {number} req.query.skip - Number of accounts to be skipped.
 * @property {number} req.query.limit - Limit number of accounts to be returned.
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
 * @returns {account}
 */
function remove(req, res, next) {
  const account = req.account;
  account.remove()
    .then(deletedAccount => res.json(deletedAccount))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
