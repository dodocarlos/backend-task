const { listUnpaidJobsToProfileUseCase } = require('../../job/useCases/listUnpaidJobsToProfile');
const { addProfileBalanceUseCase } = require('../../profile/useCases/addProfileBalance');
const { HttpException } = require('../../../shared/httpException');

const TOTAL_PRICE_MAX_DEPOSIT_PERCENTAGE = 25;

const depositProfileBalanceUseCase = async (profileId, amount) => {
  const unpaidJobs = await listUnpaidJobsToProfileUseCase(profileId);

  const unpaidJobsTotalPrice = unpaidJobs.reduce((total, job) => total + job.price, 0);
  const maxDepositAmount = unpaidJobsTotalPrice * (TOTAL_PRICE_MAX_DEPOSIT_PERCENTAGE / 100);

  if (amount > maxDepositAmount) {
    throw new HttpException(
      422,
      `The provived amount is greater than the maximum value allowed (${TOTAL_PRICE_MAX_DEPOSIT_PERCENTAGE}% of total unpaid jobs)`,
    );
  }

  return addProfileBalanceUseCase(profileId, amount);
};

module.exports = {
  depositProfileBalanceUseCase,
};
