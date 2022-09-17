const { Op } = require('sequelize');
const { Contract } = require('../../model');

const getContractById = async (id, profileId) => Contract.findOne({ where: { id, ContractorId: profileId } });

const getUnterminatedContractsToProfile = async (profileId) => Contract.findAll({
  where: {
    [Op.or]: { ContractorId: profileId, ClientId: profileId },
    status: { [Op.ne]: 'terminated' },
  },
});

module.exports = {
  getContractById,
  getUnterminatedContractsToProfile,
};
