const sequelize = require('sequelize');
const { Op } = require('sequelize');
const { Job, Contract, Profile } = require('../../model');

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

const getTotalJobsPriceByProfession = (startDate, endDate) => Job.findAll({
  attributes: [[sequelize.fn('sum', sequelize.col('price')), 'totalPrice']],
  group: 'Contract.Contractor.profession',
  where: { paid: true, createdAt: { [Op.between]: [startDate, endDate] } },
  order: [[sequelize.fn('sum', sequelize.col('price')), 'DESC']],
  include: {
    model: Contract,
    attributes: ['ContractorId'],
    include: {
      model: Profile,
      as: 'Contractor',
      attributes: ['profession'],
    },
  },
});

const getBestClients = (startDate, endDate, limit) => Job.findAll({
  attributes: [[sequelize.fn('sum', sequelize.col('price')), 'totalPrice']],
  group: 'Contract.Client.id',
  where: { paid: true, createdAt: { [Op.between]: [startDate, endDate] } },
  order: [[sequelize.fn('sum', sequelize.col('price')), 'DESC']],
  limit,
  include: {
    model: Contract,
    attributes: ['ContractorId'],
    include: {
      model: Profile,
      as: 'Client',
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
  getTotalJobsPriceByProfession,
  getBestClients,
};
