const express = require('express');
const bodyParser = require('body-parser');
const { default: helmet } = require('helmet');
const { router } = require('./routes');

class App {
  constructor() {
    this.express = express();

    this.setupMiddleware();
    this.setupRoutes();
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
