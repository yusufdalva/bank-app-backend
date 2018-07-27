const mongoose = require('mongoose');
const request = require('supertest-as-promised');
const httpStatus = require('http-status');
const chai = require('chai'); // eslint-disable-line import/newline-after-import
const expect = chai.expect;
const app = require('../../index');

chai.config.includeStack = true;


/**
 * root level hooks
 */
after((done) => {
  // required because https://github.com/Automattic/mongoose/issues/1251#issuecomment-65793092
  mongoose.models = {};
  mongoose.modelSchemas = {};
  mongoose.connection.close();
  done();
});

describe('## Customer APIs', () => {
  let customer = {
    customername: 'KK123',
    email: 'yruyeury@ıeurıeu.dıuı'
  };

  describe('# POST /api/customers', () => {
    it('should create a new customer', (done) => {
      request(app)
        .post('/api/customers')
        .send(customer)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.customername).to.equal(customer.customername);
          expect(res.body.email).to.equal(customer.email);
          customer = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/customers/:customerId', () => {
    it('should get customer details', (done) => {
      request(app)
        .get(`/api/customers/${customer._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.customername).to.equal(customer.customername);
          expect(res.body.email).to.equal(customer.email);
          done();
        })
        .catch(done);
    });

    it('should report error with message - Not found, when customer does not exists', (done) => {
      request(app)
        .get('/api/customers/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
        .catch(done);
    });
  });

  describe('# PUT /api/customers/:customerId', () => {
    it('should update customer details', (done) => {
      customer.customername = 'KK';
      request(app)
        .put(`/api/customers/${customer._id}`)
        .send(customer)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.customername).to.equal('KK');
          expect(res.body.email).to.equal(customer.email);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/customers/', () => {
    it('should get all customers', (done) => {
      request(app)
        .get('/api/customers')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });

    it('should get all customers (with limit and skip)', (done) => {
      request(app)
        .get('/api/customers')
        .query({ limit: 10, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/customers/', () => {
    it('should delete customer', (done) => {
      request(app)
        .delete(`/api/customers/${customer._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.customername).to.equal('KK');
          expect(res.body.email).to.equal(customer.email);
          done();
        })
        .catch(done);
    });
  });
});
