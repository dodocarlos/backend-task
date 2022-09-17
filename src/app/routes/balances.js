const { Router } = require('express');
const BalanceController = require('../modules/balance/balanceController');

const balanceRouter = new Router();

balanceRouter.post('/balances/deposit/:userId', BalanceController.depositProfileBalance);

module.exports = {
  balanceRouter,
};
