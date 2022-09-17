const { getUnpaidJobs } = require('../jobRepository');

const listUnpaidJobsToProfileUseCase = (profileId) => getUnpaidJobs(profileId);

module.exports = { listUnpaidJobsToProfileUseCase };
