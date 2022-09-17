const { Router } = require('express');
const { ContractController } = require('../controller/contracts');

const contractRouter = new Router();

contractRouter.use('/contracts/:id', new ContractController().getContractById);

module.exports = {
  contractRouter,
};
