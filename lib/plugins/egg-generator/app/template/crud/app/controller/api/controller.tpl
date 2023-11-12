/**
 * template config
 * @param filename <%= identity %>
 */
'use strict';
const Controller = require('egg').Controller;

/**
 * <%= identity %> controller
 */
class <%= Identity %>Controller extends Controller {

  /**
   * <%= identity %> paginate query
   */
  async list() {
    this.ctx.body = await this.ctx.service.<%= identity %>.paginate();
  }

  /**
   * create <%= identity %>
   */
  async create() {
    this.ctx.body = await this.ctx.service.<%= identity %>.create();
  }

  /**
   * update <%= identity %> by id
   */
  async update() {
    this.ctx.body = await this.ctx.service.<%= identity %>.update();
  }

  /**
   * destroy <%= identity %> by id
   */
  async destroy() {
    this.ctx.body = await this.ctx.service.<%= identity %>.destroy();
  }
}

module.exports = <%= Identity %>Controller;
