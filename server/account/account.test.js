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

describe('## Account APIs', () => {
  let account = {
    owner: '5b5835b5f7886e981ce37f35',
    bank: '5b5835b5f7886e981ce37f36',
    balance: 7627362
  };

  describe('# POST /api/accounts', () => {
    // CHECKED
    it('should create a new account', (done) => {
      request(app)
        .post('/api/accounts')
        .send(account)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.bank).to.equal(account.bank);
          expect(res.body.owner).to.equal(account.owner);
          account = res.body;
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/accounts/:accountId', () => {
    // CHECKED
    it('should get account details', (done) => {
      request(app)
       .get(`/api/accounts/${account._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.bank).to.equal(account.bank);
          expect(res.body.owner).to.equal(account.owner);
          expect(res.body.balance).to.equal(account.balance);
          account = res.body;
          done();
        })
      .catch(done);
    });
    // CHECKED
    it('should report with error message - "Not found" when account not found', (done) => {
      request(app)
        .get('/api/accounts/56c787ccc67fc16ccc1a5e92')
        .expect(httpStatus.NOT_FOUND)
        .then((res) => {
          expect(res.body.message).to.equal('Not Found');
          done();
        })
      .catch(done);
    });
  });

  describe('# PUT /api/customers/:accountId', () => {
    // CHECKED
    it('should update account information', (done) => {
      account.balance = 487238723;
      request(app)
        .put(`/api/accounts/${account._id}`)
        .send(account)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.owner).to.equal(account.owner);
          expect(res.body.bank).to.equal(account.bank);
          expect(res.body.balance).to.equal(account.balance);
          done();
        })
        .catch(done);
    });
  });

  describe('# GET /api/accounts', () => {
    // CHECKED
    it('should get all the accounts', (done) => {
      request(app)
        .get('/api/accounts')
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
    // CHECKED
    it('should get all the banks with limit and skip', (done) => {
      request(app)
        .get('/api/accounts')
        .query({ limit: 5, skip: 1 })
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body).to.be.an('array');
          done();
        })
        .catch(done);
    });
  });

  describe('# DELETE /api/accounts/:accountId', () => {
    // CHECKED
    it('should delete the associated account', (done) => {
      request(app)
        .delete(`/api/accounts/${account._id}`)
        .expect(httpStatus.OK)
        .then((res) => {
          expect(res.body.owner).to.equal(account.owner);
          expect(res.body.bank).to.equal(account.bank);
          expect(res.body.balance).to.equal(account.balance);
          done();
        })
        .catch(done);
    });
  });
});
