const { Router } = require('express');
const { getProfile } = require('../middleware/getProfile');
const { contractRouter } = require('./contracts');
const { jobRouter } = require('./jobs');
const { balanceRouter } = require('./balances');
const { adminRouter } = require('./admin');

const router = new Router();

router.use(balanceRouter);
router.use(adminRouter);

router.use(getProfile);

router.use(contractRouter);
router.use(jobRouter);

module.exports = {
  router,
};
