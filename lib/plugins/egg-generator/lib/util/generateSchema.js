'use strict';
/* eslint-disable */
var util = require('util');
var async = require('async');
var Sequelize = require('sequelize');
var _ = require('lodash');

module.exports = async auto => {
  // see sequelize-auto/lib/index => run()
  return new Promise(async (resolve, reject) => {
    var self = auto;
    const schema = {};
    try {
      const models = await auto.run();
      const { tables, text } = models;

      for (const table in tables) {
        schema[table] = {
          fields: tables[table], // TODO get column comment info
          text: text[table] ? String(text[table]).replace('const Sequelize', 'const { DataTypes }').replace('function(sequelize, DataTypes)', 'function(app, sequelize)') : '',
        };
      }
      self.sequelize.close();
      if (self.options.directory) {
        return self.write(text, typescriptFiles, callback);
      }
      return resolve(schema);

    } catch (error) {
      return reject(error)
    }
  });
};
