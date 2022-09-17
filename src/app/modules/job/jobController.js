const { listUnpaidJobsToProfileUseCase } = require('./useCases/listUnpaidJobsToProfile');
const { payJobUseCase } = require('./useCases/payJob');

const listUnpaidJobs = async (req, res) => {
  const { id: profileId } = req.profile;

  const jobs = await listUnpaidJobsToProfileUseCase(profileId);

  return res.json(jobs);
};

const payJob = async (req, res) => {
  const { id: profileId } = req.profile;
  const { job_id: id } = req.params;

  await payJobUseCase(id, profileId);

  return res.status(204).send();
};

module.exports = { listUnpaidJobs, payJob };
