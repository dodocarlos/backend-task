const { getBestClients } = require('../../job/jobRepository');

const getBestClientsUseCase = async (startDate, endDate, limit) => {
  const bestClients = await getBestClients(startDate, endDate, limit);

  return bestClients.map((client) => ({
    totalPrice: client.get('totalPrice'),
    client: client.Contract.Client,
  }));
};

module.exports = {
  getBestClientsUseCase,
};
