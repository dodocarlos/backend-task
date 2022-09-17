const request = require('supertest');
const { seedDb } = require('../seedDb');
const app = require('../../src/app/app');

describe('Contracts', () => {
  beforeEach(async () => {
    await seedDb();
  });

  describe('/contracts/:id', () => {
    it('should be able to return unauthorized exception if profile_id is unknown', async () => {
      await request(app).get('/contracts/999').set('profile_id', 999).expect(401);
    });

    it('should be able to return not found exception', async () => {
      await request(app).get('/contracts/999').set('profile_id', 7).expect(404);
    });

    it('should be able to return a contract by id', async () => {
      const req = await request(app).get('/contracts/7').set('profile_id', 7);

      expect(req.statusCode).toEqual(200);
      expect(req.body).toMatchObject({
        id: 7,
        terms: 'bla bla bla',
        status: 'in_progress',
        ContractorId: 7,
        ClientId: 4,
      });
    });
  });

  describe('/contracts', () => {
    it('should be able to return non terminated contracts', async () => {
      const req = await request(app).get('/contracts').set('profile_id', 7);

      expect(req.statusCode).toEqual(200);
      expect(req.body).toMatchObject([
        {
          id: 4,
          terms: 'bla bla bla',
          status: 'in_progress',
          ContractorId: 7,
          ClientId: 2,
        },
        {
          id: 6,
          terms: 'bla bla bla',
          status: 'in_progress',
          ContractorId: 7,
          ClientId: 3,
        },
        {
          id: 7,
          terms: 'bla bla bla',
          status: 'in_progress',
          ContractorId: 7,
          ClientId: 4,
        },
      ]);
    });
  });
});
