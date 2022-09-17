const request = require('supertest');
const { seedDb } = require('../seedDb');
const app = require('../../src/app/app');

describe('Balances', () => {
  beforeEach(async () => {
    await seedDb();
  });

  describe('/balances/deposit/:userId', () => {
    it('should be able to return bad request exception', async () => {
      await request(app).post('/balances/deposit/1').expect(400);
    });

    it('should be able to return unprocessable entity exception', async () => {
      await request(app).post('/balances/deposit/1').send({ amount: 100 }).expect(422);
    });

    it('should be able to process a deposit request', async () => {
      await request(app).post('/balances/deposit/1').send({ amount: 50 }).expect(204);
    });
  });
});
