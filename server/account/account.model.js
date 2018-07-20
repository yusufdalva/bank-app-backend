const Promise = require('bluebird');

const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Account Schema
 */
const AccountSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Customer',
    required: true
  },
  bank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Bank',
    required: true
  },
  balance: {
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
AccountSchema.method({
});

/**
 * Statics
 */
AccountSchema.statics = {
  /**
   * Get bank
   * @param {ObjectId} id - The objectId of bank.
   * @returns {Promise<Account, APIError>}
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
   * @returns {Promise<Account[]>}
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
 * @typedef Account
 */
module.exports = mongoose.model('Account', AccountSchema);

