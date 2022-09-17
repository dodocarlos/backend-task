const { getUnterminatedContractsToProfile } = require('../contractRepository');

const listUnterminatedContractsToProfileUseCase = (profileId) => getUnterminatedContractsToProfile(profileId);

module.exports = listUnterminatedContractsToProfileUseCase;
