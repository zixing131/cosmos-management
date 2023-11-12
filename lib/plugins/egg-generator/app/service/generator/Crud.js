'use strict';

const path = require('path');
const AutoSequelize = require('sequelize-auto');
const Service = require('../../../lib/class/Service');
const generateSchema = require('../../../lib/util/generateSchema');

class Crud extends Service {

  async create(data = this.ctx.request.body || {}) {
    // 校验
    await this.validate({
      name: { type: 'string', required: true },
      identity: { type: 'regexp', pattern: /^[a-zA-Z]{1,20}$/, required: true },
      Identity: { type: 'regexp', pattern: /^[a-zA-Z]{1,20}$/, required: true },
      tableName: { type: 'string', required: true },
    }, data);

    data.model = await this.parseModel(data.tableName);
    const directory = path.resolve(`${this.app.config.generator.templateDir}/crud`);
    const result = await this.parse({ directory, data });

    if (parseInt(data.create) === 1) await this.write(result);
    return result;
  }

  async parseModel(tableName) {
    const { app } = this;
    const model = app.sequelize || app.model;
    const queryInterface = model.getQueryInterface(); // 只支持单数据库
    const tables = await queryInterface.showAllTables();
    if (tables.indexOf(tableName) === -1) this.ctx.throw('400', `table ${tableName} is not exists`);

    const { database, username, password } = model.config;
    const auto = new AutoSequelize(database, username, password, {
      tables: [tableName],
      host: 'gz-cdb-ezdfpaq3.sql.tencentcdb.com',
      dialect: 'mysql',
      port: '63645',
      directory: false,
      additional: {
        fieldComment: true,
      },
      dialectOptions: {
        charset: 'utf8mb4',
      },
    });
    const schema = await generateSchema(auto);
    return schema[tableName];
  }
}

module.exports = Crud;
