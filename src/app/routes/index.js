const { Router } = require('express');
const { getProfile } = require('../middleware/getProfile');
const { contractRouter } = require('./contracts');

const router = new Router();

router.use(getProfile);

router.use(contractRouter);

module.exports = {
  router,
};
