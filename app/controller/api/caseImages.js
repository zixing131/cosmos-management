'use strict';
const Controller = require('egg').Controller;

/**
 * caseImages controller
 */
class CaseImagesController extends Controller {

  /**
   * caseImages paginate query
   */
  async list() {
    this.ctx.body = await this.ctx.service.caseImages.paginate();
  }

  /**
   * create caseImages
   */
  async create() {
    this.ctx.body = await this.ctx.service.caseImages.create();
  }

  /**
   * update caseImages by id
   */
  async update() {
    this.ctx.body = await this.ctx.service.caseImages.update();
  }

  /**
   * destroy caseImages by id
   */
  async destroy() {
    this.ctx.body = await this.ctx.service.caseImages.destroy();
  }
}

module.exports = CaseImagesController;
