const Joi = require('joi');

module.exports = {
  // POST /api/banks
  createTransaction: {
    body: {
      from: Joi.string().required(),
      to: Joi.string().required(),
      amount: Joi.number().required()
    }
  },

  // UPDATE /api/banks/:bankId
  updateTransaction: {
    body: {
      from: Joi.string().required(),
      to: Joi.string().required(),
      amount: Joi.number().required()
    },
    params: {
      transactionId: Joi.string().hex().required()
    }
  },

};
