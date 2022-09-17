const { parseISO } = require('date-fns');
const { getBestProfessionUseCase } = require('./useCases/getBestProfession');
const { getBestClientsUseCase } = require('./useCases/getBestClients');
const { HttpException } = require('../../shared/httpException');

const getBestProfession = async (req, res) => {
  const { start, end } = req.query;

  if (!start || !end) {
    throw new HttpException(400, 'start and end should be a valid value');
  }

  const startDate = parseISO(start);
  const endDate = parseISO(end);

  const bestProfession = await getBestProfessionUseCase(startDate, endDate);

  return res.json(bestProfession);
};

const getBestClients = async (req, res) => {
  const { start, end, limit = 2 } = req.query;

  if (!start || !end) {
    throw new HttpException(400, 'start and end should be a valid value');
  }

  const startDate = parseISO(start);
  const endDate = parseISO(end);

  const bestProfession = await getBestClientsUseCase(startDate, endDate, limit);

  return res.json(bestProfession);
};

module.exports = { getBestProfession, getBestClients };
