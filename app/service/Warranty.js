'use strict';

const Service = require('egg').Service;
const page = require('../util/page');

class Warranty extends Service {

  /**
   * find Warranty by id
   *
   * @param {string|intger} id
   * @return {Promise<Promise<*>}
   */
  async findById(id) {
    const model = await this.ctx.model.Warranty.findOne({ where: { id } });
    if (!model) this.ctx.throw(400, 'Warranty not found.');
    return model;
  }

  /** 
   * get Warranty page list
   *
   * @param {Object} data
   * @return {Promise<Promise<*>}
   */
  async paginate(data = this.ctx.query) {
    const _data = await this.ctx.validate({
      // id: { type: 'string' },
      // dealer: { type: 'string' },
      // owner_name: { type: 'string' },
      // phone_number: { type: 'string' },
      // license_plate: { type: 'string' },
      // car_brand: { type: 'string' },
      // product_series: { type: 'string' },
      // coil_number: { type: 'string' },
      // construction_date: { type: 'string' },
      // expiration_date: { type: 'string' },
      // status: { type: 'string' },
      // vehicle_photo: { type: 'string' },
      // total_price: { type: 'string' },

    }, data);

    return this.ctx.model.Warranty.paginate({
      where: _data.data,
      ...page(data),
    });
  }

  /**
   * find Cases by id
   *
   * @param {string|intger} id
   * @return {Promise<Promise<*>}
   */
  async findById(id = this.ctx.query.id) {
    const model = await this.ctx.model.Warranty.findOne({
      where: {
        id,
      },
    });
    if (!model) this.ctx.throw(400, 'Cases not found.');
    return model;
  }

  /**
   * find Cases by id
   *
   * @param {string|intger} id
   * @return {Promise<Promise<*>}
   */
  async findByPhone(phone_number = this.ctx.query.phoneNumber) {
    const model = await this.ctx.model.Warranty.findOne({
      where: {
        phone_number,
      }
    });
    if (!model) this.ctx.throw(400, 'Warranty not found.');
    return model;
  }

  /**
   * crate Warranty
   *
   * @param {Object} data
   * @return {Promise<_data>}
   */
  async create(data = this.ctx.request.body) {
    // const _data = await this.ctx.validate({
    //   id: { type: 'string' },
    //   dealer: { type: 'string' },
    //   owner_name: { type: 'string' },
    //   phone_number: { type: 'string' },
    //   license_plate: { type: 'string' },
    //   car_brand: { type: 'string' },
    //   product_series: { type: 'string' },
    //   coil_number: { type: 'string' },
    //   construction_date: { type: 'string' },
    //   expiration_date: { type: 'string' },
    //   status: { type: 'string' },
    //   vehicle_photo: { type: 'string' },
    //   total_price: { type: 'string' },
    // }, data);

    return this.ctx.model.Warranty.create({
      ...data,
      status: 1,
    });
  }

  /**
   * update Warranty by id
   *
   * @param {string|intger} id
   * @param {Object} data
   * @return {Promise<>}
   */
  async update(id = this.ctx.params.id, data = this.ctx.request.body) {
    const model = await this.findById(id);
    const _data = await this.ctx.validate({

      // id: { type: 'string' },
      // dealer: { type: 'string' },
      // owner_name: { type: 'string' },
      // phone_number: { type: 'string' },
      // license_plate: { type: 'string' },
      // car_brand: { type: 'string' },
      // product_series: { type: 'string' },
      // coil_number: { type: 'string' },
      // construction_date: { type: 'string' },
      // expiration_date: { type: 'string' },
      // status: { type: 'string' },
      // vehicle_photo: { type: 'string' },
      // total_price: { type: 'string' },

    }, data);
    return model.update(_data);
  }

  /**
   * 更新状态
   */
  async updateStatus(id = this.ctx.params.id, data = this.ctx.request.body) {
    const model = await this.findById(id);
    // const _data = await this.ctx.validate({
    //   status: { type: 'string' },
    // }, data);
    return model.update({
      ...model.dataValues,
      status: data.status
    });
  }

  /**
   * destroy Warranty by id
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

module.exports = Warranty;
