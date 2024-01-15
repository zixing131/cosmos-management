'use strict';

const Service = require('egg').Service;
const page = require('../util/page');

class Account extends Service {

  /**
   * find Account by id
   *
   * @param {string|intger} id
   * @return {Promise<Promise<*>}
   */
  async findById(id) {
    const model = await this.ctx.model.Account.findOne({ where: { id } });
    if (!model) this.ctx.throw(400, 'Account not found.');
    return model;
  }

  /** 
   * get Account page list
   *
   * @param {Object} data
   * @return {Promise<Promise<*>}
   */
  async paginate(data = this.ctx.query) {
    const _data = await this.ctx.validate({
      // id: { type: 'string' },
      // username: { type: 'string' },
      // password: { type: 'string' },
      // email: { type: 'string' },
      // phone: { type: 'string' },
      // open_id: { type: 'string' },
      // create_time: { type: 'string' },
      // update_time: { type: 'string' },
      
    }, data);

    return this.ctx.model.Account.paginate({
      where: _data.data,
      ...page(data),
    });
  }

  /**
   * crate Account
   *
   * @param {Object} data
   * @return {Promise<_data>}
   */
  async create(data = this.ctx.request.body) {
    const _data = await this.ctx.validate({
      // id: { type: 'string' },
      // username: { type: 'string' },
      // password: { type: 'string' },
      // email: { type: 'string' },
      // phone: { type: 'string' },
      // open_id: { type: 'string' },
      // create_time: { type: 'string' },
      // update_time: { type: 'string' },
      
    }, data);
    return this.ctx.model.Account.create(_data);
  }

  /**
   * update Account by id
   *
   * @param {string|intger} id
   * @param {Object} data
   * @return {Promise<>}
   */
  async update(id = this.ctx.params.id, data = this.ctx.request.body) {
    const model = await this.findById(id);
    const _data = await this.ctx.validate({

      // id: { type: 'string' },
      // username: { type: 'string' },
      // password: { type: 'string' },
      // email: { type: 'string' },
      // phone: { type: 'string' },
      // open_id: { type: 'string' },
      // create_time: { type: 'string' },
      // update_time: { type: 'string' },
      
    }, data);
    return model.update(_data);
  }

  /**
   * destroy Account by id
   *
   * @param {string|intger} id
   * @param {Object} data
   * @return {Promise<*>}
   */
  async destroy(id = this.ctx.params.id) {
    const model = await this.findById(id);
    return model.destroy();
  }

  // 登录接口
  async login() {
    const _data = await this.ctx.validate({
      username: { type: 'string' },
      password: { type: 'string' },
    }, this.ctx.request.body);

    const model = await this.ctx.model.Account.findOne({ where: { username: _data.username } });
    if (!model) this.ctx.throw(400, 'Account not found.');

    if (model.password !== _data.password) this.ctx.throw(400, 'Password error.');

    // 生成token
    console.log(this.app.config.jwt.secret, this.app.config.jwt);
    const token = this.app.jwt.sign({
      username: model.username,
      password: model.password,
    }, this.app.config.jwt.secret);

    const {password, ...rest} = model.dataValues;
    return { ...rest, token };
  }
}

module.exports = Account;
