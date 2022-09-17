const Contract = require('../models/contract');

class ContractController {
  async getContractById(req, res) {
    console.log(req.app.get('models'));

    const { id } = req.params;
    const contract = await Contract.findOne({ where: { id } });
    if (!contract) return res.status(404).end();
    return res.json(contract);
  }
}

module.exports = {
  ContractController,
};
