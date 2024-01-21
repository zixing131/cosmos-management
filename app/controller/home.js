'use strict';

const { Controller } = require('egg');

const path = require('path');
const fs = require('fs');

class HomeController extends Controller {
  async index() {
    const { ctx, app } = this;
    const filePath = path.join(app.config.static.dir, 'dist', 'index.html');
    ctx.body = fs.readFileSync(filePath, 'utf8');
  }
}

module.exports = HomeController;
