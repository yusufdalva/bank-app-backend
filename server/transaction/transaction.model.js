const Promise = require('bluebird');

const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Transaction Schema
 */
const TransactionSchema = new mongoose.Schema({
  from: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  to: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
TransactionSchema.method({
});

/**
 * Statics
 */
TransactionSchema.statics = {
  /**
   * Get bank
   * @param {ObjectId} id - The objectId of bank.
   * @returns {Promise<Transaction, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((bank) => {
        if (bank) {
          return bank;
        }
        const err = new APIError('No such bank exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },


  /**
   * List banks in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of banks to be skipped.
   * @param {number} limit - Limit number of banks to be returned.
   * @returns {Promise<Transaction[]>}
   */
  list({ skip = 0, limit = 50 } = {}) {
    return this.find()
      .sort({ createdAt: -1 })
      .skip(+skip)
      .limit(+limit)
      .exec();
  }
};

/**
 * @typedef Transaction
 */
module.exports = mongoose.model('Transaction', TransactionSchema);

