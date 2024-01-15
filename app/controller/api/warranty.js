'use strict';
const Controller = require('egg').Controller;

/**
 * warranty controller
 */
class WarrantyController extends Controller {

  /**
   * warranty paginate query
   */
  async list() {
    this.ctx.body = await this.ctx.service.warranty.paginate();
  }

  /**
   * create warranty
   */
  async create() {
    this.ctx.body = await this.ctx.service.warranty.create();
  }

  /**
   * updateStatus
   */
  async updateStatus() {
    this.ctx.body = await this.ctx.service.warranty.updateStatus();
  }

  /**
   * update warranty by id
   */
  async update() {
    this.ctx.body = await this.ctx.service.warranty.update();
  }

  /**
   * destroy warranty by id
   */
  async destroy() {
    this.ctx.body = await this.ctx.service.warranty.destroy();
  }
}

module.exports = WarrantyController;
