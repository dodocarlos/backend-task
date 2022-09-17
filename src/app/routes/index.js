const { Router } = require('express');
const { getProfile } = require('../middleware/getProfile');
const { contractRouter } = require('./contracts');
const { jobRouter } = require('./jobs');

const router = new Router();

router.use(getProfile);

router.use(contractRouter);
router.use(jobRouter);

module.exports = {
  router,
};
