'use strict';
const Controller = require('egg').Controller;

/**
 * cases controller
 */
class CasesController extends Controller {

  /**
   * cases paginate query
   */
  async list() {
    this.ctx.body = await this.ctx.service.cases.paginate();
  }

  /**
   * create cases
   */
  async create() {
    this.ctx.body = await this.ctx.service.cases.create();
  }

  /**
   * update cases by id
   */
  async update() {
    this.ctx.body = await this.ctx.service.cases.update();
  }

  /**
   * destroy cases by id
   */
  async destroy() {
    this.ctx.body = await this.ctx.service.cases.destroy();
  }
}

module.exports = CasesController;
