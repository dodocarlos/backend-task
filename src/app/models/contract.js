const { Sequelize } = require('sequelize');
const { sequelize } = require('../config/database');

class Contract extends Sequelize.Model {}
Contract.init(
  {
    terms: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    status: {
      type: Sequelize.ENUM('new', 'in_progress', 'terminated'),
    },
  },
  {
    sequelize,
    modelName: 'Contract',
  }
);

Contract.associate = (models) => {
  Contract.belongsTo(models.Profile, { as: 'Contractor' });
  Contract.belongsTo(models.Profile, { as: 'Client' });
  Contract.hasMany(models.Job);
};

module.exports = Contract;
