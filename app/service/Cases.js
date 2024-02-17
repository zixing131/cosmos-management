'use strict';

const Service = require('egg').Service;
const page = require('../util/page');

class Cases extends Service {

  /**
   * find Cases by id
   *
   * @param {string|intger} id
   * @return {Promise<Promise<*>}
   */
  async findById(id) {
    const model = await this.ctx.model.Cases.findOne({
      where: {
        id,
        include: [{ model: this.ctx.model.CaseImages, as: 'case_images' }],
      }
    });
    if (!model) this.ctx.throw(400, 'Cases not found.');
    return model;
  }

  /** 
   * get Cases page list
   *
   * @param {Object} data
   * @return {Promise<Promise<*>}
   */
  async paginate(data = this.ctx.query) {
    const _data = await this.ctx.validate({
      // id: { type: 'string' },
      // brand: { type: 'string' },
      // series: { type: 'string' },
      // product_name: { type: 'string' },
      // create_time: { type: 'string' },
      // update_time: { type: 'string' },

    }, data);

    const result = await this.ctx.model.Cases.paginate({
      where: _data.data,
      ...page(data),
      include: [{ model: this.ctx.model.CaseImages, as: 'case_images' }]
    });

    const casesList = result.rows;

    return { ...result, rows: casesList };
  }

  /**
   * crate Cases
   *
   * @param {Object} data
   * @return {Promise<_data>}
   */
  async create(data = this.ctx.request.body) {
    // const _data = await this.ctx.validate({
    //   // id: { type: 'string' },
    //   // brand: { type: 'string' },
    //   // series: { type: 'string' },
    //   // product_name: { type: 'string' },
    //   // create_time: { type: 'string' },
    //   // update_time: { type: 'string' },

    // }, data);
    const { images, ..._data } = data
    const cases = await this.ctx.model.Cases.create(_data);
    // 构建图片列表
    const imagesList = images.map((item) => ({
      case_id: cases.id,
      image_url: item,
      sort_order: item.sort_order,
    }));

    // 批量插入图片
    await this.ctx.model.CaseImages.bulkCreate(imagesList);

    return { ...(cases?.dataValues || {}), images: imagesList };
  }

  /**
   * update Cases by id
   *
   * @param {string|intger} id
   * @param {Object} data
   * @return {Promise<>}
   */
  async update(id = this.ctx.query.id, data = this.ctx.request.body) {
    const model = await this.findById(id);
    // const _data = await this.ctx.validate({

    //   // id: { type: 'string' },
    //   // brand: { type: 'string' },
    //   // series: { type: 'string' },
    //   // product_name: { type: 'string' },
    //   // create_time: { type: 'string' },
    //   // update_time: { type: 'string' },

    // }, data);
    const { images, ..._data } = data
    const cases = await this.ctx.model.Cases.create(_data);
    // 构建图片列表
    const imagesList = images.map((item) => ({
      case_id: cases.id,
      image_url: item,
      sort_order: item.sort_order,
    }));

    // 删除原有图片
    await this.ctx.model.CaseImages.destroy({
      where: {
        case_id: cases.id,
      }
    });

    // 批量插入图片
    await this.ctx.model.CaseImages.bulkCreate(imagesList);
    return { ...(cases?.dataValues || {}), images: imagesList };
  }

  /**
   * destroy Cases by id
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

module.exports = Cases;
