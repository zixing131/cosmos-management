'use strict';
const Controller = require('egg').Controller;

/**
 * account controller
 */
class AccountController extends Controller {

  /**
   * account paginate query
   */
  async list() {
    this.ctx.body = await this.ctx.service.account.paginate();
  }

  /**
   * create account
   */
  async create() {
    this.ctx.body = await this.ctx.service.account.create();
  }

  /**
   * update account by id
   */
  async update() {
    this.ctx.body = await this.ctx.service.account.update();
  }

  /**
   * destroy account by id
   */
  async destroy() {
    this.ctx.body = await this.ctx.service.account.destroy();
  }

  // 登录接口
  async login() {
    this.ctx.body = await this.ctx.service.account.login();
  }
}

module.exports = AccountController;
