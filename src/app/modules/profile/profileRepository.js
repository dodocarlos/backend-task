const { Profile } = require('../../model');

const getProfileById = async (id) => Profile.findByPk(id);

const addProfileBalance = async (id, value) => {
  const profile = await getProfileById(id);
  profile.balance += value;
  return profile.save();
};

module.exports = {
  getProfileById,
  addProfileBalance,
};
