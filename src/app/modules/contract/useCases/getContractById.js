const { getContractById } = require('../contractRepository');

const getContractByIdUseCase = (id, profileId) => getContractById(id, profileId);

module.exports = { getContractByIdUseCase };
