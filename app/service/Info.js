'use strict';

const Service = require('egg').Service;
const page = require('../util/page');

class Info extends Service {

  /**
   * find Info by id
   *
   * @param {string|intger} id
   * @return {Promise<Promise<*>}
   */
  async findById(id) {
    const model = await this.ctx.model.Info.findOne({ where: { id } });
    if (!model) this.ctx.throw(400, 'Info not found.');
    return model;
  }

  // 传入key的list，返回对应数据的list
  async findByKeys(keys) {
    const model = await this.ctx.model.Info.findAll({ where: { info_key: keys } });
    if (!model) this.ctx.throw(400, 'Info not found.');
    return model;
  }

  /** 
   * get Info page list
   *
   * @param {Object} data
   * @return {Promise<Promise<*>}
   */
  async paginate(data = this.ctx.query) {
    const _data = await this.ctx.validate({
      // id: { type: 'string' },
      // key: { type: 'string' },
      // type: { type: 'string' },
      // content: { type: 'string' },
      // sort_order: { type: 'string' },
      // create_time: { type: 'string' },
      // update_time: { type: 'string' },
      
    }, data);

    return this.ctx.model.Info.paginate({
      where: _data.data,
      ...page(data),
    });
  }

  /**
   * crate Info
   *
   * @param {Object} data
   * @return {Promise<_data>}
   */
  async create(data = this.ctx.request.body) {
    const _data = await this.ctx.validate({
      // id: { type: 'string' },
      // key: { type: 'string' },
      // type: { type: 'string' },
      // content: { type: 'string' },
      // sort_order: { type: 'string' },
      // create_time: { type: 'string' },
      // update_time: { type: 'string' },
      
    }, data);
    return this.ctx.model.Info.create(_data);
  }

  /**
   * update Info by id
   *
   * @param {string|intger} id
   * @param {Object} data
   * @return {Promise<>}
   */
  async update(id = this.ctx.params.id, data = this.ctx.request.body) {
    const model = await this.findById(id);
    const _data = await this.ctx.validate({

      // id: { type: 'string' },
      // key: { type: 'string' },
      // type: { type: 'string' },
      // content: { type: 'string' },
      // sort_order: { type: 'string' },
      // create_time: { type: 'string' },
      // update_time: { type: 'string' },
      
    }, data);
    return model.update(_data);
  }

  /**
   * destroy Info by id
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

module.exports = Info;
