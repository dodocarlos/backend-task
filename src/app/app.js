const express = require('express');
require('express-async-errors');
const bodyParser = require('body-parser');
const { default: helmet } = require('helmet');
const { sequelize } = require('./model');
const { router } = require('./routes');
const { exceptionHandler } = require('./middleware/exceptionHandler');

class App {
  constructor() {
    this.express = express();

    this.setupMiddleware();
    this.setupRoutes();

    this.express.set('sequelize', sequelize);
    this.express.set('models', sequelize.models);

    this.express.use(exceptionHandler);
  }

  setupMiddleware() {
    this.express.use(bodyParser.json());
    this.express.use(helmet());
  }

  setupRoutes() {
    this.express.use(router);
  }
}

module.exports = new App().express;
