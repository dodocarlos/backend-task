const { depositProfileBalanceUseCase } = require('./useCases/depositProfileBalance');
const { HttpException } = require('../../shared/httpException');

const depositProfileBalance = async (req, res) => {
  const { id: profileId } = req.profile;
  const { amount } = req.body;

  if (!amount > 0) {
    throw new HttpException(400, 'Amount should be greater than zero');
  }

  await depositProfileBalanceUseCase(profileId, amount);

  return res.status(204).send();
};

module.exports = { depositProfileBalance };
