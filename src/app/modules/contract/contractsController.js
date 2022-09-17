const { getUnterminatedContractsToProfile } = require('./contractRepository');
const getContractByIdUseCase = require('./useCases/getContractById');

const getContractById = async (req, res) => {
  const { id: profileId } = req.profile;
  const { id } = req.params;

  const contract = await getContractByIdUseCase(id, profileId);

  if (!contract) return res.status(404).end();
  return res.json(contract);
};

const listUnterminatedContractsToProfile = async (req, res) => {
  const { id: profileId } = req.profile;

  const contracts = await getUnterminatedContractsToProfile(profileId);

  return res.json(contracts);
};

module.exports = {
  getContractById,
  listUnterminatedContractsToProfile,
};
