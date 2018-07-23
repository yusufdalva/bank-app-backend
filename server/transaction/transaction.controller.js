const Transaction = require('./transaction.model');
const Account = require('../account/account.model');
/**
 * Load transaction and append to req.
 */
function load(req, res, next, id) {
  Transaction.get(id)
    .then((transaction) => {
      req.transaction = transaction; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get transaction
 * @returns {Transaction}
 */
function get(req, res) {
  return res.json(req.transaction);
}

/**
 * Create new transaction
 * @property {string} req.body.owner - The owner of transaction.
 * @property {Number} req.body.balance - The balance of transaction.
 * @returns {Transaction}
 */
function create(req, res, next) {
  let toId;
  Account.findOne({ _id: req.body.to })
    .then((to) => {
      toId = to._id;
    });
  Account.findOne({ _id: req.body.from })
    .then((from) => {
      if (from.balance < req.body.amount) res.send("Sender's account balance is too low for this transaction");
      else {
        const transaction = new Transaction({
          to: toId,
          from: from._id,
          amount: req.body.amount
        });

        transaction.save((err) => {
          if (err) res.send(err);
        });
      }
    });
  next();
}
/**
 * Update existing transaction
 * @property {string} req.body.owner - The owner of transaction.
 * @property {Number} req.body.balance - The balance of transaction.
 * @returns {Transaction}
 */

// you can update transaction balance
function update(req, res, next) {
  const transaction = req.transaction;
  transaction.amount = req.body.amount;

  transaction.save()
    .then(savedTransaction => res.json(savedTransaction))
    .catch(e => next(e));
}

/**
 * Get transaction list.
 * @property {number} req.query.skip - Number of transactions to be skipped.
 * @property {number} req.query.limit - Limit number of transactions to be returned.
 * @returns {Transaction[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Transaction.list({ limit, skip })
    .then(transactions => res.json(transactions))
    .catch(e => next(e));
}

/**
 * Delete transaction.
 * @returns {transaction}
 */
function remove(req, res, next) {
  const transaction = req.transaction;
  transaction.remove()
    .then(deletedTransaction => res.json(deletedTransaction))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
