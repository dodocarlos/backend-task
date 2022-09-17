const request = require('supertest');
const { seedDb } = require('../seedDb');
const app = require('../../src/app/app');

describe('Jobs', () => {
  beforeEach(async () => {
    await seedDb();
  });

  describe('/jobs/unpaid', () => {
    it('should be able to return unauthorized exception if profile_id is unknown', async () => {
      await request(app).get('/jobs/unpaid').set('profile_id', 999).expect(401);
    });

    it('should be able to return unpaid jobs', async () => {
      const req = await request(app).get('/jobs/unpaid').set('profile_id', 5);

      expect(req.statusCode).toEqual(200);
      expect(req.body).toMatchObject([
        {
          id: 1,
          description: 'work',
          price: 200,
          paid: null,
          paymentDate: null,
          ContractId: 1,
          Contract: {
            id: 1,
            terms: 'bla bla bla',
            status: 'terminated',
            ContractorId: 5,
            ClientId: 1,
          },
        },
      ]);
    });
  });

  describe('/jobs/:job_id/pay', () => {
    it('should be able to return unauthorized exception if profile_id is unknown', async () => {
      await request(app).get('/jobs/1/pay').set('profile_id', 999).expect(401);
    });

    it('should be able to return unprocessable entity exception if job dont exists', async () => {
      await request(app).post('/jobs/1234/pay').set('profile_id', 1).expect(422);
    });

    it('should be able to pay a job', async () => {
      await request(app).post('/jobs/1/pay').set('profile_id', 1).expect(204);
    });
  });
});
