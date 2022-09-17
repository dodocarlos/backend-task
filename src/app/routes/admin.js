const { Router } = require('express');
const AdminController = require('../modules/admin/adminController');

const adminRouter = new Router();

adminRouter.get('/admin/best-profession', AdminController.getBestProfession);
adminRouter.get('/admin/best-clients', AdminController.getBestClients);

module.exports = {
  adminRouter,
};
