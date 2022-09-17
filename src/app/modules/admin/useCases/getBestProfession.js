const { getTotalJobsPriceByProfession } = require('../../job/jobRepository');

const getBestProfessionUseCase = async (startDate, endDate) => {
  const bestProfessions = await getTotalJobsPriceByProfession(startDate, endDate);

  return bestProfessions.map((profession) => ({
    profession: profession.Contract.Contractor.profession,
    totalPrice: profession.get('totalPrice'),
  }));
};

module.exports = {
  getBestProfessionUseCase,
};
