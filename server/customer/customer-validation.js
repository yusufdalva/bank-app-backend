const Joi = require('joi');

module.exports = {
  // POST /api/customers
  createCustomer: {
    body: {
      customername: Joi.string().required(),
      email: Joi.string().required()
    }
  },

  // UPDATE /api/customers/:customerId
  updateCustomer: {
    body: {
      customername: Joi.string().required(),
      email: Joi.string().required()
    },
    params: {
      customerId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      customername: Joi.string().required(),
      password: Joi.string().required()
    }
  }
};
