const { Router } = require('express');
const { getProfile } = require('../middleware/getProfile');
const { contractRouter } = require('./contracts');
const { jobRouter } = require('./jobs');
const { balanceRouter } = require('./balances');

const router = new Router();

router.use(getProfile);

router.use(contractRouter);
router.use(jobRouter);
router.use(balanceRouter);

module.exports = {
  router,
};
