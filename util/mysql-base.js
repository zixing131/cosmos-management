// mysql.js
const _ = require('lodash');
const Sequelize = require('sequelize');
// const redis = require('./redis');


const MySQLBase = function (sequelize) {
  this.sequelize = sequelize;
};

MySQLBase.prototype.define = function (model, attributes, options) {
  return this.sequelize.define(model, _.assign({
    id: {
      type: Sequelize.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV1,
    },
  }, attributes), options);
};

module.exports = MySQLBase;

// https://segmentfault.com/a/1190000008827307
// https://www.helplib.com/GitHub/article_122633