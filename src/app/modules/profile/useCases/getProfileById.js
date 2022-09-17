const { getProfileById } = require('../profileRepository');

const getProfileByIdUseCase = (profileId) => getProfileById(profileId);

module.exports = { getProfileByIdUseCase };
