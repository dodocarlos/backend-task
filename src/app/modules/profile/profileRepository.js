const { Profile } = require('../../model');

const getProfileById = async (id) => Profile.findByPk(id);

const addProfileBalance = async (id, amount) => {
  const profile = await getProfileById(id);
  profile.balance += amount;
  return profile.save();
};

module.exports = {
  getProfileById,
  addProfileBalance,
};
