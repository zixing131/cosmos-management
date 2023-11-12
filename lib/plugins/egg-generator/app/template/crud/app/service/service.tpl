/**
 * template config
 * @param filename <%= Identity %>
 */
'use strict';

const Service = require('egg').Service;
const page = require('../util/page');

class <%= Identity %> extends Service {

  /**
   * find <%= Identity %> by id
   *
   * @param {string|intger} id
   * @return {Promise<Promise<*>}
   */
  async findById(id) {
    const model = await this.ctx.model.<%= Identity %>.findOne({ where: { id } });
    if (!model) this.ctx.throw(400, '<%= Identity %> not found.');
    return model;
  }

  /** 
   * get <%= Identity %> page list
   *
   * @param {Object} data
   * @return {Promise<Promise<*>}
   */
  async paginate(data = this.ctx.query) {
    const _data = await this.ctx.validate({
      {% for name, field in model.fields %}// <%= name %>: { type: 'string' },
      {% endfor %}
    }, data);

    return this.ctx.model.<%= Identity %>.paginate({
      where: _data.data,
      ...page(data),
    });
  }

  /**
   * crate <%= Identity %>
   *
   * @param {Object} data
   * @return {Promise<_data>}
   */
  async create(data = this.ctx.request.body) {
    const _data = await this.ctx.validate({
      {% for name, field in model.fields %}// <%= name %>: { type: 'string' },
      {% endfor %}
    }, data);
    return this.ctx.model.<%= Identity %>.create(_data);
  }

  /**
   * update <%= Identity %> by id
   *
   * @param {string|intger} id
   * @param {Object} data
   * @return {Promise<>}
   */
  async update(id = this.ctx.params.id, data = this.ctx.request.body) {
    const model = await this.findById(id);
    const _data = await this.ctx.validate({

      {% for name, field in model.fields %}// <%= name %>: { type: 'string' },
      {% endfor %}
    }, data);
    return model.update(_data);
  }

  /**
   * destroy <%= Identity %> by id
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

module.exports = <%= Identity %>;
