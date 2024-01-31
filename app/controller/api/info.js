'use strict';
const Controller = require('egg').Controller;

/**
 * info controller
 */
class InfoController extends Controller {

  /**
   * info paginate query
   */
  async list() {
    this.ctx.body = await this.ctx.service.info.paginate();
  }

  /**
   * info paginate query
   */
  async findByKeys() {
    this.ctx.body = await this.ctx.service.info.findByKeys();
  }

  /**
   * create info
   */
  async create() {
    this.ctx.body = await this.ctx.service.info.create();
  }

  /**
   * update info by id
   */
  async update() {
    this.ctx.body = await this.ctx.service.info.update();
  }

  /**
   * destroy info by id
   */
  async destroy() {
    this.ctx.body = await this.ctx.service.info.destroy();
  }
}

module.exports = InfoController;
