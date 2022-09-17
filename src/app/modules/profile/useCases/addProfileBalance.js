const { addProfileBalance } = require('../profileRepository');

const addProfileBalanceUseCase = (profileId, amount) => addProfileBalance(profileId, amount);

module.exports = { addProfileBalanceUseCase };
