const Customer = require('./customer.model');

/**
 * Load customer and append to req.
 */
function load(req, res, next, id) {
  Customer.get(id)
    .then((customer) => {
      req.customer = customer; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get customer
 * @returns {Customer}
 */
function get(req, res) {
  return res.json(req.customer);
}

/**
 * Create new customer
 * @property {string} req.body.customername - The customername of customer.
 * @property {string} req.body.location - The location of customer.
 * @returns {Customer}
 */
function create(req, res, next) {
  const customer = new Customer({
    customername: req.body.customername,
    email: req.body.email
  });

  customer.save()
    .then(savedCustomer => res.json(savedCustomer))
    .catch(e => next(e));
}

/**
 * Update existing customer
 * @property {string} req.body.customername - The customername of customer.
 * @property {string} req.body.location - The location of customer.
 * @returns {Customer}
 */
function update(req, res, next) {
  const customer = req.customer;
  customer.customername = req.body.customername;
  customer.email = req.body.email;

  customer.save()
    .then(savedCustomer => res.json(savedCustomer))
    .catch(e => next(e));
}

/**
 * Get customer list.
 * @property {number} req.query.skip - Number of customers to be skipped.
 * @property {number} req.query.limit - Limit number of customers to be returned.
 * @returns {Customer[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  Customer.list({ limit, skip })
    .then(customers => res.json(customers))
    .catch(e => next(e));
}

/**
 * Delete customer.
 * @returns {customer}
 */
function remove(req, res, next) {
  const customer = req.customer;
  customer.remove()
    .then(deletedCustomer => res.json(deletedCustomer))
    .catch(e => next(e));
}

module.exports = { load, get, create, update, list, remove };
