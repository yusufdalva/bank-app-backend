const Promise = require('bluebird');
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../helpers/APIError');

/**
 * Customer Schema
 */
const CustomerSchema = new mongoose.Schema({
  customername: {
    type: String,
    required: true
  },
  accounts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  }],
  email: {
    type: String,
    required: true,
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
CustomerSchema.method({
});

/**
 * Statics
 */
CustomerSchema.statics = {
  /**
   * Get customer
   * @param {ObjectId} id - The objectId of customer.
   * @returns {Promise<Customer, APIError>}
   */
  get(id) {
    return this.findById(id)
      .exec()
      .then((customer) => {
        if (customer) {
          return customer;
        }
        const err = new APIError('No such customer exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  },

  /**
   * List customers in descending order of 'createdAt' timestamp.
   * @param {number} skip - Number of customers to be skipped.
   * @param {number} limit - Limit number of customers to be returned.
   * @returns {Promise<Customer[]>}
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
 * @typedef Customer
 */
module.exports = mongoose.model('Customer', CustomerSchema);
