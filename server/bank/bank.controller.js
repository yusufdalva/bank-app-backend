const Bank = require('./bank.model');

/**
 * Load bank and append to req.
 */
function load(req, res, next, id) {
  Bank.get(id)
    .then((bank) => {
      req.bank = bank; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get bank
 * @returns {Bank}
 */
function get(req, res) {
  return res.json(req.bank);
}

/**
 * Create new bank
 * @property {string} req.body.bankname - The bankname of bank.
 * @property {string} req.body.location - The location of bank.
 * @returns {Bank}
 */
function create(req, res, next) {
  const bank = new Bank({
    bankname: req.body.bankname,
    location: req.body.location
  });

  bank.save()
    .then(savedBank => res.json(savedBank))
    .catch(e => next(e));
}

/**
 * Update existing bank
 * @property {string} req.body.bankname - The bankname of bank.
 * @property {string} req.body.location - The location of bank.
 * @returns {Bank}
 */
function update(req, res, next) {
  const bank = req.bank;
  bank.bankname = req.body.bankname;
  bank.location = req.body.location;

  bank.save()
    .then(savedBank => res.json(savedBank))
    .catch(e => next(e));
}

/**
 * Get bank list.
 * @property {number} req.query.skip - Number of banks to be skipped.
 * @property {number} req.query.limit - Limit number of banks to be returned.
 * @returns {Bank[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Bank.list({ limit, skip })
    .then(banks => res.json(banks))
    .catch(e => next(e));
}

/**
 * Delete bank.
 * @returns {bank}
 */
function remove(req, res, next) {
  const bank = req.bank;
  bank.remove()
    .then(deletedBank => res.json(deletedBank))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
