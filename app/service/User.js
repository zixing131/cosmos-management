'use strict';

const Service = require('egg').Service;
const { where } = require('sequelize');
const page = require('../util/page');

class User extends Service {

  /**
   * find User by id
   *
   * @param {string|intger} id
   * @return {Promise<Promise<*>}
   */
  async findById(id) {
    const model = await this.ctx.model.User.findOne({ where: { id } });
    if (!model) this.ctx.throw(400, 'User not found.');
    return model;
  }

  /** 
   * get User page list
   *
   * @param {Object} data
   * @return {Promise<Promise<*>}
   */
  async paginate(data = this.ctx.query) {
    const _data = await this.ctx.validate({
      // id: { type: 'string' },
      // open_id: { type: 'string' },
      // username: { type: 'string' },
      // nickname: { type: 'string' },
      // password: { type: 'string' },
      // email: { type: 'string' },
      // phone: { type: 'string' },
      // avatar: { type: 'string' },
      // gender: { type: 'string' },
      // country: { type: 'string' },
      // province: { type: 'string' },
      // city: { type: 'string' },
      // create_time: { type: 'string' },
      // update_time: { type: 'string' },

    }, data);

    return this.ctx.model.User.paginate({
      where: _data.data,
      ...page(data),
    });
  }

  /**
   * crate User
   *
   * @param {Object} data
   * @return {Promise<_data>}
   */
  async create(data = this.ctx.request.body) {
    const _data = await this.ctx.validate({
      // id: { type: 'string' },
      // open_id: { type: 'string' },
      // username: { type: 'string' },
      // nickname: { type: 'string' },
      // password: { type: 'string' },
      // email: { type: 'string' },
      // phone: { type: 'string' },
      // avatar: { type: 'string' },
      // gender: { type: 'string' },
      // country: { type: 'string' },
      // province: { type: 'string' },
      // city: { type: 'string' },
      // create_time: { type: 'string' },
      // update_time: { type: 'string' },

    }, data);
    const { open_id } = data;
    const length = open_id ? open_id.length : '';
    return this.ctx.model.User.create({
      ...data,
      username: data.username || (open_id ? open_id.substr(length - 6, length - 1) : ''),
    });
  }

  /**
   * update User by id
   *
   * @param {string|intger} id
   * @param {Object} data
   * @return {Promise<>}
   */
  async update(id = this.ctx.params.id, data = this.ctx.request.body) {
    const model = await this.findById(id);
    const _data = await this.ctx.validate({

      // id: { type: 'string' },
      // open_id: { type: 'string' },
      // username: { type: 'string' },
      // nickname: { type: 'string' },
      // password: { type: 'string' },
      // email: { type: 'string' },
      // phone: { type: 'string' },
      // avatar: { type: 'string' },
      // gender: { type: 'string' },
      // country: { type: 'string' },
      // province: { type: 'string' },
      // city: { type: 'string' },
      // create_time: { type: 'string' },
      // update_time: { type: 'string' },

    }, data);
    return model.update(_data);
  } /**
  * update User by id
  *
  * @param {string|intger} id
  * @param {Object} data
  * @return {Promise<>}
  */
  async info(id = this.ctx.query.id, data = this.ctx.request.body) {
    const model = await this.findById(id);
    
    if (!model) this.ctx.throw(400, 'User not found.');
    return model.update({
      ...model,
      avatar: data.avatar || model.avatar,
      nickname: data.nickname || model.nickname
    }, where({ id }));
  }

  /**
   * destroy User by id
   *
   * @param {string|intger} id
   * @param {Object} data
   * @return {Promise<*>}
   */
  async destroy(id = this.ctx.params.id) {
    const model = await this.findById(id);
    return model.destroy();
  }
}

module.exports = User;
