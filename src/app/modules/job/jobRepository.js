const { Op } = require('sequelize');
const { Job, Contract } = require('../../model');

const getJobById = (id) => Job.findByPk(id, {
  include: {
    model: Contract,
  },
});

const getUnpaidJobs = async (profileId) => Job.findAll({
  where: {
    paid: { [Op.is]: null },
  },
  include: {
    model: Contract,
    where: {
      [Op.or]: { ContractorId: profileId, ClientId: profileId },
      status: { [Op.ne]: 'in_progress' },
    },
  },
});

const updateJobPaymentStatus = async (id, payed) => {
  const job = await Job.findByPk(id);
  job.paid = payed;
  return job.save();
};

module.exports = {
  getJobById,
  getUnpaidJobs,
  updateJobPaymentStatus,
};
