const { HttpException } = require('../../../shared/httpException');
const { getJobById, updateJobPaymentStatus } = require('../jobRepository');
const { getProfileByIdUseCase } = require('../../profile/useCases/getProfileById');
const { addProfileBalanceUseCase } = require('../../profile/useCases/addProfileBalance');
const { sequelize } = require('../../../model');

const payJobUseCase = async (id, payerProfileId) => {
  const job = await getJobById(id);

  if (!job || job.Contract.ClientId !== payerProfileId) {
    throw new HttpException(422, 'The provided Job has not found');
  }

  if (job.paid) {
    throw new HttpException(422, 'The provided job has already been paid');
  }

  const profile = await getProfileByIdUseCase(payerProfileId);

  if (profile.balance < job.price) {
    throw new HttpException(422, 'Unsufficient funds to paid for this job');
  }

  const transaction = await sequelize.transaction();
  try {
    await updateJobPaymentStatus(id, true);
    await addProfileBalanceUseCase(payerProfileId, -job.price);
    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    console.error(error);
    throw error;
  }
};

module.exports = { payJobUseCase };
