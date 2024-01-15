'use strict';

const Service = require('egg').Service;
const page = require('../util/page');

class CaseImages extends Service {

  /**
   * find CaseImages by id
   *
   * @param {string|intger} id
   * @return {Promise<Promise<*>}
   */
  async findById(id) {
    const model = await this.ctx.model.CaseImages.findOne({ where: { id } });
    if (!model) this.ctx.throw(400, 'CaseImages not found.');
    return model;
  }

  /** 
   * get CaseImages page list
   *
   * @param {Object} data
   * @return {Promise<Promise<*>}
   */
  async paginate(data = this.ctx.query) {
    const _data = await this.ctx.validate({
      // id: { type: 'string' },
      // case_id: { type: 'string' },
      // image_url: { type: 'string' },
      
    }, data);

    return this.ctx.model.CaseImages.paginate({
      where: _data.data,
      ...page(data),
    });
  }

  /**
   * crate CaseImages
   *
   * @param {Object} data
   * @return {Promise<_data>}
   */
  async create(data = this.ctx.request.body) {
    const _data = await this.ctx.validate({
      // id: { type: 'string' },
      // case_id: { type: 'string' },
      // image_url: { type: 'string' },
    }, data);
    return this.ctx.model.CaseImages.create(_data);
  }

  /**
   * update CaseImages by id
   *
   * @param {string|intger} id
   * @param {Object} data
   * @return {Promise<>}
   */
  async update(id = this.ctx.params.id, data = this.ctx.request.body) {
    const model = await this.findById(id);
    const _data = await this.ctx.validate({

      // id: { type: 'string' },
      // case_id: { type: 'string' },
      // image_url: { type: 'string' },
      
    }, data);
    return model.update(_data);
  }

  /**
   * destroy CaseImages by id
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

module.exports = CaseImages;
