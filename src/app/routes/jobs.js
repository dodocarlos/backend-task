const { Router } = require('express');
const JobController = require('../modules/job/jobController');

const jobRouter = new Router();

jobRouter.get('/jobs/unpaid', JobController.listUnpaidJobs);
jobRouter.post('/jobs/:job_id/pay', JobController.payJob);

module.exports = {
  jobRouter,
};
