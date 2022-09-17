const { Router } = require('express');
const ContractsController = require('../modules/contract/contractsController');

const contractRouter = new Router();

contractRouter.use('/contracts/:id', ContractsController.getContractById);
contractRouter.use('/contracts', ContractsController.listUnterminatedContractsToProfile);

module.exports = {
  contractRouter,
};
