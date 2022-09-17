const express = require('express');
const bodyParser = require('body-parser');
const { default: helmet } = require('helmet');
const { sequelize } = require('./config/database');
const { contractRouter } = require('./routes/contracts');

class App {
  constructor() {
    this.express = express();

    this.setupMiddleware();
    this.setupRoutes();
  }

  setupMiddleware() {
    this.express.use(bodyParser.json());
    this.express.set('sequelize', sequelize);
    this.express.set('models', sequelize.models);
    this.express.use(helmet());
  }

  setupRoutes() {
    this.express.use(contractRouter);
  }
}

module.exports = new App().express;
