const Joi = require('joi');

module.exports = {
  // POST /api/accounts
  createAccount: {
    body: {
      balance: Joi.number().required,
      owner: Joi.string().required,
      bank: Joi.string().required
    }
  },

  // UPDATE /api/accounts/:accountId
  updateAccount: {
    body: {
      balance: Joi.number().required
    },
    params: {
      accountId: Joi.string().hex()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      userId: Joi.string(),
      password: Joi.string()
    }
  }
};
