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
 * @param {string} bankId - The I.D. of the bank that is going to be validated from the database
 * @returns {Promise<any>}
 */
function findBank(bankId) {
  return new Promise((resolve, reject) => {
    Bank.findOne({ _id: bankId })
      .then(result => resolve(result[0]._id))
      .catch(() => reject(new Error('Bank not found!')));
  });
}

/**
 * @param {string} customerId - The ID of the bank that is going to be validated from the database
 * @returns {Promise<any>}
 */
function findCustomer(customerId) {
  return new Promise((resolve, reject) => {
    Customer.findOne({ _id: customerId })
      .then(result => resolve(result[0]._id))
      .catch(() => reject(-1));
  });
}
/**
 * Create new account
 * @property {string} req.body.bankId - ID of the bank which the account will belong
 * @property {string} req.body.customerId - ID of the customer which the account will belong
 * @property {Number} req.body.balance - The balance of the created account will have
 * @returns {Account}
 */
function create(req, res, next) {
  let bankId;
  let customerId;
  findBank(req.body.bankId)
    .then((bank) => {
      bankId = bank;
      findCustomer(res.body.customerId)
        .then((customer) => {
          customerId = customer;
        });
    })
    .then(() => {
      const account = new Account({
        owner: customerId,
        bank: bankId,
        balance: req.body.balance
      });
      account.save((err) => {
        if (err) res.send(err);
      });
    });
  next();
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
