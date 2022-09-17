const { Router } = require('express');
const ContractsController = require('../modules/contract/contractController');

const contractRouter = new Router();

contractRouter.get('/contracts/:id', ContractsController.getContractById);
contractRouter.get('/contracts', ContractsController.listUnterminatedContractsToProfile);

module.exports = {
  contractRouter,
};
