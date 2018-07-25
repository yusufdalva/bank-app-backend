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

  describe('## Bank APIs', () => {
    let bank = {
      bankname: 'KK123',
      location: 'ankara'
    };

    describe('# POST /api/banks', () => {
      it('should create a new bank', (done) => {
        request(app)
          .post('/api/banks')
          .send(bank)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.bankname).to.equal(bank.bankname);
            expect(res.body.location).to.equal(bank.location);
            bank = res.body;
            done();
          })
          .catch(done);
      });
    });

    describe('# GET /api/banks/:bankId', () => {
      it('should get bank details', (done) => {
        request(app)
          .get(`/api/banks/${bank._id}`)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.bankname).to.equal(bank.bankname);
            expect(res.body.location).to.equal(bank.location);
            done();
          })
          .catch(done);
      });

      it('should report error with message - Not found, when bank does not exists', (done) => {
        request(app)
          .get('/api/banks/56c787ccc67fc16ccc1a5e92')
          .expect(httpStatus.NOT_FOUND)
          .then((res) => {
            expect(res.body.message).to.equal('Not Found');
            done();
          })
          .catch(done);
      });
    });

    describe('# PUT /api/banks/:bankId', () => {
      it('should update bank details', (done) => {
        bank.bankname = 'KK';
        request(app)
          .put(`/api/banks/${bank._id}`)
          .send(bank)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.bankname).to.equal('KK');
            expect(res.body.location).to.equal(bank.location);
            done();
          })
          .catch(done);
      });
    });

    describe('# GET /api/banks/', () => {
      it('should get all banks', (done) => {
        request(app)
          .get('/api/banks')
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body).to.be.an('array');
            done();
          })
          .catch(done);
      });

      it('should get all banks (with limit and skip)', (done) => {
        request(app)
          .get('/api/banks')
          .query({ limit: 10, skip: 1 })
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body).to.be.an('array');
            done();
          })
          .catch(done);
      });
    });

    describe('# DELETE /api/banks/bankId', () => {
      it('should delete bank', (done) => {
        request(app)
          .delete(`/api/banks/${bank._id}`)
          .expect(httpStatus.OK)
          .then((res) => {
            expect(res.body.bankname).to.equal('KK');
            expect(res.body.location).to.equal(bank.location);
            done();
          })
          .catch(done);
      });
    });
  });
