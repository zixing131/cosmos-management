'use strict';
const Controller = require('egg').Controller;

/**
 * user controller
 */
class UserController extends Controller {

  /**
   * user paginate query
   */
  async list() {
    this.ctx.body = await this.ctx.service.user.paginate();
  }

  /**
   * create user
   */
  async create() {
    this.ctx.body = await this.ctx.service.user.create();
  }

  /**
   * update user by id
   */
  async update() {
    this.ctx.body = await this.ctx.service.user.update();
  }

  /**
   * destroy user by id
   */
  async destroy() {
    this.ctx.body = await this.ctx.service.user.destroy();
  }
}

module.exports = UserController;
